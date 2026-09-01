import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Authentification required!");
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
    
  } catch (error){
    return res.status(401).send("Invalid or expired token!");
  }
}
export default authMiddleware;
