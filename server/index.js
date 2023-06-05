import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// set directory of where we store assets locally.
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

if(process.env.NODE_ENV === 'production'){
    // Express serves up production assets (ie. main.js, main.css)
    app.use(express.static('client/build'));

    // Express serves up index.html file if route is unknown
    // final resort if no authRoutes or build directory
    const path = require('path');
    app.get("*", (req, res) => { 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// gives idea of api request being called.
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}) 

// console.log(process.env.MONGO_URI)
// use mongoose to connect server to DB
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
 