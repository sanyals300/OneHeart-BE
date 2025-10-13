const socket = require("socket.io");
const crypto = require("crypto");
const Conversation = require("../models/conversation");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`🚪 ${firstName} joined Room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(`📨 ${firstName}: ${text}`);

          // Find or create conversation
          let conversation = await Conversation.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!conversation) {
            conversation = new Conversation({
              participants: [userId, targetUserId],
            });
            await conversation.save();
            console.log("✅ New conversation created");
          }

          // Create NEW message document (don't push to array!)
          const newMessage = new Chat({
            conversationId: conversation._id,
            sender: userId,
            content: text,
          });

          await newMessage.save();
          console.log("✅ Message saved to DB");

          // Broadcast to room
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            senderId: userId,
          });

          console.log(`✉️ Message sent to room: ${roomId}`);
        } catch (err) {
          console.error("❌ Error:", err.message);
          console.error(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
