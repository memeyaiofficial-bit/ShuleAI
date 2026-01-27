# ShuleAI Authentication & Payment System

## Overview

This system implements a code-based authentication flow where users make payments and receive access codes via email/SMS from admins.

## How It Works

### For Users:

1. **Visit Landing Page**

   - User sees pricing options (Weekly/Monthly/Termly)
   - Clicks "Sign In to Get Started"

2. **Make Payment**

   - User clicks "View payment options"
   - Sends M-PESA payment to ShuleAI number
   - Includes their phone number/email in payment notes

3. **Receive Access Code**

   - Admin approves payment (usually within 24 hours)
   - User receives 6-digit access code via email or SMS
   - Code is valid for the subscription period

4. **Sign In**
   - User enters their phone/email
   - System sends the access code
   - User enters code and gains access
   - Access is valid until subscription expires

### For Admins:

1. **Payment Notification**

   - M-PESA sends payment confirmation to backend
   - Payment appears in admin dashboard as "Pending"

2. **Review & Approve**

   - Admin reviews payment details
   - Verifies amount and contact information
   - Selects appropriate plan (Weekly/Monthly/Termly)
   - Clicks "Approve"

3. **Code Generation & Sending**
   - System generates 6-digit access code
   - Calculates expiry date based on plan
   - Sends code to user via email/SMS
   - Updates user's subscription status

## Files Structure

```
ShuleAIv1/
├── index.html                          # Main app with landing page & sign-in
├── admin-dashboard.html                # Admin panel for approving payments
├── backend/
│   └── auth-api-example.js            # Backend API endpoints
└── README-AUTH.md                      # This file
```

## API Endpoints

### User Endpoints

**1. Request Sign In Code**

```
POST /api/auth/send-code
Body: { "contact": "email@example.com" or "0712345678" }
Response: { "success": true, "message": "Access code sent" }
```

**2. Verify Access Code**

```
POST /api/auth/verify-code
Body: { "contact": "email@example.com", "code": "123456" }
Response: {
  "success": true,
  "user": { ... },
  "sessionToken": "...",
  "expiryDate": 1234567890
}
```

**3. Resend Code**

```
POST /api/auth/resend-code
Body: { "contact": "email@example.com" }
Response: { "success": true, "message": "New access code sent" }
```

### Admin Endpoints

**1. Get Pending Payments**

```
GET /api/admin/pending-payments
Headers: { "Authorization": "Bearer admin_token" }
Response: {
  "success": true,
  "payments": [...]
}
```

**2. Approve Payment**

```
POST /api/admin/approve-payment
Headers: { "Authorization": "Bearer admin_token" }
Body: {
  "transactionId": "TXN123",
  "contact": "email@example.com",
  "plan": "monthly"
}
Response: {
  "success": true,
  "user": { ... }
}
```

### Payment Webhook

**M-PESA Callback**

```
POST /api/payments/mpesa-callback
Body: {
  "phone": "0712345678",
  "amount": 150,
  "transactionId": "TXN123",
  "timestamp": 1234567890
}
```

## Database Schema

### Users Collection

```javascript
{
  contact: "email@example.com" or "0712345678",
  plan: "weekly" | "monthly" | "termly",
  accessCode: "123456",
  expiryDate: 1234567890,
  transactionId: "TXN123",
  createdAt: 1234567890,
  codeGeneratedAt: 1234567890,
  sessionToken: "...",
  lastLogin: 1234567890
}
```

### Payments Collection

```javascript
{
  transactionId: "TXN123",
  phone: "0712345678",
  amount: 150,
  timestamp: 1234567890,
  status: "pending" | "approved" | "rejected",
  approvedAt: 1234567890,
  approvedBy: "admin_id"
}
```

## Implementation Steps

### 1. Setup Backend

**Install Dependencies:**

```bash
npm install express mongoose nodemailer africastalking jsonwebtoken bcrypt
```

**Environment Variables (.env):**

```
DB_URI=mongodb://localhost:27017/shuleai
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
AFRICASTALKING_USERNAME=your-username
AFRICASTALKING_API_KEY=your-api-key
ADMIN_SECRET=your-admin-secret
JWT_SECRET=your-jwt-secret
```

### 2. Configure M-PESA

1. Register for Daraja API (M-PESA)
2. Get Consumer Key and Secret
3. Set up STK Push for payments
4. Configure callback URL: `https://yourdomain.com/api/payments/mpesa-callback`

### 3. Configure Email Service

**Gmail Setup:**

1. Enable 2-factor authentication
2. Generate App Password
3. Use in EMAIL_PASS environment variable

### 4. Configure SMS Service

**Africa's Talking:**

1. Create account at africastalking.com
2. Get API key and username
3. Purchase SMS credits
4. Configure in environment variables

### 5. Deploy

**Frontend:**

- Upload HTML files to web server or hosting
- Or use services like Netlify, Vercel, GitHub Pages

**Backend:**

- Deploy to Heroku, Railway, or DigitalOcean
- Set environment variables
- Enable HTTPS
- Configure CORS

## Security Considerations

1. **Access Codes**

   - Codes expire after 15 minutes
   - New code invalidates previous one
   - Rate limit code requests

2. **Admin Authentication**

   - Use strong JWT tokens
   - Implement role-based access
   - Log all admin actions

3. **Payment Verification**

   - Verify M-PESA callback signatures
   - Store transaction IDs
   - Prevent duplicate approvals

4. **Data Protection**
   - Hash sensitive data
   - Use HTTPS only
   - Implement CSRF protection
   - Regular security audits

## Testing

### Test User Flow

1. Open index.html in browser
2. Click "Sign In to Get Started"
3. Enter any phone/email
4. Use test code: "123456" (in demo mode)
5. Access granted to main app

### Test Admin Flow

1. Open admin-dashboard.html
2. See pending payments
3. Click "Approve" on any payment
4. Enter contact and select plan
5. Confirm - code would be sent in production

## Pricing Plans

| Plan    | Duration | Price   |
| ------- | -------- | ------- |
| Weekly  | 7 days   | KES 50  |
| Monthly | 30 days  | KES 150 |
| Termly  | 90 days  | KES 400 |

## Support

For technical support, contact:

- Email: support@shuleai.com
- Phone: 0712 345 678
- WhatsApp: +254 712 345 678

## Future Enhancements

1. **Auto-renewal**

   - Send renewal reminders
   - Auto-charge saved M-PESA numbers

2. **Promo Codes**

   - Discount codes for special offers
   - Referral bonuses

3. **Analytics Dashboard**

   - Revenue tracking
   - User engagement metrics
   - Popular games statistics

4. **Mobile App**

   - Native iOS/Android apps
   - Push notifications for access codes

5. **Multiple Payment Methods**
   - Bank transfers
   - PayPal
   - Card payments

## License

Copyright © 2025 ShuleAI. All rights reserved.
