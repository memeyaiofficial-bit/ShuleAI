const express = require("express");
const router = express.Router();
const { Query, ID } = require("node-appwrite");
const appwriteService = require("../utils/appwrite");
const emailService = require("../utils/email");

// Utility function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility function to validate phone
function validatePhone(phone) {
  const phoneRegex = /^(\+254|0)?[17]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

// POST /api/tutors/register - Register new tutor
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      bio,
      subjects,
      grades,
      availability,
      rate,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !phone ||
      !location ||
      !bio ||
      !subjects ||
      !grades ||
      !availability ||
      !rate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid Kenyan phone number",
      });
    }

    if (bio.length < 100) {
      return res.status(400).json({
        success: false,
        message: "Bio must be at least 100 characters long",
      });
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one subject",
      });
    }

    if (!Array.isArray(grades) || grades.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one grade level",
      });
    }

    if (!Array.isArray(availability) || availability.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select your availability",
      });
    }

    const hourlyRate = parseInt(rate);
    if (isNaN(hourlyRate) || hourlyRate < 100 || hourlyRate > 5000) {
      return res.status(400).json({
        success: false,
        message: "Please enter a reasonable hourly rate (KES 100-5000)",
      });
    }

    console.log("👨‍🏫 Registering new tutor:", email);

    // Check if tutor already exists
    const existingTutors = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      [Query.equal("email", email)],
    );

    if (existingTutors.documents.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A tutor account with this email already exists",
      });
    }

    // Create tutor document
    const tutorData = {
      name,
      email,
      phone,
      location,
      bio,
      subjects: JSON.stringify(subjects),
      grades: JSON.stringify(grades),
      availability: JSON.stringify(availability),
      hourlyRate: hourlyRate,
      status: "active",
      rating: 5.0,
      totalSessions: 0,
      completedSessions: 0,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    const newTutor = await appwriteService.databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      ID.unique(),
      tutorData,
    );

    console.log("✅ Tutor registered successfully:", newTutor.$id);

    // Send welcome email
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to ShuleAI - Your Tutor Profile is Live!",
        html: `
          <h2>Welcome to ShuleAI, ${name}!</h2>
          <p>Your tutor profile has been successfully created and is now live on our platform.</p>
          
          <h3>Your Profile Summary:</h3>
          <ul>
            <li><strong>Subjects:</strong> ${subjects.join(", ")}</li>
            <li><strong>Grade Levels:</strong> ${grades.join(", ")}</li>
            <li><strong>Hourly Rate:</strong> KES ${rate}</li>
            <li><strong>Location:</strong> ${location}</li>
          </ul>
          
          <p>Students can now find and request tutoring sessions with you. You'll receive email notifications when new requests come in.</p>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Access your dashboard to view and manage student requests</li>
            <li>Keep your availability updated</li>
            <li>Respond to student requests promptly</li>
          </ol>
          
          <p>Thank you for joining ShuleAI and helping students succeed!</p>
          
          <p>Best regards,<br>ShuleAI Team</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ Welcome email failed:", emailError.message);
    }

    // Send notification to admin
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || "shuleaiadmin@memeyai.com",
        subject: "New Tutor Registration",
        html: `
          <h2>New Tutor Registration</h2>
          <p>A new tutor has registered on the platform:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Subjects:</strong> ${subjects.join(", ")}</li>
            <li><strong>Rate:</strong> KES ${rate}/hour</li>
          </ul>
          <p><strong>Bio:</strong> ${bio}</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ Admin notification failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Tutor registration successful",
      tutor: {
        id: newTutor.$id,
        name: newTutor.name,
        email: newTutor.email,
        subjects: JSON.parse(newTutor.subjects),
        grades: JSON.parse(newTutor.grades),
        hourlyRate: newTutor.hourlyRate,
        status: newTutor.status,
      },
    });
  } catch (error) {
    console.error("❌ Tutor registration error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration. Please try again.",
    });
  }
});

// POST /api/tutors/request - Submit tutor request from student
router.post("/request", async (req, res) => {
  try {
    const {
      studentName,
      parentName,
      email,
      phone,
      grade,
      subjects,
      goals,
      times,
      frequency,
      budget,
    } = req.body;

    // Validation
    if (
      !studentName ||
      !parentName ||
      !email ||
      !phone ||
      !grade ||
      !subjects ||
      !goals ||
      !times ||
      !frequency ||
      !budget
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid Kenyan phone number",
      });
    }

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one subject",
      });
    }

    if (!Array.isArray(times) || times.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select preferred times",
      });
    }

    if (goals.length < 50) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide more detailed learning goals (at least 50 characters)",
      });
    }

    console.log("📚 Processing tutor request for:", studentName);

    // Create tutor request document
    const requestData = {
      studentName,
      parentName,
      email,
      phone,
      grade,
      subjects: JSON.stringify(subjects),
      goals,
      preferredTimes: JSON.stringify(times),
      frequency,
      budget,
      status: "pending",
      submittedAt: new Date().toISOString(),
      matchedTutors: "[]",
      responses: "[]",
    };

    const newRequest = await appwriteService.databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTOR_REQUESTS_COLLECTION_ID,
      ID.unique(),
      requestData,
    );

    console.log("✅ Tutor request created:", newRequest.$id);

    // Find matching tutors
    const allTutors = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      [Query.equal("status", "active"), Query.limit(100)],
    );

    const matchingTutors = allTutors.documents.filter((tutor) => {
      const tutorSubjects = JSON.parse(tutor.subjects || "[]");
      const tutorGrades = JSON.parse(tutor.grades || "[]");

      // Check if tutor teaches any of the requested subjects
      const subjectMatch = subjects.some((subject) =>
        tutorSubjects.includes(subject),
      );

      // Check if tutor teaches the requested grade
      const gradeMatch = tutorGrades.some((tutorGrade) => {
        // Handle grade matching logic
        if (grade.includes("PP") && tutorGrade.includes("PP")) return true;
        if (grade.includes("Grade") && tutorGrade.includes("Grade")) {
          const studentGradeNum = parseInt(grade.replace("Grade ", ""));
          if (tutorGrade.includes("-")) {
            const [min, max] = tutorGrade
              .replace("Grade ", "")
              .split("-")
              .map((n) => parseInt(n));
            return studentGradeNum >= min && studentGradeNum <= max;
          }
          return tutorGrade.includes(studentGradeNum.toString());
        }
        if (grade.includes("Form") && tutorGrade.includes("Form")) return true;
        return false;
      });

      // Check budget compatibility (within 20% range)
      const budgetRange = budget
        .split("-")
        .map((b) =>
          parseInt(
            b
              .replace("KES ", "")
              .replace("+", "")
              .replace("200-", "200")
              .replace("1000+", "1000"),
          ),
        );
      const minBudget = budgetRange[0] || 0;
      const maxBudget = budgetRange[1] || budgetRange[0] * 2;
      const tutorRate = tutor.hourlyRate;
      const budgetMatch =
        tutorRate >= minBudget * 0.8 && tutorRate <= maxBudget * 1.2;

      return subjectMatch && gradeMatch && budgetMatch;
    });

    console.log(`🎯 Found ${matchingTutors.length} matching tutors`);

    // Send notification emails to matching tutors
    for (const tutor of matchingTutors) {
      try {
        await emailService.transporter.sendMail({
          from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
          to: tutor.email,
          subject: "New Student Request - Perfect Match!",
          html: `
            <h2>New Student Request Available</h2>
            <p>Hi ${tutor.name},</p>
            <p>A new student request that matches your profile has been submitted:</p>
            
            <h3>Student Details:</h3>
            <ul>
              <li><strong>Student:</strong> ${studentName} (${grade})</li>
              <li><strong>Parent/Guardian:</strong> ${parentName}</li>
              <li><strong>Contact:</strong> ${email}, ${phone}</li>
              <li><strong>Subjects Needed:</strong> ${subjects.join(", ")}</li>
              <li><strong>Budget:</strong> KES ${budget} per hour</li>
              <li><strong>Frequency:</strong> ${frequency}</li>
              <li><strong>Preferred Times:</strong> ${times.join(", ")}</li>
            </ul>
            
            <h3>Learning Goals:</h3>
            <p>${goals}</p>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Review the student's requirements</li>
              <li>Contact the parent directly if interested: ${email} or ${phone}</li>
              <li>Log into your dashboard to manage this request</li>
            </ol>
            
            <p>This is a great match for your expertise. We recommend reaching out quickly!</p>
            
            <p>Best regards,<br>ShuleAI Team</p>
          `,
        });
      } catch (emailError) {
        console.log(
          `⚠️ Failed to notify tutor ${tutor.email}:`,
          emailError.message,
        );
      }
    }

    // Send confirmation to parent
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Tutor Request Received - We're Finding Perfect Matches!",
        html: `
          <h2>Tutor Request Received Successfully</h2>
          <p>Dear ${parentName},</p>
          <p>Thank you for submitting a tutor request for ${studentName}. We've received your request and are already working on finding the perfect matches!</p>
          
          <h3>Your Request Summary:</h3>
          <ul>
            <li><strong>Student:</strong> ${studentName} (${grade})</li>
            <li><strong>Subjects:</strong> ${subjects.join(", ")}</li>
            <li><strong>Budget:</strong> KES ${budget} per hour</li>
            <li><strong>Frequency:</strong> ${frequency}</li>
            <li><strong>Preferred Times:</strong> ${times.join(", ")}</li>
          </ul>
          
          <p><strong>What happens next?</strong></p>
          <ol>
            <li>Our system has identified ${matchingTutors.length} qualified tutors who match your requirements</li>
            <li>These tutors have been notified and will contact you directly if interested</li>
            <li>You should expect to hear from suitable tutors within 24 hours</li>
            <li>You can interview and select the tutor that best fits your needs</li>
          </ol>
          
          <p>If you don't hear from any tutors within 24 hours, please contact us and we'll personally help you find the right match.</p>
          
          <p>Thank you for choosing ShuleAI for ${studentName}'s educational journey!</p>
          
          <p>Best regards,<br>ShuleAI Team</p>
          <p>Email: support@shuleai.com | Phone: +254 700 000 000</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ Parent confirmation email failed:", emailError.message);
    }

    // Send admin notification
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || "shuleaiadmin@memeyai.com",
        subject: "New Tutor Request Submitted",
        html: `
          <h2>New Tutor Request</h2>
          <p>A new tutor request has been submitted:</p>
          <ul>
            <li><strong>Student:</strong> ${studentName} (${grade})</li>
            <li><strong>Parent:</strong> ${parentName}</li>
            <li><strong>Contact:</strong> ${email}, ${phone}</li>
            <li><strong>Subjects:</strong> ${subjects.join(", ")}</li>
            <li><strong>Budget:</strong> KES ${budget}</li>
          </ul>
          <p><strong>Matching tutors found:</strong> ${matchingTutors.length}</p>
          <p><strong>Goals:</strong> ${goals}</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ Admin notification failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Tutor request submitted successfully",
      request: {
        id: newRequest.$id,
        studentName: newRequest.studentName,
        subjects: JSON.parse(newRequest.subjects),
        matchingTutors: matchingTutors.length,
        status: newRequest.status,
      },
    });
  } catch (error) {
    console.error("❌ Tutor request error:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
});

// GET /api/tutors/dashboard/:email - Get tutor dashboard data
router.get("/dashboard/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    console.log("📊 Getting dashboard data for tutor:", email);

    // Get tutor profile
    const tutors = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      [Query.equal("email", email)],
    );

    if (tutors.documents.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    const tutor = tutors.documents[0];

    // Get all tutor requests
    const allRequests = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTOR_REQUESTS_COLLECTION_ID,
      [Query.limit(100), Query.orderDesc("submittedAt")],
    );

    // Filter requests that match this tutor's subjects
    const tutorSubjects = JSON.parse(tutor.subjects || "[]");
    const tutorGrades = JSON.parse(tutor.grades || "[]");

    const relevantRequests = allRequests.documents
      .filter((request) => {
        const requestSubjects = JSON.parse(request.subjects || "[]");

        // Check if any request subject matches tutor subjects
        return requestSubjects.some((subject) =>
          tutorSubjects.includes(subject),
        );
      })
      .map((request) => ({
        ...request,
        subjects: JSON.parse(request.subjects || "[]"),
        preferredTimes: JSON.parse(request.preferredTimes || "[]"),
        responses: JSON.parse(request.responses || "[]"),
        matchedTutors: JSON.parse(request.matchedTutors || "[]"),
      }));

    // Update last active
    await appwriteService.databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      tutor.$id,
      { lastActive: new Date().toISOString() },
    );

    // Prepare response data
    const dashboardData = {
      tutor: {
        id: tutor.$id,
        name: tutor.name,
        email: tutor.email,
        phone: tutor.phone,
        location: tutor.location,
        bio: tutor.bio,
        subjects: JSON.parse(tutor.subjects || "[]"),
        grades: JSON.parse(tutor.grades || "[]"),
        availability: JSON.parse(tutor.availability || "[]"),
        hourlyRate: tutor.hourlyRate,
        rating: tutor.rating || 5.0,
        totalSessions: tutor.totalSessions || 0,
        completedSessions: tutor.completedSessions || 0,
        status: tutor.status,
        joinedAt: tutor.joinedAt,
      },
      requests: relevantRequests,
      stats: {
        totalRequests: relevantRequests.length,
        pendingRequests: relevantRequests.filter((r) => r.status === "pending")
          .length,
        respondedRequests: relevantRequests.filter(
          (r) => r.status === "responded",
        ).length,
        activeStudents: tutor.totalSessions || 0,
        completedSessions: tutor.completedSessions || 0,
        averageRating: tutor.rating || 5.0,
      },
    };

    res.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("❌ Dashboard data error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching dashboard data.",
    });
  }
});

// PUT /api/tutors/update/:id - Update tutor profile
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updateData.email;
    delete updateData.joinedAt;
    delete updateData.totalSessions;
    delete updateData.completedSessions;

    // Validate arrays
    if (updateData.subjects && Array.isArray(updateData.subjects)) {
      updateData.subjects = JSON.stringify(updateData.subjects);
    }
    if (updateData.grades && Array.isArray(updateData.grades)) {
      updateData.grades = JSON.stringify(updateData.grades);
    }
    if (updateData.availability && Array.isArray(updateData.availability)) {
      updateData.availability = JSON.stringify(updateData.availability);
    }

    // Validate hourly rate
    if (updateData.hourlyRate) {
      const rate = parseInt(updateData.hourlyRate);
      if (isNaN(rate) || rate < 100 || rate > 5000) {
        return res.status(400).json({
          success: false,
          message: "Hourly rate must be between KES 100-5000",
        });
      }
      updateData.hourlyRate = rate;
    }

    const updatedTutor = await appwriteService.databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      id,
      updateData,
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      tutor: updatedTutor,
    });
  } catch (error) {
    console.error("❌ Update tutor error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating profile.",
    });
  }
});

// POST /api/tutors/respond/:requestId - Respond to a tutor request
router.post("/respond/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { tutorEmail, response, contactInfo } = req.body;

    if (!tutorEmail || !response) {
      return res.status(400).json({
        success: false,
        message: "Tutor email and response are required",
      });
    }

    // Get the request
    const request = await appwriteService.databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTOR_REQUESTS_COLLECTION_ID,
      requestId,
    );

    // Get tutor info
    const tutors = await appwriteService.databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTORS_COLLECTION_ID,
      [Query.equal("email", tutorEmail)],
    );

    if (tutors.documents.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    const tutor = tutors.documents[0];

    // Add response to request
    const existingResponses = JSON.parse(request.responses || "[]");
    const newResponse = {
      tutorId: tutor.$id,
      tutorName: tutor.name,
      tutorEmail: tutor.email,
      response,
      contactInfo: contactInfo || tutor.phone,
      respondedAt: new Date().toISOString(),
    };

    existingResponses.push(newResponse);

    // Update request status and responses
    await appwriteService.databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.TUTOR_REQUESTS_COLLECTION_ID,
      requestId,
      {
        responses: JSON.stringify(existingResponses),
        status: "responded",
      },
    );

    // Send email to parent
    try {
      await emailService.transporter.sendMail({
        from: `"ShuleAI" <${process.env.EMAIL_USER}>`,
        to: request.email,
        subject: "Tutor Response Received!",
        html: `
          <h2>Great News! A Tutor is Interested</h2>
          <p>Dear ${request.parentName},</p>
          <p>We have exciting news about your tutor request for ${request.studentName}!</p>
          
          <h3>Tutor Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${tutor.name}</li>
            <li><strong>Subjects:</strong> ${JSON.parse(tutor.subjects).join(", ")}</li>
            <li><strong>Hourly Rate:</strong> KES ${tutor.hourlyRate}</li>
            <li><strong>Location:</strong> ${tutor.location}</li>
            <li><strong>Rating:</strong> ${tutor.rating}/5.0 stars</li>
          </ul>
          
          <h3>Tutor's Message:</h3>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4caf50; margin: 15px 0;">
            "${response}"
          </p>
          
          <h3>Contact Information:</h3>
          <p>You can reach ${tutor.name} directly at:</p>
          <ul>
            <li><strong>Email:</strong> ${tutor.email}</li>
            <li><strong>Phone:</strong> ${contactInfo || tutor.phone}</li>
          </ul>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Contact ${tutor.name} directly to discuss details</li>
            <li>Schedule a brief interview or trial session</li>
            <li>Agree on schedule, payment, and session format</li>
          </ol>
          
          <p>We're here to help if you need any assistance!</p>
          
          <p>Best regards,<br>ShuleAI Team</p>
        `,
      });
    } catch (emailError) {
      console.log("⚠️ Parent notification failed:", emailError.message);
    }

    res.json({
      success: true,
      message: "Response sent successfully",
    });
  } catch (error) {
    console.error("❌ Respond to request error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending response.",
    });
  }
});

module.exports = router;
