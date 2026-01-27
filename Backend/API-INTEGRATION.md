# ShuleAI Backend API Integration Guide

## Overview

This document describes the backend API integration for the ShuleAI authentication and payment system.

## API Base URL

```
https://shuleaibackend-0fcq.onrender.com/api
```

## Authentication Flow

### 1. Request Access Code

**Endpoint:** `POST /auth/send-code`

**Request Body:**

```json
{
  "contact": "user@example.com" // or phone number like "+254712345678"
}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Access code sent successfully"
}
```

**Response Error (400/500):**

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Frontend Implementation:**

- User enters email or phone number in sign-in modal
- Frontend sends request to backend
- Backend generates 6-digit code and stores it temporarily
- Backend sends code via email/SMS to user
- User receives code and enters it in verification step

---

### 2. Verify Access Code

**Endpoint:** `POST /auth/verify-code`

**Request Body:**

```json
{
  "contact": "user@example.com",
  "code": "123456"
}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Code verified successfully",
  "expiryDate": 1735689600000, // Unix timestamp
  "user": {
    "contact": "user@example.com",
    "plan": "monthly",
    "accessLevel": "premium"
  }
}
```

**Response Error (400/401):**

```json
{
  "success": false,
  "message": "Invalid or expired code"
}
```

**Frontend Implementation:**

- User enters 6-digit code
- Frontend sends verification request
- Backend validates code against stored codes
- If valid, backend returns user data and expiry date
- Frontend stores auth data in localStorage and grants access

---

### 3. Resend Access Code

**Endpoint:** `POST /auth/resend-code`

**Request Body:**

```json
{
  "contact": "user@example.com"
}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Code resent successfully"
}
```

---

## Payment Flow

### Payment Till Number

```
Till Number: 5628512
Business Name: MemeyAI Digital Solutions
```

### Payment Plans

- **Weekly:** KES 50
- **Monthly:** KES 150
- **Termly:** KES 400

### Admin Payment Approval

**Endpoint:** `POST /admin/approve-payment`

**Request Body:**

```json
{
  "contact": "user@example.com",
  "amount": 150,
  "plan": "monthly",
  "transactionId": "ABC123XYZ"
}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Payment approved and access code sent",
  "accessCode": "123456"
}
```

**Admin Process:**

1. User makes M-PESA payment to Till Number 5628512
2. Admin receives payment notification
3. Admin logs into admin dashboard
4. Admin verifies payment details
5. Admin approves payment in the system
6. Backend generates access code
7. Backend sends code to user via email/SMS
8. User receives code and uses it to sign in

---

## LocalStorage Keys

The frontend stores the following data in localStorage:

```javascript
{
  'shuleai_signed_in': 'true' | 'false',
  'shuleai_contact': 'user@example.com',
  'shuleai_access_code': '123456',
  'shuleai_access_expiry': '1735689600000', // Unix timestamp
  'shuleai_user_data': '{"contact":"user@example.com","plan":"monthly"}'
}
```

---

## M-PESA Payment Instructions

Users follow these steps:

1. Go to M-Pesa on your phone
2. Select Lipa na M-Pesa
3. Select Buy Goods and Services
4. Enter Till Number: **5628512**
5. Enter Amount (KES 50/150/400)
6. Enter your M-Pesa PIN
7. Wait for confirmation SMS
8. Admin verifies and sends access code within 24 hours

---

## Backend Requirements

### Dependencies

```json
{
  "express": "^4.18.0",
  "nodemailer": "^6.9.0",
  "africastalking": "^0.6.0",
  "mongoose": "^7.0.0" // or "pg": "^8.11.0" for PostgreSQL
}
```

### Environment Variables

```env
# Server
PORT=3000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/shuleai
# OR
DATABASE_URL=postgresql://user:password@localhost:5432/shuleai

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS (Africa's Talking)
AFRICASTALKING_API_KEY=your-api-key
AFRICASTALKING_USERNAME=your-username

# M-PESA (Daraja API)
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_PASSKEY=your-passkey
MPESA_SHORTCODE=174379
MPESA_TILL_NUMBER=5628512

# Security
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
```

---

## Database Schema

### Users Collection/Table

```javascript
{
  _id: ObjectId,
  contact: String, // Email or phone number
  plan: String, // 'weekly', 'monthly', 'termly'
  accessCode: String, // Current active code
  expiryDate: Date,
  isActive: Boolean,
  payments: [{
    amount: Number,
    transactionId: String,
    date: Date,
    status: String // 'pending', 'approved', 'rejected'
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Access Codes Collection/Table (Temporary storage)

```javascript
{
  _id: ObjectId,
  contact: String,
  code: String, // 6-digit code
  expiresAt: Date, // Valid for 15 minutes
  attempts: Number, // Track verification attempts
  createdAt: Date
}
```

---

## Error Handling

### Frontend Error Handling

```javascript
try {
  const response = await fetch(`${AUTH_API_BASE_URL}/auth/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact: phoneOrEmail }),
  });
  const data = await response.json();

  if (response.ok && data.success) {
    // Success handling
  } else {
    // Error handling
    alert(data.message || "Error occurred");
  }
} catch (error) {
  console.error("Error:", error);
  alert("Connection error. Please check your internet.");
}
```

### Backend Error Responses

- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Invalid or expired code
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

---

## Security Considerations

1. **Code Expiry:** Access codes expire after 15 minutes
2. **Rate Limiting:** Limit code requests to prevent abuse (max 3 per hour per contact)
3. **Attempt Limiting:** Lock account after 5 failed verification attempts
4. **HTTPS Only:** All API calls must use HTTPS
5. **Input Validation:** Validate all user inputs on backend
6. **SQL Injection Prevention:** Use parameterized queries
7. **XSS Prevention:** Sanitize all user inputs

---

## Testing

### Test Authentication Flow

1. Open index.html in browser
2. Click "Sign In" button
3. Enter email/phone: `test@example.com`
4. Check backend logs for generated code
5. Enter code in verification step
6. Verify access is granted

### Test Payment Flow

1. Make test M-PESA payment to Till 5628512
2. Log into admin dashboard
3. Approve the payment
4. Verify user receives access code
5. User signs in with the code
6. Verify games are accessible

---

## Deployment

### Backend Deployment (Render.com)

1. Push code to GitHub repository
2. Connect repository to Render
3. Configure environment variables
4. Deploy the service
5. Update frontend API_BASE_URL if needed

### Frontend Deployment

- Static hosting: Netlify, Vercel, GitHub Pages
- Update API_BASE_URL in index.html if needed

---

## Support & Contact

For API issues or questions:

- Backend API: https://shuleaibackend-0fcq.onrender.com/api
- Admin Dashboard: admin-dashboard.html
- Documentation: README-AUTH.md

---

## Changelog

### Version 1.0 (January 2025)

- Initial API integration
- Authentication system with 6-digit codes
- Payment instructions with Till Number 5628512
- Admin approval system
- LocalStorage session management
