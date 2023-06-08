// Protect routes with auth middleware

// we need to get payload from the token
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// prtect routes (have to be logged in to access these routes)
const protect = asyncHandler(async( req, res, next) => {
    let token;

    token = req.cookies.jwt;

    // check for token
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch(error){
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };