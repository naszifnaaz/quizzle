const { Webhook } = require("svix");
require("dotenv").config();

function verifyClerkSignature(req) {
  const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    // Parse and verify the incoming request
    const payload = req.rawBody || JSON.stringify(req.body);
    const headers = req.headers;

    // Verify signature
    svix.verify(payload, headers);

    // If the signature is valid, return true
    return true;
  } catch (error) {
    console.error("Invalid Svix signature:", error.message);
    return false; // Signature verification failed
  }
}

module.exports = verifyClerkSignature;
