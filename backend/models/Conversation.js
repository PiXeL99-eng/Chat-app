const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    //members: [{username: 'Sayan K', email: 'sayan@gmail.com'}, ...]
    members: Array,
    // messages: [{ text: String, sender: String, time: String }],
    messages: Array,

  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);