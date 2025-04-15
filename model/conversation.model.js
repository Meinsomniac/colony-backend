const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema({
  participants: {
    type: [String],
    required: true,
  },
  lastMessage: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Conversations = mongoose.model("conversations", ConversationSchema);

module.exports = Conversations;
