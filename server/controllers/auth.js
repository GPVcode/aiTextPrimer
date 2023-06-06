// encrypt password
import bcrypt from 'bcrypt';
// webtoken used for authorization
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


// REGISTER USER 
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath
        } = req.body;

        // encrypt password with salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath
        });
        const savedUser = await newUser.save();
        // send 201 status and json version of savedUser to front end.
        res.status(201).json(savedUser);
    } catch(err){
        // otherwise, send 500 status error
        res.status(500).json({ error: err.message });
    }   
};

// LOGGING IN
export const login = async (req, res) => {
    try{
        // validate email and password
        const { email, password } = req.body;
        // use Mongoose to find the one user with specified email
        const user = await User.findOne({ email: email});
        if(!user) return res.status(400).json({ msg: "User does not exist." });
        // validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        // user verification with token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // ensure front end does not receive back password 
        delete user.password;
        res.status(200).json({ token, user });
    } catch(err){
        // otherwise, send 500 status error
        res.status(500).json({ error: err.message });
    }   
}