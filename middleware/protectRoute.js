import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // Lấy userId từ body của request
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserId is required in the body" });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Lưu thông tin người dùng vào req.user để sử dụng ở các middleware hoặc route sau
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
