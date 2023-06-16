import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import path from 'path';

connectDB();
const app = express();

// parse raw json
app.use(express.json());
// ability to send form data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

// handle deployment
if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    console.log("dirname", __dirname)
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
}

// custom error middleware
app.use(notFound);
app.use(errorHandler);

// gives idea of api request being called.
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}) 

app.listen(process.env.PORT, () => {
    console.log("listening on PORT", process.env.PORT || 9000);
})

