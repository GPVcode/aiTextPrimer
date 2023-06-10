import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js';

// @ desc Auth user/set token
// route POST /api/user/auth
// @ access Public ( dont have to be logged in to access route)
// @ note Use asyncHandler relinguishes need for try and catch
const authUser = asyncHandler(async ( req, res ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

 // is user is created, send json to frontend. Look for email and password
    if (user && (await user.matchPassword(password))) {
        generateToken( res, user._id ) // create middleware validating token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

// @ desc Register new user
// route POST /api/user
// @access Public ( dont have to be logged in to access route)
const registerUser = asyncHandler(async ( req, res ) => {
    // get body

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // send back user
    const user = await User.create({
        name,
        email,
        password
    });

    // is user is created, send json to frontend
    if (user) {
        generateToken( res, user._id ) // create middleware validating token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @ desc Logout user
// route POST /api/user/logout
// @ access Public ( dont have to be logged in to access route)
// @ note to log out, delete jwt cookie
const logoutUser = asyncHandler(async ( req, res ) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    }),

    res.status(200).json({ message: 'User logged out' });
});

// @ desc Get user profile
// route POST /api/user/profile
// @ access Private
const getUserProfile = asyncHandler(async ( req, res ) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).json(user);
});


// @ desc Update user profile
// route POST /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async ( req, res ) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email, 
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};