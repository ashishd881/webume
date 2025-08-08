// middleware/verifyClerkUser.js
import { verifyToken } from "@clerk/clerk-sdk-node"

const requiredAuth = async (req, res, next) => {
   try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: "No valid authorization header"
            });
        }

        const token = authHeader.substring(7);
        
        const decoded = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });
        const userId = decoded.sub;
        
        req.userId = userId;
        console.log("Authentication successful for user:", userId);
        
        next();
    } catch (error) {
        console.error("Clerk auth error:", error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}

export default requiredAuth