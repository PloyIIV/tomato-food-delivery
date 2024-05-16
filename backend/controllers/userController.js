import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({
                success: false,
                message: "This email doesn't exists"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }
        const token = createToken(user._id);
        res.json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "ERROR"
        })
    }
}

// Create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body)
    try {
        // Check if email exists
        const emailExists = await userModel.findOne({ email });
        if(emailExists) {
            return res.json({success: false, message: "This email is already used"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Password must be longer than 8 characters"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name: name, email: email, password: hashedPassword });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "ERROR"
        })
    }
}

export {loginUser, registerUser}