module.exports = {
  TILL_NUMBER: "889900",
  SUPPORT_WHATSAPP: "+254111579473",
  ADMIN_EMAIL: "support@shuleai.com",
  SUPPORT_EMAIL: "support@shuleai.com",

  SUBSCRIPTION_PLANS: {
    weekly: {
      amount: 50,
      days: 7,
      name: "Weekly Access",
    },
    monthly: {
      amount: 150,
      days: 30,
      name: "Monthly Access",
    },
    termly: {
      amount: 400,
      days: 90,
      name: "Termly Access",
    },
  },

  PAYMENT_STATUS: {
    PENDING: "pending",
    VERIFIED: "verified",
    ACTIVE: "active",
    EXPIRED: "expired",
    REJECTED: "rejected",
  },

  COLLECTIONS: {
    USER_PAYMENTS: "user_payments",
    USERS: "users",
    SESSIONS: "sessions",
  },
};
