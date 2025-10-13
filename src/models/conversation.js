const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // This links to your existing User schema
      },
    ],
  },
  { timestamps: true }
); // timestamps adds createdAt and updatedAt automatically

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
