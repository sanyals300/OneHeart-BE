const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation", // Links to the Conversation schema
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User", // Links to the User schema
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // timestamps adds createdAt and updatedAt

const Chat = mongoose.model("Chat", messageSchema);

module.exports = Chat;
