import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Đặt thời gian hết hạn cho token
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 ngày
    httpOnly: true, // Không thể truy cập qua JavaScript
    secure: process.env.NODE_ENV !== "development", // Phải là false trong môi trường phát triển nếu không sử dụng HTTPS
    sameSite: "None", // Cần thiết để cho phép cookie qua CORS
  });
};

export default generateTokenAndSetCookie;
