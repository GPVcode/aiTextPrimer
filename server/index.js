import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from "./middleware/auth.js";

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
// Set directory of where we store assets locally.
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//  FILE STORAGE (how file will be saved) (code used from multer github repo)
const storage = multer.diskStorage({
    destination: function ( req, file, cb ){
        cb(null, 'public/assets');
    },
    filename: function ( req, file, cb ) {
        cb(null, file.originalname);
    }
})
 // Use upload variable when this file is needed.
const upload = multer({ storage })
// when route is hit, middleware uploads picture locally into public/assets folder. Register is a controller (logic of our endpoint)
// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// gives idea of api request being called.
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}) 

// console.log(process.env.MONGO_URI)
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
 