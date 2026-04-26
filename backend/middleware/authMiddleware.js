import jwt from "jsonwebtoken";


 
export const protect = (req, res, next) => {
  try {
    
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized: No token provided" });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = {
      _id: decoded.id,
      id: decoded.id
    };

    next();
  } catch (error) {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.error("Auth Middleware Error:", error.message);
    
    // Check if error is specifically because token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    
    return res.status(401).json({ message: "Invalid or malformed token" });
  }
};