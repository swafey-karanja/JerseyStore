import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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


// login with google
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Verify the google token with more detailed error handling
        let ticket;
        try {
            ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
        } catch (verifyError) {
            console.error('Token verification error:', verifyError);
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
                error: verifyError.message
            });
        }

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'No email found in Google profile'
            });
        }

        // Check if user exists in your database
        let user = await userModel.findOne({ 
            $or: [
                { email }, 
                { googleId }  // Optional: store Google ID for additional verification
            ]
        });
        
        if (!user) {
            // Create new user if doesn't exist
            const randomPassword = Math.random().toString(36).slice(-8) + 
                                 Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            user = new userModel({
                name,
                email,
                password: hashedPassword,
                googleId,  // Optional: store Google ID
                isGoogleAuth: true
            });
            
            await user.save();
        }

        // Generate your JWT token
        const authToken = createToken(user._id);
        
        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token: authToken
        });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({
            success: false,
            message: 'Google authentication failed',
            error: error.message
        });
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
    
    try {
        
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign( email+password, process.env.JWT_SECRET );
            res.json({ success: true, message: "Admin logged in successfully", token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" });
        }


    } catch (error) {
        
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

export { registerUser, loginUser, googleLogin, adminLogin };