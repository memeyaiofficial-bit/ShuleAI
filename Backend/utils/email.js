const nodemailer = require("nodemailer");
const {
  SUBSCRIPTION_PLANS,
  TILL_NUMBER,
  SUPPORT_WHATSAPP,
} = require("../config/constants");

class EmailService {
  constructor() {
    // Configure transporter based on EMAIL_SERVICE setting
    const transportConfig = {
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    };

    // Use custom SMTP if EMAIL_SERVICE is 'smtp', otherwise use service name
    if (process.env.EMAIL_SERVICE === "smtp") {
      transportConfig.host = process.env.EMAIL_HOST || "mail.memeyai.com";
      transportConfig.port = parseInt(process.env.EMAIL_PORT || "587");
      transportConfig.secure = process.env.EMAIL_SECURE === "true";
    } else {
      transportConfig.service = process.env.EMAIL_SERVICE || "gmail";
      if (process.env.EMAIL_SERVICE === "gmail") {
        transportConfig.host = "smtp.gmail.com";
        transportConfig.port = 465;
        transportConfig.secure = true;
      }
    }

    this.transporter = nodemailer.createTransport(transportConfig);

    // Verify connection configuration
    this.verifyConnection();
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log("✅ SMTP connection verified");
    } catch (error) {
      console.warn("⚠️ SMTP connection warning:", error.message);
    }
  }

  async sendAccessCode(email, accessCode) {
    console.log("📧 Sending access code to:", email);

    const mailOptions = {
      from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your ShuleAI Access Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2e7d4a, #4caf50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .code-box { background: white; padding: 30px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px dashed #4caf50; }
                .code { font-size: 36px; font-weight: bold; color: #2e7d4a; letter-spacing: 8px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔐 Your Access Code</h1>
                    <p>Welcome to ShuleAI Learning Platform</p>
                </div>
                <div class="content">
                    <h2>Hello!</h2>
                    <p>You requested access to ShuleAI. Here is your 6-digit access code:</p>
                    
                    <div class="code-box">
                        <div class="code">${accessCode}</div>
                    </div>

                    <p><strong>⏰ This code expires in 5 minutes.</strong></p>
                    
                    <p>If you didn't request this code, please ignore this email.</p>

                    <div class="footer">
                        <p>Need help? Contact us at ${
                          process.env.SUPPORT_EMAIL || "support@shuleai.com"
                        }</p>
                        <p>© ${new Date().getFullYear()} ShuleAI. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `Your ShuleAI access code is: ${accessCode}\n\nThis code expires in 5 minutes.\n\nIf you didn't request this code, please ignore this email.`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Access code email sent:", info.messageId);
      return info;
    } catch (error) {
      console.error("❌ Failed to send access code email:", error);
      throw error;
    }
  }

  async sendPaymentRequestEmail(email) {
    console.log("📧 Sending payment request to:", email);

    const mailOptions = {
      from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Payment Required - ShuleAI Access",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2e7d4a, #4caf50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .payment-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border: 2px solid #4caf50; }
                .till-number { font-size: 32px; font-weight: bold; color: #2e7d4a; text-align: center; letter-spacing: 3px; margin: 15px 0; }
                .price { font-size: 24px; color: #2e7d4a; font-weight: bold; }
                .steps { margin: 20px 0; }
                .step { display: flex; margin: 10px 0; align-items: start; }
                .step-num { background: #4caf50; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>💳 Payment Required</h1>
                    <p>Subscribe to access ShuleAI Learning Platform</p>
                </div>
                <div class="content">
                    <h2>Hello!</h2>
                    <p>You attempted to access ShuleAI, but no active subscription was found for your account.</p>
                    
                    <div class="payment-box">
                        <h3 style="text-align: center; margin-top: 0;">Pay via M-PESA</h3>
                        <p style="text-align: center; margin: 10px 0;">Till Number:</p>
                        <div class="till-number">${TILL_NUMBER}</div>
                        <p style="text-align: center; margin: 5px 0;"><strong>Business Name:</strong> MemeyAI Digital Solutions</p>
                    </div>

                    <h3>📱 Payment Instructions:</h3>
                    <div class="steps">
                        <div class="step"><div class="step-num">1</div><div>Go to M-Pesa on your phone</div></div>
                        <div class="step"><div class="step-num">2</div><div>Select Lipa na M-Pesa</div></div>
                        <div class="step"><div class="step-num">3</div><div>Select Buy Goods and Services</div></div>
                        <div class="step"><div class="step-num">4</div><div>Enter Till Number: <strong>${TILL_NUMBER}</strong></div></div>
                        <div class="step"><div class="step-num">5</div><div>Enter amount based on your plan</div></div>
                        <div class="step"><div class="step-num">6</div><div>Enter your M-Pesa PIN</div></div>
                        <div class="step"><div class="step-num">7</div><div>Wait for confirmation SMS</div></div>
                    </div>

                    <h3>💰 Subscription Plans:</h3>
                    <div class="payment-box">
                        <p><strong>Weekly:</strong> <span class="price">KES 50</span> (7 days access)</p>
                        <p><strong>Monthly:</strong> <span class="price">KES 150</span> (30 days access)</p>
                        <p><strong>Termly:</strong> <span class="price">KES 400</span> (90 days access)</p>
                    </div>

                    <p><strong>What happens after payment?</strong></p>
                    <ol>
                        <li>Our admin will verify your payment within 24 hours</li>
                        <li>You'll receive an access code via email</li>
                        <li>Use the code to sign in and enjoy unlimited learning!</li>
                    </ol>

                    <div class="footer">
                        <p>Need help? Contact us at ${
                          process.env.SUPPORT_EMAIL || "support@shuleai.com"
                        }</p>
                        <p>WhatsApp: ${
                          process.env.SUPPORT_WHATSAPP || "+254723456789"
                        }</p>
                        <p>© ${new Date().getFullYear()} ShuleAI. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `Payment Required - ShuleAI Access\n\nYou need an active subscription to access ShuleAI.\n\nPay via M-PESA:\nTill Number: ${TILL_NUMBER}\nBusiness: MemeyAI Digital Solutions\n\nPlans:\n- Weekly: KES 50\n- Monthly: KES 150\n- Termly: KES 400\n\nAfter payment, our admin will verify and send you an access code within 24 hours.`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Payment request email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Failed to send payment request email:", error);
      return { success: false, error: error.message };
    }
  }

  async sendPaymentConfirmation(paymentData) {
    console.log("📧 sendPaymentConfirmation called with:", {
      email: paymentData.email,
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASSWORD,
    });
    const plan = SUBSCRIPTION_PLANS[paymentData.planType];

    const mailOptions = {
      from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
      to: paymentData.email,
      subject: `Payment Received - ShuleAI ${plan.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2e7d4a, #4caf50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Payment Received!</h1>
                    <p>Thank you for subscribing to ShuleAI</p>
                </div>
                <div class="content">
                    <h2>Hello ${paymentData.fullName},</h2>
                    <p>We have received your payment for ShuleAI ${
                      plan.name
                    }.</p>
                    
                    <div class="info-box">
                        <h3>Payment Details:</h3>
                        <p><strong>Transaction Code:</strong> ${
                          paymentData.transactionCode
                        }</p>
                        <p><strong>Amount Paid:</strong> KSh ${
                          paymentData.amount
                        }</p>
                        <p><strong>Plan:</strong> ${plan.name}</p>
                        <p><strong>Till Number:</strong> ${TILL_NUMBER}</p>
                        <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Payment ID:</strong> ${
                          paymentData.paymentId
                        }</p>
                    </div>
                    
                    <div class="info-box">
                        <h3>What's Next?</h3>
                        <p>✅ Your payment is being verified</p>
                        <p>📧 You'll receive another email when your subscription is activated</p>
                        <p>⏰ Activation typically takes 2-24 hours</p>
                        <p>📱 For immediate activation, WhatsApp your M-Pesa confirmation to: <strong>${SUPPORT_WHATSAPP}</strong></p>
                    </div>
                    
                    <p>If you have any questions, please reply to this email or contact our support team.</p>
                    
                    <div class="footer">
                        <p>Best regards,<br>The ShuleAI Team</p>
                        <p>© 2025 ShuleAI. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    try {
      console.log("📤 Attempting to send email via transporter");
      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully:", info.messageId);
      return { success: true };
    } catch (error) {
      console.error("Email Error:", error);
      return { success: false, error: error.message };
    }
  }

  async sendActivationWithAccessCode(paymentData, accessCode) {
    try {
      console.log("📧 Sending activation email with access code:", {
        email: paymentData.email,
        accessCode: accessCode,
      });

      const planType = paymentData.planType || paymentData.plan_type;
      const plan = SUBSCRIPTION_PLANS[planType];

      if (!plan) {
        console.error("❌ Invalid plan type:", planType);
        return { success: false, error: "Invalid plan type" };
      }

      const mailOptions = {
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: paymentData.email,
        subject: "🎉 Payment Approved - Your ShuleAI Access Code",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #2e7d4a, #4caf50); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                  .code-box { background: white; padding: 30px; text-align: center; border-radius: 8px; margin: 20px 0; border: 3px solid #4caf50; }
                  .code { font-size: 42px; font-weight: bold; color: #2e7d4a; letter-spacing: 10px; margin: 20px 0; }
                  .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50; }
                  .btn { background: #4caf50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                  .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>🎉 Payment Approved!</h1>
                      <p>Welcome to ShuleAI Learning Platform</p>
                  </div>
                  <div class="content">
                      <h2>Hello ${paymentData.full_name || "Student"}!</h2>
                      <p>Great news! Your payment has been approved and verified by our admin.</p>
                      
                      <div class="code-box">
                          <h3 style="margin-top: 0; color: #2e7d4a;">🔐 Your Access Code</h3>
                          <div class="code">${accessCode}</div>
                          <p style="margin-bottom: 0;"><strong>⏰ Valid for 5 minutes</strong></p>
                      </div>

                      <h3>How to Sign In:</h3>
                      <ol>
                          <li>Go to <a href="${
                            process.env.FRONTEND_URL ||
                            "https://shule.memeyai.com"
                          }">${process.env.FRONTEND_URL || "ShuleAI"}</a></li>
                          <li>Click "Sign In"</li>
                          <li>Enter your email: <strong>${
                            paymentData.email
                          }</strong></li>
                          <li>Click "Send Access Code"</li>
                          <li>Enter the 6-digit code above</li>
                          <li>Start learning! 🚀</li>
                      </ol>

                      <div class="info-box">
                          <h3>Your Subscription Details:</h3>
                          <p><strong>Plan:</strong> ${plan.name}</p>
                          <p><strong>Amount Paid:</strong> KSh ${
                            paymentData.amount
                          }</p>
                          <p><strong>Transaction Code:</strong> ${
                            paymentData.transaction_code
                          }</p>
                          <p><strong>Valid Until:</strong> ${new Date(
                            paymentData.expires_at
                          ).toLocaleDateString()}</p>
                      </div>

                      <p><strong>✨ What's included:</strong></p>
                      <ul>
                          <li>Access to all educational games</li>
                          <li>Math, Science, English, and more!</li>
                          <li>Interactive learning experiences</li>
                          <li>Progress tracking</li>
                      </ul>

                      <div style="text-align: center;">
                          <a href="${
                            process.env.FRONTEND_URL ||
                            "https://shule.memeyai.com"
                          }" class="btn">Start Learning Now →</a>
                      </div>

                      <div class="footer">
                          <p>Need help? Contact us:</p>
                          <p>📧 ${
                            process.env.SUPPORT_EMAIL || "support@shuleai.com"
                          }</p>
                          <p>📱 WhatsApp: ${
                            process.env.SUPPORT_WHATSAPP || "+254723456789"
                          }</p>
                          <p>© ${new Date().getFullYear()} ShuleAI. All rights reserved.</p>
                      </div>
                  </div>
              </div>
          </body>
          </html>
        `,
        text: `Payment Approved - Your ShuleAI Access Code\n\nYour 6-digit access code: ${accessCode}\n\nValid for: 5 minutes\n\nSubscription: ${
          plan.name
        }\nAmount: KSh ${paymentData.amount}\nValid Until: ${new Date(
          paymentData.expires_at
        ).toLocaleDateString()}\n\nTo sign in:\n1. Go to ${
          process.env.FRONTEND_URL || "ShuleAI"
        }\n2. Click "Sign In"\n3. Enter your email: ${
          paymentData.email
        }\n4. Enter the code above\n\nStart learning now!`,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Activation email with access code sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Failed to send activation email:", error);
      return { success: false, error: error.message };
    }
  }

  async sendActivationConfirmation(paymentData) {
    try {
      console.log("📧 Activation email payment data:", {
        planType: paymentData.planType,
        plan_type: paymentData.plan_type,
        keys: Object.keys(paymentData),
      });

      // Use plan_type (from database) if planType is not available
      const planType = paymentData.planType || paymentData.plan_type;

      if (!planType) {
        console.error("❌ Plan type not found in payment data");
        return { success: false, error: "Plan type not found" };
      }

      const plan = SUBSCRIPTION_PLANS[planType];

      if (!plan) {
        console.error("❌ Invalid plan type:", planType);
        console.log("Available plans:", Object.keys(SUBSCRIPTION_PLANS));
        return { success: false, error: `Invalid plan type: ${planType}` };
      }

      const expiresAt = new Date(paymentData.expires_at);
      const fullName =
        paymentData.full_name || paymentData.fullName || "Valued User";
      const email = paymentData.email;

      if (!email) {
        console.error("❌ Email not found in payment data");
        return { success: false, error: "Email not found" };
      }

      console.log("✅ Preparing activation email for:", {
        email,
        fullName,
        planType,
        planName: plan.name,
        expiresAt: expiresAt.toISOString(),
      });

      const mailOptions = {
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `🎉 Your ShuleAI Subscription is Now Active!`,
        html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #4caf50, #2e7d4a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .success-icon { font-size: 4rem; margin: 20px 0; }
                        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                        .cta-button { display: inline-block; background: #4caf50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="success-icon">✅</div>
                            <h1>Subscription Activated!</h1>
                            <p>Your ShuleAI access is now active</p>
                        </div>
                        <div class="content">
                            <h2>Welcome to ShuleAI Premium, ${fullName}!</h2>
                            
                            <p>Your <strong>${
                              plan.name
                            }</strong> subscription has been verified and activated.</p>
                            
                            <h3>Your Subscription Details:</h3>
                            <ul>
                                <li><strong>Plan:</strong> ${plan.name}</li>
                                <li><strong>Expires:</strong> ${expiresAt.toLocaleDateString()}</li>
                                <li><strong>Days Remaining:</strong> ${Math.ceil(
                                  (expiresAt - new Date()) /
                                    (1000 * 60 * 60 * 24)
                                )} days</li>
                                <li><strong>Access Level:</strong> Full access to all games and features</li>
                            </ul>
                            
                            <a href="${
                              process.env.FRONTEND_URL ||
                              "https://shule.memeyai.com"
                            }" class="cta-button">
                                Start Playing Now! 🎮
                            </a>
                            
                            <p><strong>Need Help?</strong></p>
                            <ul>
                                <li>Email: ${
                                  process.env.SUPPORT_EMAIL ||
                                  process.env.EMAIL_USER
                                }</li>
                                <li>WhatsApp: ${SUPPORT_WHATSAPP}</li>
                                <li>Website: ${
                                  process.env.FRONTEND_URL ||
                                  "hhttps://shule.memeyai.com"
                                }</li>
                            </ul>
                            
                            <div class="footer">
                                <p>Happy learning!<br>The ShuleAI Team</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
      };

      console.log("📤 Sending activation email to:", email);
      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Activation email sent successfully:", info.messageId);

      return { success: true };
    } catch (error) {
      console.error("❌ Activation Email Error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
      return { success: false, error: error.message };
    }
  }

  /* async sendActivationConfirmation(paymentData) {
    const plan = SUBSCRIPTION_PLANS[paymentData.planType];
    const expiresAt = new Date(paymentData.expires_at);

    const mailOptions = {
      from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
      to: paymentData.email,
      subject: `🎉 Your ShuleAI Subscription is Now Active!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #4caf50, #2e7d4a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .success-icon { font-size: 4rem; margin: 20px 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .cta-button { display: inline-block; background: #4caf50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="success-icon">✅</div>
                    <h1>Subscription Activated!</h1>
                    <p>Your ShuleAI access is now active</p>
                </div>
                <div class="content">
                    <h2>Welcome to ShuleAI Premium, ${
                      paymentData.full_name
                    }!</h2>
                    
                    <p>Your <strong>${
                      plan.name
                    }</strong> subscription has been verified and activated.</p>
                    
                    <h3>Your Subscription Details:</h3>
                    <ul>
                        <li><strong>Plan:</strong> ${plan.name}</li>
                        <li><strong>Expires:</strong> ${expiresAt.toLocaleDateString()}</li>
                        <li><strong>Days Remaining:</strong> ${Math.ceil(
                          (expiresAt - new Date()) / (1000 * 60 * 60 * 24)
                        )} days</li>
                        <li><strong>Access Level:</strong> Full access to all games and features</li>
                    </ul>
                    
                    <a href="${
                      process.env.FRONTEND_URL || "http://localhost:5500"
                    }" class="cta-button">
                        Start Playing Now! 🎮
                    </a>
                    
                    <p><strong>Need Help?</strong></p>
                    <ul>
                        <li>Email: ${process.env.SUPPORT_EMAIL}</li>
                        <li>WhatsApp: ${SUPPORT_WHATSAPP}</li>
                        <li>Website: ${
                          process.env.FRONTEND_URL || "http://localhost:5500"
                        }</li>
                    </ul>
                    
                    <div class="footer">
                        <p>Happy learning!<br>The ShuleAI Team</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Activation Email Error:", error);
      return { success: false, error: error.message };
    }
  } */
}

module.exports = new EmailService();
