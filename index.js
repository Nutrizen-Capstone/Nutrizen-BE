import express from "express";
import db from "./config/db.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from "cors";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected!');
} catch (error) {
    console.log(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000' }))
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT}`));