import mongoose from "mongoose";

const playlistSchema =  new mongoose.Schema ({
    name :{
        type : String,
        required : true 
    },
    coverImage :{
        type : String,
    
    },
    songs :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Song'
    }],
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }

},{
    timestamps : true
})

const Playlist = mongoose.model('Playlist',playlistSchema);
export default Playlist;