import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { json } from "express";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login

const loginUser = async (req, res) => {
    
    try {
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please provide all required fields" });
        }

        // checking if the user exists

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, message: "The user doesn't exist" });
        }

        // check if the password matches the stored password in the DB

        const passwordMatch = await bcrypt.compare( password, existingUser.password );
        if (passwordMatch) {
            const token = createToken(existingUser._id);
            return res.json({ success: true, message: 'Login Successful', token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// Route for user registration

const registerUser = async (req, res) => {
    
    try {
        
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please provide all required fields" });
        }

        // checking if the user exists

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })
        }

        // Validating email format and password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid Email address" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" })
        }

        // hashing the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = new userModel({
            name,
            email,
            password : hashedPassword
        });

        //save user to database
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, message: "User created successfully", token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// Route for admin Login

const adminLogin = async (req, res) => {
    
}

export { registerUser, loginUser, adminLogin };