const express = require("express");
const router = express.Router();
const { Query, ID } = require("node-appwrite");
const appwriteService = require("../utils/appwrite");
const emailService = require("../utils/email");

// Generate 6-digit access code
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/send-code - Request access code
router.post("/send-code", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required",
      });
    }

    // Validate email or phone format
    const isEmail = contact.includes("@");
    const isPhone = /^\+?[0-9]{10,15}$/.test(contact.replace(/\s/g, ""));

    if (!isEmail && !isPhone) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email or phone number",
      });
    }

    console.log("🔍 Checking payment status for:", contact);

    // Check if user has an approved payment
    try {
      const payments = await appwriteService.databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.USER_PAYMENTS_COLLECTION_ID,
        [Query.equal("email", contact), Query.equal("status", "active")],
      );

      if (payments.documents.length === 0) {
        // No approved payment found - send payment request email
        console.log("❌ No active subscription found for:", contact);

        if (isEmail) {
          try {
            await emailService.sendPaymentRequestEmail(contact);
            console.log("✅ Payment request email sent to:", contact);
          } catch (emailError) {
            console.error("❌ Email error:", emailError);
          }
        }

        return res.status(403).json({
          success: false,
          message:
            "No active subscription found. Please make a payment first to access the platform.",
          requiresPayment: true,
        });
      }

      // User has approved payment - check if still valid
      const latestPayment = payments.documents[0];
      const expiryDate = new Date(latestPayment.expires_at);

      if (expiryDate < new Date()) {
        console.log("❌ Subscription expired for:", contact);

        if (isEmail) {
          try {
            await emailService.sendPaymentRequestEmail(contact);
            console.log("✅ Payment request email sent to:", contact);
          } catch (emailError) {
            console.error("❌ Email error:", emailError);
          }
        }

        return res.status(403).json({
          success: false,
          message:
            "Your subscription has expired. Please renew your payment to continue.",
          requiresPayment: true,
        });
      }

      console.log("✅ Active subscription found for:", contact);
    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      return res.status(500).json({
        success: false,
        message: "Error checking payment status. Please try again.",
      });
    }

    // Generate 6-digit code
    const accessCode = generateAccessCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    console.log("📧 Generated code for", contact, ":", accessCode);

    // Store code in database (Appwrite)
    try {
      // Check if contact already has a pending code
      const existingCodes = await appwriteService.databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.SESSIONS_COLLECTION_ID,
        [Query.equal("contact", contact), Query.equal("type", "access_code")],
      );

      // Delete old codes
      for (const doc of existingCodes.documents) {
        await appwriteService.databases.deleteDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.SESSIONS_COLLECTION_ID,
          doc.$id,
        );
      }

      // Create new code
      await appwriteService.databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.SESSIONS_COLLECTION_ID,
        ID.unique(),
        {
          contact,
          code: accessCode,
          type: "access_code",
          expiresAt: expiresAt.toISOString(),
          attempts: 0,
          createdAt: new Date().toISOString(),
        },
      );
    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      // Continue even if database fails - we can still send the code
    }

    // Send code via email/SMS
    if (isEmail) {
      try {
        await emailService.sendAccessCode(contact, accessCode);
        console.log("✅ Access code sent to email:", contact);
      } catch (emailError) {
        console.error("❌ Email error:", emailError);
        return res.status(500).json({
          success: false,
          message: "Failed to send email. Please try again or contact support.",
        });
      }
    } else {
      // TODO: Implement SMS sending with Africa's Talking
      console.log("📱 SMS sending not yet implemented. Code:", accessCode);
      return res.status(501).json({
        success: false,
        message: "SMS sending is not yet available. Please use email instead.",
      });
    }

    res.json({
      success: true,
      message: "Access code sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("❌ Send code error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// POST /api/auth/verify-code - Verify access code
router.post("/verify-code", async (req, res) => {
  try {
    const { contact, code } = req.body;

    if (!contact || !code) {
      return res.status(400).json({
        success: false,
        message: "Contact and code are required",
      });
    }

    console.log("🔐 Verifying code for:", contact);

    // Handle special codes (bypass database lookup)
    if (code.startsWith("SPECIAL-")) {
      console.log("🎁 Processing special code:", code);

      // Define valid special codes with creation dates
      const validSpecialCodes = {
        "SPECIAL-DEMO1": {
          created: "2026-01-27",
          description: "Demo Access Code 1",
        },
        "SPECIAL-DEMO2": {
          created: "2026-01-26",
          description: "Demo Access Code 2",
        },
        "SPECIAL-TRIAL": {
          created: "2026-01-27",
          description: "Trial Access Code",
        },
        "SPECIAL-TEST1": {
          created: "2026-01-27",
          description: "Test Access Code 1",
        },
      };

      const codeInfo = validSpecialCodes[code];

      if (!codeInfo) {
        return res.status(401).json({
          success: false,
          message: "Invalid special code. Please check and try again.",
        });
      }

      // Check if special code has expired (2 days from creation)
      const createdDate = new Date(codeInfo.created);
      const expiryDate = new Date(
        createdDate.getTime() + 2 * 24 * 60 * 60 * 1000,
      ); // 2 days
      const now = new Date();

      if (now > expiryDate) {
        return res.status(401).json({
          success: false,
          message: `Special code has expired. It was valid from ${createdDate.toLocaleDateString()} to ${expiryDate.toLocaleDateString()}.`,
        });
      }

      // Special code is valid - return access
      console.log("✅ Special code verified successfully for:", contact);

      return res.json({
        success: true,
        message: "Special code verified successfully",
        user: {
          contact,
          accessLevel: "special",
          accessType: "special",
          plan: "special_access",
          gamesAllowed: -1, // Unlimited for special codes
          expiryDate: expiryDate.getTime(),
          codeDescription: codeInfo.description,
        },
        expiryDate: expiryDate.getTime(),
      });
    }

    // Find the code in database
    const existingCodes = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.SESSIONS_COLLECTION_ID,
      [
        Query.equal("contact", contact),
        Query.equal("type", "access_code"),
        Query.equal("code", code),
      ],
    );

    if (existingCodes.documents.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid access code. Please check and try again.",
      });
    }

    const codeDoc = existingCodes.documents[0];

    // Check if code has expired
    if (new Date(codeDoc.expiresAt) < new Date()) {
      // Delete expired code
      await appwriteService.databases.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.SESSIONS_COLLECTION_ID,
        codeDoc.$id,
      );

      return res.status(401).json({
        success: false,
        message: "Access code has expired. Please request a new one.",
      });
    }

    // Check for active subscription
    const payments = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USER_PAYMENTS_COLLECTION_ID,
      [Query.equal("email", contact), Query.equal("status", "approved")],
    );

    let userData = {
      contact,
      accessLevel: "trial",
      plan: "none",
      gamesAllowed: 0,
      expiryDate: null,
    };

    if (payments.documents.length > 0) {
      // Find the most recent active payment
      const activePayments = payments.documents.filter((payment) => {
        if (!payment.expiryDate) return false;
        const expiry = new Date(payment.expiryDate);
        return expiry > new Date();
      });

      if (activePayments.length > 0) {
        // Sort by expiry date (latest first) and get the most recent
        const latestPayment = activePayments.sort(
          (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate),
        )[0];

        userData = {
          contact,
          accessLevel: "premium",
          plan: latestPayment.planType || latestPayment.plan_type || "monthly",
          gamesAllowed: latestPayment.gamesAllowed || 20,
          expiryDate: latestPayment.expiryDate,
        };
      } else {
        // Has payment but expired
        const latestPayment = payments.documents[0];
        userData = {
          contact,
          accessLevel: "expired",
          plan: latestPayment.planType || latestPayment.plan_type || "none",
          gamesAllowed: 0,
          expiryDate: latestPayment.expiryDate,
        };
      }
    }

    // Delete the used code
    await appwriteService.databases.deleteDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.SESSIONS_COLLECTION_ID,
      codeDoc.$id,
    );

    console.log("✅ Code verified successfully for:", contact);

    res.json({
      success: true,
      message: "Code verified successfully",
      user: userData,
      expiryDate: userData.expiryDate || Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("❌ Verify code error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// POST /api/auth/request-new-code - Request new code from admin
router.post("/request-new-code", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required",
      });
    }

    console.log(`📧 New code request from: ${contact}`);

    // Check if user has an approved/active payment
    const payments = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USER_PAYMENTS_COLLECTION_ID,
      [Query.equal("email", contact)],
    );

    // Also check by phone if email search returns nothing
    let activePayments = payments.documents.filter(
      (p) => p.status === "approved" || p.status === "active",
    );

    if (activePayments.length === 0 && payments.documents.length === 0) {
      // Try searching by phone
      const phonePayments = await appwriteService.databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.USER_PAYMENTS_COLLECTION_ID,
        [Query.equal("phone", contact)],
      );
      activePayments = phonePayments.documents.filter(
        (p) => p.status === "approved" || p.status === "active",
      );
    }

    if (activePayments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active subscription found. Please make a payment first.",
      });
    }

    // Check if code already exists and is not expired
    const existingCodes = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.SESSIONS_COLLECTION_ID,
      [Query.equal("contact", contact), Query.equal("type", "access_code")],
    );

    if (existingCodes.documents.length > 0) {
      const codeDoc = existingCodes.documents[0];
      const expiresAt = new Date(codeDoc.expiresAt);

      if (expiresAt > new Date()) {
        return res.status(400).json({
          success: false,
          message:
            "You already have a valid access code. Please check your email/SMS.",
        });
      }
    }

    // Send notification to admin about code request
    const emailService = require("../utils/email");
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || "shuleaiadmin@memeyai.com",
        subject: "New Access Code Request",
        html: `
          <h2>New Access Code Request</h2>
          <p>A user has requested a new access code:</p>
          <ul>
            <li><strong>Contact:</strong> ${contact}</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p>Please review their payment status and generate a new code in the admin dashboard.</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ Admin notification email failed:", emailError.message);
    }

    // Send confirmation to user
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: contact,
        subject: "Access Code Request Received",
        html: `
          <h2>Access Code Request Received</h2>
          <p>Hi there!</p>
          <p>We've received your request for a new access code.</p>
          <p>Our admin team will review your request and send you a new code shortly (usually within a few minutes).</p>
          <p>Thank you for your patience!</p>
          <br>
          <p>Best regards,<br>ShuleAI Team</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ User notification email failed:", emailError.message);
    }

    res.json({
      success: true,
      message:
        "Your request has been sent to the admin. You will receive a new code shortly.",
    });
  } catch (error) {
    console.error("❌ Request new code error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// POST /api/auth/resend-code - Resend access code (kept for compatibility)
router.post("/resend-code", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Contact is required",
      });
    }

    // Call the send-code endpoint
    return router.handle({ ...req, body: { contact } }, res);
  } catch (error) {
    console.error("❌ Resend code error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// GET /api/auth/admin/code-requests - Get all code requests (Admin only)
router.get("/admin/code-requests", async (req, res) => {
  try {
    const adminKey = req.headers["admin-key"];

    if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Get all approved/active payments
    const paymentsApproved = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USER_PAYMENTS_COLLECTION_ID,
      [Query.equal("status", "approved"), Query.limit(100)],
    );

    const paymentsActive = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USER_PAYMENTS_COLLECTION_ID,
      [Query.equal("status", "active"), Query.limit(100)],
    );

    const allPayments = [
      ...paymentsApproved.documents,
      ...paymentsActive.documents,
    ];

    // Get all existing codes
    const codes = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.SESSIONS_COLLECTION_ID,
      [Query.equal("type", "access_code"), Query.limit(100)],
    );

    // Build requests list - users with expired or no codes
    const requests = [];
    const now = new Date();

    for (const payment of allPayments) {
      const userCode = codes.documents.find((c) => c.contact === payment.email);

      // Check if code is expired or doesn't exist
      const isExpired = userCode ? new Date(userCode.expiresAt) <= now : true;

      // Only include if they need a new code
      if (isExpired || !userCode) {
        requests.push({
          contact: payment.email,
          planType: payment.planType || payment.plan_type,
          expiryDate: payment.expiryDate || payment.expires_at,
          hasActiveCode: false,
          requestDate: payment.$updatedAt,
        });
      }
    }

    res.json({
      success: true,
      requests: requests,
    });
  } catch (error) {
    console.error("❌ Get code requests error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

// POST /api/auth/admin/generate-code - Generate new code (Admin only)
router.post("/admin/generate-code", async (req, res) => {
  try {
    const adminKey = req.headers["admin-key"];
    const { contact } = req.body;

    if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Contact is required",
      });
    }

    console.log(`🔑 Admin generating new code for: ${contact}`);

    // Check if user has an approved/active payment
    const payments = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.USER_PAYMENTS_COLLECTION_ID,
      [Query.equal("email", contact)],
    );

    // Also check by phone if email search returns nothing
    let activePayments = payments.documents.filter(
      (p) => p.status === "approved" || p.status === "active",
    );

    if (activePayments.length === 0 && payments.documents.length === 0) {
      // Try searching by phone
      const phonePayments = await appwriteService.databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.USER_PAYMENTS_COLLECTION_ID,
        [Query.equal("phone", contact)],
      );
      activePayments = phonePayments.documents.filter(
        (p) => p.status === "approved" || p.status === "active",
      );
    }

    if (activePayments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No approved payment found for this user",
      });
    }

    const payment = activePayments[0];

    // Generate 6-digit access code
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Delete any existing codes for this email
    const existingCodes = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.SESSIONS_COLLECTION_ID,
      [Query.equal("contact", contact), Query.equal("type", "access_code")],
    );

    for (const doc of existingCodes.documents) {
      await appwriteService.databases.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.SESSIONS_COLLECTION_ID,
        doc.$id,
      );
    }

    // Create new access code
    const { ID } = require("node-appwrite");
    await appwriteService.databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.SESSIONS_COLLECTION_ID,
      ID.unique(),
      {
        contact: contact,
        code: accessCode,
        type: "access_code",
        expiresAt: expiresAt.toISOString(),
        attempts: 0,
        $createdAt: new Date().toISOString(),
      },
    );

    console.log(`✅ Code generated: ${accessCode}`);

    // Send email with access code
    const emailService = require("../utils/email");
    await emailService.sendAccessCode(contact, accessCode);

    res.json({
      success: true,
      message: "Access code generated and sent successfully",
      code: accessCode,
    });
  } catch (error) {
    console.error("❌ Generate code error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
});

module.exports = router;
