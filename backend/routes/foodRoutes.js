import express from "express";
import { addFood, getFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
upload.single("image") ,
foodRouter.post('/add',  addFood);
foodRouter.get('/list', getFood);
foodRouter.post('/remove', removeFood);

export default foodRouter