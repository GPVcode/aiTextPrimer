import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @ desc Auth user/set token
// route POST /api/user/auth
// @ access Public ( dont have to be logged in to access route)
const authUser = asyncHandler(async ( req, res ) => {
    res.status(200).json({ message: 'Auth User' });
});

// @ desc Register new user
// route POST /api/user
// @access Public ( dont have to be logged in to access route)
const registerUser = asyncHandler(async ( req, res ) => {
    // get body
    console.log(req.body)
    res.status(200).json({ message: 'Register User' });
});

// @ desc Logout user
// route POST /api/user/logout
// @access Public ( dont have to be logged in to access route)
const logoutUser = asyncHandler(async ( req, res ) => {
    res.status(200).json({ message: 'Logout User' });
});

// @ desc Get user profile
// route POST /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async ( req, res ) => {
    res.status(200).json({ message: 'User Profile' });
});

// @ desc Update user profile
// route POST /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async ( req, res ) => {
    res.status(200).json({ message: 'Update User Profile' });
});

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};