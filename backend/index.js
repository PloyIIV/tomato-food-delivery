import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

async function init() {
    //  app config
    const app = express();
    const PORT = 4000;

    // middleware
    app.use(express.json());
    const corsConfig = {
        origin: "*",
        credential: true,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
    app.options("", cors(corsConfig))
    app.use(cors(corsConfig));

    // db connection
    connectDB();

    // api endpoints
    app.use("/api/food", foodRouter)
    app.use("/images", express.static('uploads'))
    app.use('/api/user', userRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/order', orderRouter)

    app.get('/', (req,res) => {
        res.send("API working")
    });

    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`)
    });
}

init();