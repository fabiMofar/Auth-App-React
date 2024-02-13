import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config()


mongoose.connect(process.env.MONGODB_ADDRESS)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });


const app = express()

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(3000, () => {
    console.log('server on 3000')
})
