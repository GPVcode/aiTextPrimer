import jwt from "jsonwebtoken";


// Authorization middleware using JWT token
export const verifyToken = async ( req, res, next ) => {
    try {
        // grab authorization from front end request 
        let token = req.header("Authorization");

        // token doesnt exist
        if(!token) {
            return res.status(403).send("Access Denied")
        }

        // Token should start with Bearer, take values from the right side
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};