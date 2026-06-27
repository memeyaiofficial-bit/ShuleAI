// ShuleAI - CBC Educational Platform - Main Application
// Copyright © 2024 MemeyAI Digital Solutions. All Rights Reserved.

// ============================================
// SECURITY & ANTI-CLONING PROTECTION
// ============================================

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable common keyboard shortcuts for developer tools
document.addEventListener("keydown", (e) => {
  // Disable F12 (DevTools)
  if (e.key === "F12" || e.keyCode === 123) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.keyCode === 73)) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.keyCode === 74)) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && (e.key === "U" || e.keyCode === 85)) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+S (Save Page)
  if (e.ctrlKey && (e.key === "S" || e.keyCode === 83)) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+Shift+C (Inspect Element)
  if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.keyCode === 67)) {
    e.preventDefault();
    return false;
  }
});

// Detect DevTools opening and show warning
(function () {
  const devtoolsCheck = /./;
  devtoolsCheck.toString = function () {
    console.warn(
      "⚠️ Developer tools detected! Unauthorized access is prohibited.",
    );
    console.warn(
      "🔒 This platform is protected. Please respect intellectual property rights.",
    );
  };
  console.log("%c", devtoolsCheck);
})();

// Console warning message
console.log(
  "%c⚠️ WARNING - STOP!",
  "color: red; font-size: 30px; font-weight: bold;",
);
console.log(
  "%cThis is a browser feature intended for developers.",
  "font-size: 16px;",
);
console.log(
  "%cIf someone told you to copy-paste something here, it's a scam and may compromise your account.",
  "font-size: 14px;",
);
console.log(
  "%c© 2024 MemeyAI Digital Solutions - ShuleAI Platform",
  "font-size: 12px; color: #2e7d4a; font-weight: bold;",
);

// Disable text selection on sensitive areas
document.addEventListener("DOMContentLoaded", function () {
  const sensitiveElements = document.querySelectorAll(
    ".payment-modal, .user-status-badge",
  );
  sensitiveElements.forEach((el) => {
    el.style.userSelect = "none";
    el.style.webkitUserSelect = "none";
    el.style.mozUserSelect = "none";
    el.style.msUserSelect = "none";
  });
});

// ============================================
// GLOBAL CONFIGURATION & STATE
// ============================================

const API_BASE_URL = "https://shuleaibackend-rpe3.onrender.com/api";
const TILL_NUMBER = "5628512";

const subscriptionPlans = {
  monthly: {
    amount: 500,
    duration: 30,
    name: "Monthly Plan",
  },
  quarterly: {
    amount: 1200,
    duration: 90,
    name: "Quarterly Plan",
  },
  yearly: {
    amount: 4000,
    duration: 365,
    name: "Yearly Plan",
  },
};

window.currentUser = null;
let selectedPlan = "monthly";
let currentGame = "";
let statusPollInterval = null;

// ============================================
// INITIALIZE USER SESSION FROM LOCALSTORAGE
// ============================================

function restoreUserSession() {
  const isSignedIn = localStorage.getItem("shuleai_signed_in");
  const accessType = localStorage.getItem("shuleai_access_type");
  const contact = localStorage.getItem("shuleai_contact");

  if (isSignedIn === "true") {
    if (accessType === "admin") {
      // Restore admin session
      window.currentUser = {
        email: contact,
        daysRemaining: 365,
        accessType: "admin",
        role: "Administrator",
      };
      console.log("✅ Admin session restored from localStorage");
    } else {
      // Restore regular user session
      const userData = localStorage.getItem("shuleai_user_data");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          window.currentUser = {
            email: parsed.email || contact,
            daysRemaining: 30,
            planType: parsed.planType,
          };
          console.log("✅ User session restored from localStorage");
        } catch (e) {
          console.error("Error parsing user data from localStorage:", e);
        }
      }
    }
  }
}

// Call on script load to restore session
restoreUserSession();

// ============================================
// PAGE ROUTING FUNCTIONS
// ============================================
// NOTE: showPage() is now globally defined in index.html HEAD
// This uses the global window.showPage for all page navigation
// which handles both .page and .page-content elements

function updateNavigation() {
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = href.substring(1);
        window.location.hash = page;
        // Use global showPage function defined in index.html HEAD
        if (typeof window.showPage === "function") {
          window.showPage(page);
        }
      });
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 ShuleAI Initialized");

  let page = window.location.hash.substring(1) || "home";
  showPage(page);
  updateNavigation();

  window.addEventListener("hashchange", function () {
    page = window.location.hash.substring(1) || "home";
    showPage(page);
  });

  loadUserFromStorage();
  checkUserStatusImmediate();
  updatePlayButtons();
  setupEventListeners();
});

function loadUserFromStorage() {
  try {
    const savedUser = localStorage.getItem("shuleai_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      console.log("📂 Loaded user from storage:", user.email);
      window.currentUser = user;
      updateUIForSubscribedUser();
      return true;
    }
  } catch (error) {
    console.error("Error loading from storage:", error);
  }
  return false;
}

async function checkUserStatusImmediate() {
  const savedUser = localStorage.getItem("shuleai_user");
  if (!savedUser) return;

  try {
    const user = JSON.parse(savedUser);
    console.log("⚡ Quick status check for:", user.email);

    const response = await fetch(
      `${API_BASE_URL}/payments/status/${encodeURIComponent(user.email)}`,
      { cache: "no-store" },
    );

    if (response.ok) {
      const data = await response.json();
      console.log("📊 Quick status result:", data);

      if (data.success && data.isActive) {
        window.currentUser = data.subscription;
        updateUIForSubscribedUser();
        showUserStatusBadge();
        stopStatusPolling();
        showQuickNotification("✅ Subscription active! Ready to play.");
      } else {
        startAggressivePolling(user.email);
      }
    }
  } catch (error) {
    console.error("Quick status check failed:", error);
    const user = JSON.parse(savedUser);
    startAggressivePolling(user.email);
  }
}

function startAggressivePolling(email) {
  stopStatusPolling();
  console.log("🔍 Starting aggressive polling for:", email);

  let pollCount = 0;
  const maxQuickPolls = 20;
  const maxTotalPolls = 180;

  const pollFunction = async () => {
    pollCount++;

    try {
      const response = await fetch(
        `${API_BASE_URL}/payments/status/${encodeURIComponent(email)}`,
        { cache: "no-store" },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(`📊 Poll #${pollCount}: Status response:`, data);

        if (data.success && data.subscription) {
          console.log("   Subscription Data:", {
            email: data.subscription.email,
            plan: data.subscription.planName,
            daysRemaining: data.subscription.daysRemaining,
            status: data.subscription.status,
            isActive: data.isActive,
          });

          if (data.isActive) {
            console.log("🎉 Subscription ACTIVATED on poll", pollCount);
            window.currentUser = data.subscription;
            updateUIForSubscribedUser();
            showUserStatusBadge();
            stopStatusPolling();

            showVibrantNotification(
              "🎮 Ready to Play!",
              "Your subscription is now active! Click any game to start playing.",
            );
            return;
          }
        }
      }

      if (pollCount >= maxTotalPolls) {
        stopStatusPolling();
        console.log("⏹️ Polling stopped after maximum attempts");
      }
    } catch (error) {
      console.error("Poll error:", error);
    }
  };

  statusPollInterval = setInterval(pollFunction, 3000);

  setTimeout(() => {
    if (statusPollInterval && pollCount < maxTotalPolls) {
      console.log("⏱️ Switching to normal polling interval");
      clearInterval(statusPollInterval);
      statusPollInterval = setInterval(pollFunction, 10000);
    }
  }, 60000);
}

function stopStatusPolling() {
  if (statusPollInterval) {
    clearInterval(statusPollInterval);
    statusPollInterval = null;
    console.log("🛑 Polling stopped");
  }
}

function updatePlayButtons() {
  document.querySelectorAll(".play-button").forEach((button) => {
    const gameCard = button.closest(".game-card");
    const gameTitle = gameCard?.querySelector(".game-title")?.textContent || "";

    const gamePath = getGamePath(gameTitle);
    if (gamePath) {
      button.dataset.gamePath = gamePath;
    }

    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("🎯 Play button clicked:", gameTitle);

      // Check if user is signed in via localStorage (more reliable than window.currentUser)
      const isSignedIn = localStorage.getItem("shuleai_signed_in") === "true";

      if (isSignedIn) {
        const path = this.dataset.gamePath;
        console.log("✅ Access granted:", { isSignedIn, gamePath: path });
        if (path) {
          console.log("🚀 Direct game access:", path);
          window.location.href = path;
        } else {
          window.location.hash = "games";
        }
      } else {
        currentGame = gameTitle;
        console.log("❌ Access denied: User not signed in", {
          isSignedIn,
          currentUser: window.currentUser,
        });
        openPayModal();
      }
    });
  });
}

function getGamePath(gameTitle) {
  const gamePaths = {
    "Hisabati Safari": "games/mathgames/safari_math_game (3).html",
    "Multiplication Maasai":
      "games/mathgames/maasai_multiplication_game (1).html",
    "Geometry Giraffes": "games/mathgames/geometry_giraffes_game (1) (2).html",
    "Math Adventure": "games/mathgames/math_adventure_game (1).html",
    MathQuest: "games/mathgames/mathquest.html",
    "Math Adventure Webgame":
      "games/mathgames/math_adventure_webgame (3) (1).html",
    "English Explorer": "games/languagegames/kids_english_game (1).html",
    "Grammar Safari": "games/languagegames/gramer_safari.html",
    "Pronunciation Palace": "games/languagegames/pronunciation_game.html",
    "PP1 Alphabet Quiz": "games/languagegames/pp1_alphabet_quiz.html",
    "Plant Growth Challenge": "games/sciencegames/plantgrowth_game.html",
    "Science Safari Lab": "games/sciencegames/science_safari_lab.html",
    "Cell Explorer - Biology Adventure":
      "games/sciencegames/cell_explorer_biology _adventure.html",
    "Chemistry Lab": "games/sciencegames/chemistry _lab.html",
    "Ecosystem Builder":
      "games/sciencegames/ecoSystem_builder_biodiversity_challenge.html",
    "Astronomy Adventure": "games/sciencegames/astronomy_adventure.html",
    "Geology Expedition": "games/sciencegames/geology_expedition.html",
    "Quantum Quest":
      "games/sciencegames/quantum _quest_particle_adventure.html",
    "CBC Creative Arts Quiz": "games/cbcgames/cbc_creative_arts_quiz.html",
    "CBC Life Skills Quiz": "games/cbcgames/cbc_lifeskills_quiz.html",
    "CBC Physical & Health Quiz":
      "games/cbcgames/cbc_physical_health_quiz.html",
    "CBC Social Studies Quiz": "games/cbcgames/cbc_social_studies_quiz.html",
    "Kenya Map Master": "games/socialstudiesgames/kenya_map_master.html",
    "Coding Safari": "games/codinggames/coding-safari.html",
    "Ekhaya Meat Platform": "games/cbcgames/ekhaya_meat_platform (1).html",
  };

  return gamePaths[gameTitle] || "";
}

function updateUIForSubscribedUser() {
  console.log("🎨 Updating UI for subscribed user");
  console.log("   Current User Data:", currentUser);

  document.querySelectorAll(".play-button").forEach((button) => {
    button.textContent = "Play Now 🎮";
    button.style.background = "linear-gradient(135deg, #FF6B6B, #4ECDC4)";
    button.style.fontWeight = "bold";

    button.onmouseenter = () => {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
    };
    button.onmouseleave = () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "none";
    };
  });

  showUserStatusBadge();
  closePayModal();
}

// Display user subscription/session status badge
function showUserStatusBadge() {
  // Remove existing badge
  const existing = document.querySelector(".user-status-badge");
  if (existing) existing.remove();

  if (!window.currentUser) {
    console.warn("⚠️ No user data available to display");
    return;
  }

  // Determine subscription status
  const isSubscribed =
    currentUser.isActive !== undefined
      ? currentUser.isActive
      : currentUser.status === "active";
  const daysRemaining = currentUser.daysRemaining || 0;
  const planName = currentUser.planName || currentUser.plan_type || "Standard";
  const fullName = currentUser.fullName || currentUser.email || "User";
  const expiresAt = currentUser.expiresAt
    ? new Date(currentUser.expiresAt).toLocaleDateString()
    : "Unknown";

  console.log("📊 Creating status badge:", {
    email: currentUser.email,
    isSubscribed,
    daysRemaining,
    planName,
    fullName,
    expiresAt,
  });

  const badge = document.createElement("div");
  badge.className = "user-status-badge";
  badge.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: linear-gradient(135deg, #2e7d4a 0%, #4caf50 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    z-index: 9998;
    font-size: 0.9rem;
    min-width: 280px;
    max-width: 350px;
    font-family: Arial, sans-serif;
  `;

  const statusIcon = isSubscribed ? "✅" : "⏳";
  const statusColor = isSubscribed ? "#4caf50" : "#ff9800";

  badge.innerHTML = `
    <div style="display: flex; align-items: start; gap: 10px;">
      <span style="font-size: 1.2rem; margin-top: 2px;">${statusIcon}</span>
      <div style="flex: 1;">
        <div style="font-weight: bold; margin-bottom: 5px;">Subscription Status</div>
        <div style="font-size: 0.85rem; opacity: 0.95;">
          <div>👤 ${fullName}</div>
          <div>📋 ${planName}</div>
          <div>⏰ ${daysRemaining} days remaining</div>
          <div>📅 Expires: ${expiresAt}</div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-weight: bold; color: ${statusColor};">
            ${isSubscribed ? "🎮 Full access active!" : "⌛ Pending verification..."}
          </div>
        </div>
      </div>
      <button onclick="document.querySelector('.user-status-badge').remove();" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; padding: 0; margin: -5px -8px 0 0;">
        ×
      </button>
    </div>
  `;

  document.body.appendChild(badge);
}

async function submitPayment() {
  const paymentData = validateForm();
  if (!paymentData) return;

  console.log("💰 Submitting payment for:", paymentData.email);

  const processingEl = document.getElementById("paymentProcessing");
  const payButton = document.getElementById("payButton");

  processingEl.style.display = "block";
  payButton.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/payments/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    console.log("📦 Payment response:", data);

    if (data.success) {
      const userData = {
        email: paymentData.email,
        phone: paymentData.phone,
        fullName: paymentData.fullName,
        transactionCode: paymentData.transactionCode,
        planType: paymentData.planType,
        paymentId: data.paymentId,
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem("shuleai_user", JSON.stringify(userData));

      window.currentUser = {
        email: paymentData.email,
        daysRemaining: 30,
        planType: paymentData.planType,
      };

      showPaymentSuccess(paymentData, data.paymentId);

      setTimeout(() => {
        startAggressivePolling(paymentData.email);
      }, 1000);

      setTimeout(() => checkUserStatusImmediate(), 2000);
    } else {
      throw new Error(data.message || "Payment failed");
    }
  } catch (error) {
    console.error("❌ Payment error:", error);
    processingEl.style.display = "none";
    payButton.disabled = false;
    showError(error.message);
  }
}

function showQuickNotification(message) {
  showNotification(message, "#4CAF50", "✅");
}

function showVibrantNotification(title, message) {
  const notification = document.createElement("div");
  notification.className = "vibrant-notification";
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
    color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideBounce 0.5s ease;
    max-width: 400px;
    border-left: 6px solid #FFD700;
  `;

  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
      <span style="font-size: 2rem;">🎮</span>
      <h4 style="margin: 0; font-size: 1.2rem;">${title}</h4>
    </div>
    <p style="margin: 0; opacity: 0.9;">${message}</p>
    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
      Click any "Play Now" button to start!
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

function showNotification(message, color = "#4CAF50", icon = "✅") {
  const existing = document.querySelector(".user-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "user-notification";
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${color};
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  notification.innerHTML = `
    <span style="font-size: 1.3rem;">${icon}</span>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function setupEventListeners() {
  window.onclick = (e) => {
    if (e.target.id === "paymentModal") closePayModal();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePayModal();
  });
}

const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  @keyframes slideBounce {
    0% { transform: translateX(100%); opacity: 0; }
    70% { transform: translateX(-10px); opacity: 1; }
    100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .play-button {
    transition: all 0.3s ease !important;
  }
  #userStatus {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);

// === Payment Modal Functions - now opens the real payModalOverlay ===
function openPaymentModal(gameTitle = "") {
  // This function is called from updatePlayButtons() and other places
  // when a non-signed-in user clicks a play button.
  // Delegate to the real openPayModal from index.html.
  if (typeof openPayModal === "function") {
    openPayModal();
  } else {
    // Fallback: manually show the overlay
    var overlay = document.getElementById("payModalOverlay");
    if (overlay) {
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    } else {
      showQuickNotification(
        "⚠️ Please sign in or make payment to access games",
      );
    }
  }
}

function closePaymentModal() {
  // Delegate to the real closePayModal from index.html.
  if (typeof closePayModal === "function") {
    closePayModal();
  } else {
    var overlay = document.getElementById("payModalOverlay");
    if (overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  }
}

function resetPaymentUI() {
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("paymentProcessing").style.display = "none";
  document.getElementById("manualVerification").style.display = "none";

  document.querySelector(".payment-form").style.display = "block";
  document.querySelector(".subscription-plans").style.display = "block";
  document.querySelector(".payment-actions").style.display = "flex";

  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("transactionCode").value = "";
  document.getElementById("termsCheckbox").checked = false;

  document.getElementById("payButton").disabled = false;
}

function selectPlan(planType) {
  selectedPlan = planType;
  const plan = subscriptionPlans[planType];

  document.getElementById("amountDisplay").textContent = `KSh ${plan.amount}`;
  document.getElementById("amountInstruction").textContent =
    `KSh ${plan.amount}`;

  document.querySelectorAll(".plan-card").forEach((card) => {
    card.style.border = "2px solid #ddd";
    card.style.backgroundColor = "#fff";
  });

  const selectedCard = event.currentTarget;
  selectedCard.style.border = "2px solid #4ecdc4";
  selectedCard.style.backgroundColor = "#f0f9f8";
}

function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");

  if (value.startsWith("0")) {
    value = value.substring(0, 10);
  } else if (value.startsWith("254")) {
    value = value.substring(0, 12);
  } else {
    value = "0" + value.substring(0, 9);
  }

  input.value = value;
}

function validateForm() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const transactionCode = document
    .getElementById("transactionCode")
    .value.trim()
    .toUpperCase();
  const termsChecked = document.getElementById("termsCheckbox").checked;

  if (!fullName || !email || !phone || !transactionCode) {
    showError("Please fill in all required fields");
    return null;
  }

  if (!termsChecked) {
    showError("Please agree to the terms and conditions");
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("Please enter a valid email address");
    return null;
  }

  const phoneRegex = /^(0[17]\d{8}|254[17]\d{8})$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    showError("Please enter a valid Kenyan phone number (e.g., 0712 345 678)");
    return null;
  }

  if (transactionCode.length < 8 || transactionCode.length > 10) {
    showError("Please enter a valid M-Pesa transaction code (8-10 characters)");
    return null;
  }

  return {
    fullName,
    email,
    phone: phone.replace(/\s/g, ""),
    transactionCode,
    planType: selectedPlan,
    amount: subscriptionPlans[selectedPlan].amount,
    gameTitle: currentGame,
    tillNumber: TILL_NUMBER,
  };
}

function showError(message) {
  const errorElement = document.getElementById("errorMessage");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showPaymentSuccess(paymentData, paymentId) {
  console.log("🎉 Showing payment success for:", paymentData.email);

  document.querySelector(".payment-form").style.display = "none";
  document.querySelector(".subscription-plans").style.display = "none";
  document.querySelector(".payment-actions").style.display = "none";
  document.getElementById("paymentProcessing").style.display = "none";

  document.getElementById("successMessage").style.display = "block";
  document.getElementById("manualVerification").style.display = "block";

  document.getElementById("paymentReference").textContent = paymentId;
  document.getElementById("paymentEmail").textContent = paymentData.email;

  const userData = {
    email: paymentData.email,
    phone: paymentData.phone,
    fullName: paymentData.fullName,
    planType: paymentData.planType,
    paymentId: paymentId,
    submittedAt: new Date().toISOString(),
  };

  localStorage.setItem("shuleai_user", JSON.stringify(userData));

  setTimeout(() => {
    closePaymentModal();
    showNotification(
      "Payment submitted successfully! We'll notify you when approved.",
    );
  }, 10000);
}

// Worksheet Functions
function downloadWorksheet(worksheetId) {
  if (!window.currentUser || window.currentUser.daysRemaining <= 0) {
    openPaymentModal();
    showQuickNotification("⚠️ Subscribe to download worksheets");
    return;
  }

  console.log(`📥 Downloading worksheet: ${worksheetId}`);
  showQuickNotification(`📥 Generating ${worksheetId} PDF worksheet...`);

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFillColor(46, 125, 74);
    doc.rect(0, 0, 210, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, "bold");
    doc.text("ChezaAI - ShuleAI", 105, 15, { align: "center" });
    doc.setFontSize(14);
    doc.text(`CBC ${worksheetId} Worksheet`, 105, 25, { align: "center" });

    // Reset colors
    doc.setTextColor(0, 0, 0);
    let yPos = 45;

    // Worksheet Details
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("WORKSHEET DETAILS", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text(`Subject: ${worksheetId}`, 20, yPos);
    yPos += 5;
    doc.text("Grade Levels: Grades 1-9 (CBC Aligned)", 20, yPos);
    yPos += 5;
    doc.text("Duration: 45-60 minutes", 20, yPos);
    yPos += 5;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos);
    yPos += 10;

    // Learning Outcomes
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("LEARNING OUTCOMES:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    const outcomes = [
      `Master key concepts in ${worksheetId}`,
      "Apply problem-solving skills effectively",
      "Demonstrate understanding through practice",
      "Connect learning to real-world scenarios",
    ];
    outcomes.forEach((outcome) => {
      doc.text(`• ${outcome}`, 25, yPos);
      yPos += 5;
    });
    yPos += 5;

    // Instructions
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("INSTRUCTIONS FOR STUDENTS:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.text("1. Read each question carefully before answering", 25, yPos);
    yPos += 5;
    doc.text("2. Show all your working where required", 25, yPos);
    yPos += 5;
    doc.text("3. Check your answers before submitting", 25, yPos);
    yPos += 5;
    doc.text("4. Ask your teacher if you need clarification", 25, yPos);
    yPos += 10;

    // Sample Questions Section
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("PRACTICE QUESTIONS:", 20, yPos);
    yPos += 10;

    // Generate subject-specific questions
    const questions = generateWorksheetQuestions(worksheetId);
    questions.forEach((q, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont(undefined, "bold");
      doc.text(`Question ${index + 1}:`, 20, yPos);
      yPos += 6;
      doc.setFont(undefined, "normal");
      const lines = doc.splitTextToSize(q.question, 170);
      lines.forEach((line) => {
        doc.text(line, 20, yPos);
        yPos += 5;
      });
      yPos += 8;
    });

    // New page for answers
    doc.addPage();
    yPos = 20;

    // Answer Key
    doc.setFillColor(46, 125, 74);
    doc.rect(0, 10, 210, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("ANSWER KEY (For Teachers)", 105, 20, { align: "center" });
    doc.setTextColor(0, 0, 0);
    yPos = 35;

    questions.forEach((q, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont(undefined, "bold");
      doc.setFontSize(10);
      doc.text(`${index + 1}. ${q.answer}`, 20, yPos);
      yPos += 6;
      if (q.explanation) {
        doc.setFont(undefined, "italic");
        doc.setFontSize(9);
        const expLines = doc.splitTextToSize(
          `   Explanation: ${q.explanation}`,
          170,
        );
        expLines.forEach((line) => {
          doc.text(line, 20, yPos);
          yPos += 4;
        });
      }
      yPos += 4;
    });

    // CBC Competencies
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 10;
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("CBC COMPETENCIES ADDRESSED:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    const competencies = [
      "Critical thinking and problem solving",
      "Communication and collaboration",
      "Creativity and imagination",
      "Digital literacy",
      "Learning to learn",
    ];
    competencies.forEach((comp) => {
      doc.text(`✓ ${comp}`, 25, yPos);
      yPos += 5;
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `© 2025 ChezaAI - ShuleAI Platform | Page ${i} of ${pageCount}`,
        105,
        290,
        { align: "center" },
      );
    }

    // Save PDF
    doc.save(`CBC_${worksheetId}_Worksheet.pdf`);

    setTimeout(() => {
      showQuickNotification(`✅ ${worksheetId} worksheet downloaded!`);
    }, 500);
  } catch (error) {
    console.error("PDF generation error:", error);
    showQuickNotification("⚠️ Error generating PDF. Please try again.");
  }
}

// Helper function to generate subject-specific questions
function generateWorksheetQuestions(subject) {
  const questionBank = {
    "addition-subtraction": [
      {
        question: "Solve: 245 + 378 = ?",
        answer: "623",
        explanation:
          "Add units: 5+8=13 (carry 1), tens: 4+7+1=12 (carry 1), hundreds: 2+3+1=6",
      },
      {
        question: "Calculate: 856 - 429 = ?",
        answer: "427",
        explanation: "Subtract from right to left, borrowing where needed",
      },
      {
        question:
          "A farmer had 567 mangoes. He sold 289. How many mangoes are left?",
        answer: "278 mangoes",
        explanation: "567 - 289 = 278",
      },
      {
        question: "Find the sum: 1,234 + 2,567 + 789 = ?",
        answer: "4,590",
        explanation: "Add all three numbers together",
      },
      {
        question:
          "Kendi has 345 shillings. Her mother gives her 255 more. How much does she have now?",
        answer: "600 shillings",
        explanation: "345 + 255 = 600",
      },
    ],
    multiplication: [
      {
        question: "Calculate: 25 × 14 = ?",
        answer: "350",
        explanation: "(25 × 10) + (25 × 4) = 250 + 100 = 350",
      },
      {
        question: "A box contains 24 pencils. How many pencils are in 8 boxes?",
        answer: "192 pencils",
        explanation: "24 × 8 = 192",
      },
      {
        question: "Solve: 136 × 7 = ?",
        answer: "952",
        explanation: "Multiply each digit: (100×7) + (30×7) + (6×7)",
      },
      {
        question:
          "If one textbook costs KSh 450, how much do 12 textbooks cost?",
        answer: "KSh 5,400",
        explanation: "450 × 12 = 5,400",
      },
      {
        question: "Find the product: 45 × 23 = ?",
        answer: "1,035",
        explanation: "(45 × 20) + (45 × 3) = 900 + 135",
      },
    ],
    Mathematics: [
      {
        question: "Simplify: 3/4 + 1/2 = ?",
        answer: "5/4 or 1 1/4",
        explanation: "Find common denominator: 3/4 + 2/4 = 5/4",
      },
      {
        question:
          "Calculate the area of a rectangle with length 12cm and width 8cm.",
        answer: "96 cm²",
        explanation: "Area = length × width = 12 × 8 = 96",
      },
      {
        question: "If 5 books cost KSh 1,250, what is the cost of one book?",
        answer: "KSh 250",
        explanation: "1,250 ÷ 5 = 250",
      },
      {
        question: "Solve for x: 3x + 7 = 22",
        answer: "x = 5",
        explanation: "3x = 22 - 7 = 15, so x = 15 ÷ 3 = 5",
      },
      {
        question: "What is 35% of 200?",
        answer: "70",
        explanation: "(35 ÷ 100) × 200 = 70",
      },
    ],
    English: [
      {
        question: "Write the plural form of: child, tooth, mouse, sheep",
        answer: "children, teeth, mice, sheep",
        explanation: "Irregular plurals in English",
      },
      {
        question:
          'Identify the verb in this sentence: "The students study hard every day."',
        answer: "study",
        explanation: "A verb shows an action or state of being",
      },
      {
        question: 'Change to past tense: "I go to school."',
        answer: "I went to school.",
        explanation: '"Go" becomes "went" in past tense',
      },
      {
        question:
          'Write a sentence using the word "beautiful" as an adjective.',
        answer: "Example: The beautiful flower bloomed in the garden.",
        explanation: "Adjectives describe nouns",
      },
      {
        question: 'What is the opposite (antonym) of "difficult"?',
        answer: "easy",
        explanation: "Antonyms are words with opposite meanings",
      },
    ],
    Science: [
      {
        question: "Name three sources of light.",
        answer: "Sun, lamp, candle (or torch, fire, etc.)",
        explanation: "Light sources produce their own light",
      },
      {
        question: "What are the three states of matter?",
        answer: "Solid, Liquid, Gas",
        explanation: "Matter exists in these three main states",
      },
      {
        question: "Label the parts of a plant: root, stem, leaf, flower, fruit",
        answer: "Diagram should show all five parts correctly labeled",
        explanation: "Each part has a specific function",
      },
      {
        question: "Explain why we need water every day.",
        answer:
          "For drinking, cooking, cleaning, and keeping our bodies healthy",
        explanation: "Water is essential for life",
      },
      {
        question: "What happens to ice when it is heated?",
        answer: "It melts and becomes water",
        explanation: "This is a change of state from solid to liquid",
      },
    ],
    Social_Studies: [
      {
        question: "Name the capital city of Kenya.",
        answer: "Nairobi",
        explanation: "Nairobi is Kenya's largest city and capital",
      },
      {
        question: "List three physical features found in Kenya.",
        answer:
          "Mt. Kenya, Great Rift Valley, Lake Victoria (or other valid features)",
        explanation: "Kenya has diverse physical geography",
      },
      {
        question: "What are the three arms of government?",
        answer: "Executive, Legislature, Judiciary",
        explanation: "These three arms ensure separation of powers",
      },
      {
        question: "Name two cash crops grown in Kenya.",
        answer: "Tea and Coffee (or sugarcane, cotton, etc.)",
        explanation: "Cash crops are grown for sale",
      },
      {
        question: "Who was the first President of Kenya?",
        answer: "Jomo Kenyatta",
        explanation: "He led Kenya to independence in 1963",
      },
    ],
  };

  return (
    questionBank[subject] || [
      {
        question: `Practice problem 1 for ${subject}`,
        answer: "Answer 1",
        explanation: "Explanation provided",
      },
      {
        question: `Practice problem 2 for ${subject}`,
        answer: "Answer 2",
        explanation: "Explanation provided",
      },
      {
        question: `Practice problem 3 for ${subject}`,
        answer: "Answer 3",
        explanation: "Explanation provided",
      },
      {
        question: `Practice problem 4 for ${subject}`,
        answer: "Answer 4",
        explanation: "Explanation provided",
      },
      {
        question: `Practice problem 5 for ${subject}`,
        answer: "Answer 5",
        explanation: "Explanation provided",
      },
    ]
  );
}

function printWorksheet(worksheetId) {
  if (!window.currentUser || window.currentUser.daysRemaining <= 0) {
    openPaymentModal();
    showQuickNotification("⚠️ Subscribe to print worksheets");
    return;
  }

  console.log(`🖨️ Printing worksheet: ${worksheetId}`);
  showQuickNotification(`🖨️ Preparing ${worksheetId} for printing...`);

  setTimeout(() => {
    alert(
      `Print dialog would open for "${worksheetId}" worksheet.\n\nIn production, this will:\n- Open the PDF in a new window\n- Trigger the browser's print dialog\n- Allow printer selection and settings`,
    );
  }, 500);
}

// Teachers Hub Functions
function viewLessonPlans(subject) {
  if (!window.currentUser || window.currentUser.daysRemaining <= 0) {
    openPaymentModal();
    showQuickNotification("⚠️ Subscribe to access lesson plans");
    return;
  }

  const subjectNames = {
    mathematics: "Mathematics",
    english: "English Language",
    science: "Science & Technology",
    social: "Social Studies",
  };

  const subjectName = subjectNames[subject] || subject;
  showQuickNotification(`📋 Generating ${subjectName} lesson plans PDF...`);

  try {
    if (typeof window.jspdf === "undefined") {
      throw new Error("PDF library not loaded");
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFillColor(46, 125, 74);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont(undefined, "bold");
    doc.text("CBC Lesson Plans", 105, 18, { align: "center" });
    doc.setFontSize(16);
    doc.text(subjectName, 105, 30, { align: "center" });

    doc.setTextColor(0, 0, 0);
    let yPos = 55;

    // Overview
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("TERM LESSON PLAN OVERVIEW", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text("Subject: " + subjectName, 20, yPos);
    yPos += 6;
    doc.text("Grade Levels: All CBC grades", 20, yPos);
    yPos += 6;
    doc.text("Term: 1, 2, or 3", 20, yPos);
    yPos += 6;
    doc.text("Curriculum: Competency-Based Curriculum (CBC)", 20, yPos);
    yPos += 12;

    // Learning Outcomes
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("LEARNING OUTCOMES:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    const outcomes = getLessonOutcomes(subject);
    outcomes.forEach((outcome) => {
      const lines = doc.splitTextToSize("• " + outcome, 170);
      lines.forEach((line) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 25, yPos);
        yPos += 5;
      });
    });
    yPos += 8;

    // Weekly Breakdown
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("WEEKLY LESSON BREAKDOWN:", 20, yPos);
    yPos += 10;

    const weeklyLessons = getWeeklyLessons(subject);
    weeklyLessons.forEach((week, index) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont(undefined, "bold");
      doc.setFontSize(11);
      doc.text(`Week ${index + 1}: ${week.topic}`, 20, yPos);
      yPos += 6;

      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text("Learning Outcomes:", 25, yPos);
      yPos += 5;
      const outcomeLines = doc.splitTextToSize(week.outcomes, 165);
      outcomeLines.forEach((line) => {
        doc.text("  - " + line, 25, yPos);
        yPos += 4;
      });
      yPos += 2;

      doc.text("Activities:", 25, yPos);
      yPos += 5;
      const activityLines = doc.splitTextToSize(week.activities, 165);
      activityLines.forEach((line) => {
        doc.text("  - " + line, 25, yPos);
        yPos += 4;
      });
      yPos += 2;

      doc.text("Assessment: " + week.assessment, 25, yPos);
      yPos += 8;
    });

    // New page for resources
    doc.addPage();
    yPos = 20;

    // Resources
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("TEACHING RESOURCES & MATERIALS:", 20, yPos);
    yPos += 8;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    const resources = [
      "Textbooks aligned with CBC curriculum",
      "Manipulatives and hands-on materials",
      "Digital resources and educational games",
      "Charts, diagrams, and visual aids",
      "Assessment rubrics and checklists",
      "Worksheets and practice exercises",
    ];

    resources.forEach((resource) => {
      doc.text("• " + resource, 25, yPos);
      yPos += 6;
    });
    yPos += 10;

    // Assessment Strategies
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("ASSESSMENT STRATEGIES:", 20, yPos);
    yPos += 8;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    const assessments = [
      "Formative assessment through observation",
      "Written tests and quizzes",
      "Practical demonstrations",
      "Group projects and presentations",
      "Self and peer assessment",
      "Portfolio assessment",
    ];

    assessments.forEach((assessment) => {
      doc.text("• " + assessment, 25, yPos);
      yPos += 6;
    });
    yPos += 10;

    // CBC Competencies
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("CBC COMPETENCIES DEVELOPED:", 20, yPos);
    yPos += 8;
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);

    const competencies = [
      "Critical thinking and problem solving",
      "Communication and collaboration",
      "Creativity and imagination",
      "Digital literacy",
      "Learning to learn",
      "Citizenship",
    ];

    competencies.forEach((comp) => {
      doc.text("• " + comp, 25, yPos);
      yPos += 6;
    });

    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `© 2025 ChezaAI - ShuleAI Platform | CBC Lesson Plans | Page ${i} of ${pageCount}`,
        105,
        290,
        { align: "center" },
      );
    }

    // Save PDF
    doc.save(`CBC_${subjectName}_Lesson_Plans.pdf`);

    setTimeout(() => {
      showQuickNotification(`✅ ${subjectName} lesson plans downloaded!`);
    }, 800);
  } catch (error) {
    console.error("PDF generation error:", error);
    showQuickNotification("⚠️ Error generating PDF. Please try again.");
  }
}

// Helper function for lesson outcomes
function getLessonOutcomes(subject) {
  const outcomes = {
    mathematics: [
      "Apply mathematical concepts to solve real-world problems",
      "Demonstrate understanding of number operations and relationships",
      "Use mathematical reasoning and logical thinking",
      "Represent mathematical ideas using various models",
      "Communicate mathematical thinking clearly",
    ],
    english: [
      "Read and comprehend various text types with understanding",
      "Write clearly and coherently for different purposes",
      "Speak confidently and listen actively in various contexts",
      "Apply grammar and language conventions correctly",
      "Develop vocabulary and language appreciation",
    ],
    science: [
      "Conduct scientific investigations and experiments",
      "Observe, record and analyze scientific phenomena",
      "Apply scientific knowledge to everyday situations",
      "Develop scientific inquiry and critical thinking skills",
      "Understand the relationship between science and society",
    ],
    social: [
      "Understand Kenyan history, geography and culture",
      "Demonstrate responsible citizenship and civic awareness",
      "Analyze social, economic and political systems",
      "Appreciate cultural diversity and heritage",
      "Apply social studies concepts to current issues",
    ],
  };
  return outcomes[subject] || outcomes.mathematics;
}

// Helper function for weekly lessons
function getWeeklyLessons(subject) {
  const lessons = {
    mathematics: [
      {
        topic: "Number Sense and Place Value",
        outcomes: "Understand place value up to millions",
        activities:
          "Hands-on activities with base-10 blocks, number line exercises",
        assessment: "Written quiz on place value",
      },
      {
        topic: "Addition and Subtraction",
        outcomes: "Add and subtract multi-digit numbers",
        activities: "Word problems, mental math games, group challenges",
        assessment: "Problem-solving tasks",
      },
      {
        topic: "Multiplication Strategies",
        outcomes: "Apply multiplication facts and strategies",
        activities: "Arrays, skip counting, times table practice",
        assessment: "Multiplication test",
      },
      {
        topic: "Division Concepts",
        outcomes: "Understand division as sharing and grouping",
        activities: "Manipulative activities, real-life division problems",
        assessment: "Practical demonstration",
      },
      {
        topic: "Fractions Introduction",
        outcomes: "Identify and represent fractions",
        activities: "Fraction circles, pizza models, drawing exercises",
        assessment: "Fraction identification task",
      },
    ],
    english: [
      {
        topic: "Reading Comprehension Skills",
        outcomes: "Read and understand various texts",
        activities: "Guided reading, comprehension questions, discussions",
        assessment: "Reading comprehension test",
      },
      {
        topic: "Writing Techniques",
        outcomes: "Write coherent paragraphs and essays",
        activities: "Brainstorming, drafting, peer review, editing",
        assessment: "Written composition",
      },
      {
        topic: "Grammar and Punctuation",
        outcomes: "Apply grammar rules correctly",
        activities:
          "Grammar exercises, sentence construction, editing practice",
        assessment: "Grammar quiz",
      },
      {
        topic: "Vocabulary Development",
        outcomes: "Expand vocabulary and word usage",
        activities: "Word games, context clues, dictionary skills",
        assessment: "Vocabulary test",
      },
      {
        topic: "Speaking and Listening",
        outcomes: "Communicate effectively orally",
        activities: "Presentations, debates, role plays, listening exercises",
        assessment: "Oral presentation",
      },
    ],
    science: [
      {
        topic: "Scientific Method",
        outcomes: "Understand and apply scientific inquiry",
        activities: "Simple experiments, observation tasks, hypothesis testing",
        assessment: "Lab report",
      },
      {
        topic: "Living Things and Habitats",
        outcomes: "Classify living things and their environments",
        activities: "Nature walk, classification activities, habitat models",
        assessment: "Classification project",
      },
      {
        topic: "Matter and Materials",
        outcomes: "Identify properties of different materials",
        activities: "Material testing, sorting activities, experiments",
        assessment: "Practical investigation",
      },
      {
        topic: "Energy and Forces",
        outcomes: "Understand basic concepts of energy",
        activities: "Force demonstrations, energy transformations, experiments",
        assessment: "Concept map",
      },
      {
        topic: "Earth and Space",
        outcomes: "Describe Earth systems and celestial bodies",
        activities: "Models, research projects, observations",
        assessment: "Presentation",
      },
    ],
    social: [
      {
        topic: "Kenyan Geography",
        outcomes: "Identify physical features of Kenya",
        activities: "Map work, field trips, research projects",
        assessment: "Map skills test",
      },
      {
        topic: "Historical Events",
        outcomes: "Understand key events in Kenyan history",
        activities: "Timeline creation, storytelling, research",
        assessment: "Historical essay",
      },
      {
        topic
