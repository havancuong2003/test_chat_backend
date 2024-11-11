// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import http from "http";
import { initializeSocket } from "./socket/socket.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình CORS cho Express
app.use(
    cors({
        origin: ["http://localhost:5173","https://test-chat-frontend.vercel.app"], // Domain của frontend
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true, // Cho phép gửi cookies và token
    })
);

app.use(express.json());
app.use(cookieParser());

// Định nghĩa các routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Tạo HTTP server cho Socket.IO và Express cùng hoạt động
const server = http.createServer(app);

// Khởi tạo Socket.IO server
initializeSocket(server);

// Kết nối tới MongoDB và chạy server
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running at port ${PORT}`);
});
