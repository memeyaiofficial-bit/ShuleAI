const fs = require("fs");
const c = fs.readFileSync("index.html", "utf8");

// Find payment modal sections
const searches = [
  "pay-modal-overlay",
  "openPayModal",
  "closePayModal",
  "submitPayment",
  "verifyAccess",
  "accessCode",
  "SHULEAI2024",
  "mpesa",
];

for (const s of searches) {
  let idx = c.indexOf(s);
  let count = 0;
  while (idx !== -1 && count < 2) {
    console.log(`\n--- ${s} at ${idx} ---`);
    console.log(c.substring(Math.max(0, idx - 40), idx + 200));
    idx = c.indexOf(s, idx + 1);
    count++;
  }
}

// Print full payment modal HTML and JS sections
let pmSection = c.indexOf("PAYMENT MODAL");
if (pmSection !== -1) {
  console.log("\n\n=== FULL PAYMENT SECTION STARTING AT", pmSection, "===");
  let end = c.indexOf("<script src=", pmSection);
  if (end === -1) end = c.indexOf("</body>", pmSection);
  if (end === -1) end = pmSection + 15000;
  let chunk = c.substring(pmSection, Math.min(end, pmSection + 12000));
  console.log(chunk);
}
