const User = require("../models/user.model");
const verifyClerkSignature = require("../helpers/clerk-verify");

const handleClerkWebhook = async (req, res) => {
  if (!verifyClerkSignature(req)) {
    return res.status(403).json({ error: "Invalid signature" });
  }

  const event = req.body;

  try {
    switch (event.type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = event.data;
        const newUser = new User({
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`.trim(),
        });
        await newUser.save();
        console.log(`User created: ${newUser.email}`);
        break;
      }
      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = event.data;
        const updatedUser = await User.findOneAndUpdate(
          { clerkId: id },
          {
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`.trim(),
          },
          { new: true }
        );
        if (updatedUser) {
          console.log(`User updated: ${updatedUser.email}`);
        }
        break;
      }
      case "user.deleted": {
        const { id } = event.data;
        const deletedUser = await User.findOneAndDelete({ clerkId: id });
        if (deletedUser) {
          console.log(`User deleted: ${deletedUser.email}`);
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ message: "Webhook handled successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleClerkWebhook };
