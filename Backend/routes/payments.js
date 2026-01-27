const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Submit payment
router.post("/submit", (req, res) => paymentController.submitPayment(req, res));

// Check subscription status
router.get("/status/:email", (req, res) =>
  paymentController.checkSubscription(req, res)
);

// Get payment history
router.get("/history/:email", (req, res) =>
  paymentController.getPaymentHistory(req, res)
);
router.post("/verify", (req, res) => paymentController.verifyPayment(req, res));

// New admin routes
router.get("/admin/stats", (req, res) =>
  paymentController.getPaymentStats(req, res)
);
router.get("/admin", (req, res) => paymentController.getAllPayments(req, res));
router.get("/admin/:paymentId", (req, res) =>
  paymentController.getPaymentById(req, res)
);

module.exports = router;
