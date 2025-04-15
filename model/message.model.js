const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: "sent" | "delivered" | "read",
    required: true,
  },
});

const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
