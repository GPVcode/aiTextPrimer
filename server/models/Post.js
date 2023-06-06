import mongoose from "mongoose";

// Create post schema and pass it into mongoose model for use.
const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        description: String,
        picturePath: String,
        userPicturePath: String,
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;