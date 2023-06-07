import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
// gives idea of api request being called.
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}) 

// CONFIG
dotenv.config()

// Use mongoose to connect server to DB
// Run server once app is connected to DB
mongoose.connect(process.env.MONGO_URI, {
    // fall back to the old parser if they find a bug in the new parser
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })    
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening on PORT", process.env.PORT || 9000);
        })
        
    })
    .catch((error) => {
        console.log("error did not connect")
    })
 dotenv.config()