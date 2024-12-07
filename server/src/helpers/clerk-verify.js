const crypto = require("crypto");
require("dotenv").config();

// Helper function to verify the Clerk webhook signature
function verifyClerkSignature(req) {
  const signature = req.headers["clerk-signature"];
  const rawBody = JSON.stringify(req.body);
  const hash = crypto
    .createHmac("sha256", process.env.CLIENT_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  return hash === signature;
}

module.exports = verifyClerkSignature;
