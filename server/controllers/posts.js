import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE - logic of creating the post
export const createPost = async ( req, res ) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({ 
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath
        })
        await newPost.save();

        // this grabs all the posts including new post
        const post = await Post.find();
        res.status(201).json(post);
    } catch (err){
        res.status(409).json({ msg: err.message })
    }
}

// READ - represents newsfeed for user
export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err){
        res.status(409).json({ msg: err.message })
    }
}

