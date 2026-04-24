import mongoose, { Schema } from "mongoose";

const likedSchema = new mongoose.Schema({
 
    songs :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Song'
    }],
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }


},{    timestamps : true
})
const Liked = mongoose.model('Likes',likedSchema);
export default Liked;