import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'

connectDB();
const app = express();

// parse raw json
app.use(express.json());
// send form data
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

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