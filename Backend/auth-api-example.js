/**
 * ShuleAI Authentication API - Backend Example
 * This shows how the admin approval and code generation system works
 *
 * Technology Stack Suggestions:
 * - Node.js + Express for API
 * - MongoDB/PostgreSQL for database
 * - Nodemailer for email sending
 * - Twilio/Africa's Talking for SMS
 */

const express = require("express");
const router = express.Router();

// Mock database (replace with actual database queries)
const users = new Map();
const pendingPayments = new Map();

/**
 * Generate a random 6-digit access code
 */
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send email with access code
 */
async function sendEmailCode(email, code, expiryDate) {
  // Using nodemailer example
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: "your-email@example.com",
      pass: "your-app-password",
    },
  });

  const mailOptions = {
    from: "ShuleAI <noreply@shuleai.com>",
    to: email,
    subject: "Your ShuleAI Access Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Welcome to ShuleAI!</h2>
        <p>Your access code is ready. Use it to sign in and start learning.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
          <h1 style="color: #4CAF50; font-size: 48px; margin: 0;">${code}</h1>
          <p style="color: #666;">Access Code</p>
        </div>
        
        <p><strong>Valid until:</strong> ${new Date(
          expiryDate
        ).toLocaleDateString()}</p>
        
        <p>To sign in:</p>
        <ol>
          <li>Go to <a href="https://shuleai.com">shuleai.com</a></li>
          <li>Click "Sign In"</li>
          <li>Enter your email: ${email}</li>
          <li>Enter this access code</li>
        </ol>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Send SMS with access code
 */
async function sendSMSCode(phone, code, expiryDate) {
  // Using Africa's Talking example
  const AfricasTalking = require("africastalking");

  const africastalking = AfricasTalking({
    apiKey: "YOUR_API_KEY",
    username: "YOUR_USERNAME",
  });

  const sms = africastalking.SMS;

  const message = `Your ShuleAI access code is: ${code}. Valid until ${new Date(
    expiryDate
  ).toLocaleDateString()}. Use it to sign in at shuleai.com`;

  await sms.send({
    to: [phone],
    message: message,
  });
}

/**
 * ENDPOINT 1: User requests to sign in
 * POST /api/auth/send-code
 * Body: { contact: "email@example.com" or "0712345678" }
 */
router.post("/send-code", async (req, res) => {
  try {
    const { contact } = req.body;

    // Check if user exists and has active subscription
    const user = users.get(contact);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found. Please make a payment first.",
      });
    }

    if (user.expiryDate < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Your subscription has expired. Please renew to continue.",
      });
    }

    // Generate new access code
    const accessCode = generateAccessCode();
    user.accessCode = accessCode;
    user.codeGeneratedAt = Date.now();

    // Send code via email or SMS
    const isEmail = contact.includes("@");
    if (isEmail) {
      await sendEmailCode(contact, accessCode, user.expiryDate);
    } else {
      await sendSMSCode(contact, accessCode, user.expiryDate);
    }

    res.json({
      success: true,
      message: `Access code sent to ${contact}`,
    });
  } catch (error) {
    console.error("Error sending code:", error);
    res.status(500).json({
      success: false,
      message: "Error sending code. Please try again.",
    });
  }
});

/**
 * ENDPOINT 2: User verifies access code
 * POST /api/auth/verify-code
 * Body: { contact: "email@example.com", code: "123456" }
 */
router.post("/verify-code", async (req, res) => {
  try {
    const { contact, code } = req.body;

    const user = users.get(contact);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if code matches
    if (user.accessCode !== code) {
      return res.status(401).json({
        success: false,
        message: "Invalid access code",
      });
    }

    // Check if code is expired (codes expire after 15 minutes)
    const codeAge = Date.now() - user.codeGeneratedAt;
    if (codeAge > 15 * 60 * 1000) {
      return res.status(401).json({
        success: false,
        message: "Access code expired. Please request a new one.",
      });
    }

    // Generate session token
    const sessionToken = generateAccessCode() + generateAccessCode(); // 12 digits
    user.sessionToken = sessionToken;
    user.lastLogin = Date.now();

    res.json({
      success: true,
      message: "Sign in successful",
      user: {
        contact: user.contact,
        plan: user.plan,
        expiryDate: user.expiryDate,
      },
      sessionToken: sessionToken,
      expiryDate: user.expiryDate,
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying code. Please try again.",
    });
  }
});

/**
 * ENDPOINT 3: Admin receives payment notification (M-PESA callback)
 * POST /api/payments/mpesa-callback
 */
router.post("/mpesa-callback", async (req, res) => {
  try {
    // M-PESA sends payment confirmation
    const { phone, amount, transactionId, timestamp } = req.body;

    // Store pending payment for admin review
    pendingPayments.set(transactionId, {
      phone,
      amount,
      transactionId,
      timestamp,
      status: "pending",
    });

    // Notify admin (via email, dashboard, etc.)
    // Admin will review and approve

    res.json({ success: true });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false });
  }
});

/**
 * ADMIN ENDPOINT: Approve payment and send access code
 * POST /api/admin/approve-payment
 * Body: { transactionId: "xxx", contact: "email or phone", plan: "weekly/monthly/termly" }
 */
router.post("/admin/approve-payment", async (req, res) => {
  try {
    const { transactionId, contact, plan } = req.body;

    // Verify admin authentication (add your auth middleware)

    const payment = pendingPayments.get(transactionId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Determine subscription duration based on plan
    let durationDays;
    switch (plan) {
      case "weekly":
        durationDays = 7;
        break;
      case "monthly":
        durationDays = 30;
        break;
      case "termly":
        durationDays = 90;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid plan",
        });
    }

    // Generate access code
    const accessCode = generateAccessCode();
    const expiryDate = Date.now() + durationDays * 24 * 60 * 60 * 1000;

    // Create or update user
    const user = {
      contact,
      plan,
      accessCode,
      expiryDate,
      transactionId,
      createdAt: Date.now(),
      codeGeneratedAt: Date.now(),
    };

    users.set(contact, user);

    // Update payment status
    payment.status = "approved";
    payment.approvedAt = Date.now();

    // Send access code to user
    const isEmail = contact.includes("@");
    if (isEmail) {
      await sendEmailCode(contact, accessCode, expiryDate);
    } else {
      await sendSMSCode(contact, accessCode, expiryDate);
    }

    res.json({
      success: true,
      message: `Access code sent to ${contact}`,
      user: {
        contact,
        plan,
        expiryDate,
        daysRemaining: durationDays,
      },
    });
  } catch (error) {
    console.error("Error approving payment:", error);
    res.status(500).json({
      success: false,
      message: "Error approving payment",
    });
  }
});

/**
 * ADMIN ENDPOINT: Get pending payments
 * GET /api/admin/pending-payments
 */
router.get("/admin/pending-payments", async (req, res) => {
  try {
    // Verify admin authentication

    const pending = Array.from(pendingPayments.values())
      .filter((p) => p.status === "pending")
      .sort((a, b) => b.timestamp - a.timestamp);

    res.json({
      success: true,
      payments: pending,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
    });
  }
});

/**
 * ENDPOINT: Resend access code
 * POST /api/auth/resend-code
 */
router.post("/resend-code", async (req, res) => {
  try {
    const { contact } = req.body;

    const user = users.get(contact);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new code
    const accessCode = generateAccessCode();
    user.accessCode = accessCode;
    user.codeGeneratedAt = Date.now();

    // Send code
    const isEmail = contact.includes("@");
    if (isEmail) {
      await sendEmailCode(contact, accessCode, user.expiryDate);
    } else {
      await sendSMSCode(contact, accessCode, user.expiryDate);
    }

    res.json({
      success: true,
      message: "New access code sent",
    });
  } catch (error) {
    console.error("Error resending code:", error);
    res.status(500).json({
      success: false,
      message: "Error resending code",
    });
  }
});

module.exports = router;
