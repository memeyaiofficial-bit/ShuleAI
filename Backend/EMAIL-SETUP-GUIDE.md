# Email Configuration Guide for ShuleAI

## Current Issue

❌ SMTP Error: `Invalid login: 535-5.7.8 Username and Password not accepted`

Your backend is trying to use `shule@memeyai.com` with Gmail but authentication is failing.

---

## Solution 1: Gmail with App Password (Recommended)

### Steps:

1. **Enable 2-Step Verification**

   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification" and follow the setup

2. **Generate App Password**

   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "ShuleAI Backend"
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Update .env file**

   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=shule@memeyai.com
   EMAIL_PASSWORD=abcdefghijklmnop  # Paste app password (no spaces)
   ```

4. **Restart your backend**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

---

## Solution 2: Use Sendinblue (Brevo) - FREE

Sendinblue offers 300 free emails per day, perfect for development and small apps.

### Steps:

1. **Sign up**: https://www.brevo.com/ (formerly Sendinblue)
2. **Get SMTP credentials**:

   - Go to Settings → SMTP & API
   - Create SMTP key
   - Copy the credentials

3. **Update .env file**

   ```env
   EMAIL_SERVICE=smtp
   EMAIL_HOST=smtp-relay.brevo.com
   EMAIL_PORT=587
   EMAIL_USER=your-brevo-email@example.com
   EMAIL_PASSWORD=your-brevo-smtp-key
   EMAIL_SECURE=false
   SUPPORT_EMAIL=support@shuleai.com
   ```

4. **Update email.js to support custom SMTP**
   (If needed, I can help modify the code)

---

## Solution 3: Use Mailgun - FREE Tier

Mailgun offers 5,000 free emails per month.

### Steps:

1. **Sign up**: https://www.mailgun.com/
2. **Verify your domain** (or use sandbox domain for testing)
3. **Get SMTP credentials**:

   - Go to Sending → Domain settings → SMTP credentials

4. **Update .env file**
   ```env
   EMAIL_SERVICE=smtp
   EMAIL_HOST=smtp.mailgun.org
   EMAIL_PORT=587
   EMAIL_USER=postmaster@your-domain.mailgun.org
   EMAIL_PASSWORD=your-mailgun-password
   EMAIL_SECURE=false
   ```

---

## Solution 4: Use Custom SMTP Provider

If you have your own email server or another provider:

```env
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
EMAIL_SECURE=false  # Set to true for port 465
```

---

## Testing Email After Configuration

Run the test email script:

```bash
cd Backend
node test-email.js
```

You should see:

```
Testing with: shule@memeyai.com
✅ Email sent successfully!
Message ID: <some-id>
```

---

## Common Issues & Fixes

### Issue: "Invalid login"

- **Gmail**: Use App Password, not regular password
- **Other**: Verify username and password are correct

### Issue: "Connection timeout"

- Check EMAIL_PORT (usually 587 for TLS or 465 for SSL)
- Verify EMAIL_HOST is correct
- Check firewall settings

### Issue: "Self-signed certificate"

```env
EMAIL_SECURE=false
# Add this to disable certificate validation (development only)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Issue: "Email sent but not received"

- Check spam folder
- Verify sender email is valid
- Check email service limits

---

## Current Backend Configuration

Your backend uses nodemailer with this configuration:

**File:** `Backend/utils/email.js`

```javascript
const transporter = nodemailer.createTransporter({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

---

## Recommended: Gmail App Password

For fastest setup with your existing `shule@memeyai.com` email:

1. Enable 2FA on the Gmail account
2. Generate App Password
3. Update .env with the 16-char password (remove spaces)
4. Restart backend
5. Test with: `node test-email.js`

---

## After Fixing Email

Once email is working, test the full authentication flow:

1. Open index.html in browser
2. Click "Sign In"
3. Enter your email
4. Check inbox for 6-digit code
5. Enter code to verify
6. Access granted!

---

## Production Considerations

For production deployment:

1. **Use dedicated email service** (not personal Gmail)
2. **Set up SPF/DKIM records** for better deliverability
3. **Monitor email limits** (Gmail: 500/day, Sendinblue: 300/day free)
4. **Implement email queues** for high volume
5. **Add retry logic** for failed sends
6. **Log all email attempts** for debugging

---

## Need Help?

If you're still having issues:

1. Share the exact error message from terminal
2. Confirm which email service you want to use
3. Let me know if you need help modifying the backend code

**Last Updated:** January 15, 2026
