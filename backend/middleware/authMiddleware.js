import jwt from "jsonwebtoken";


 
export const protect = (req, res, next) => {
  try {
    // Accept token from cookie or Authorization header (Bearer)
    let token = req.cookies?.token || null;
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (!token && authHeader) {
      // header may be "Bearer <token>"
      token = authHeader.split(" ").pop();
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized: No token provided" });
    }

    // strip possible surrounding quotes
    if (typeof token === "string" && token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
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