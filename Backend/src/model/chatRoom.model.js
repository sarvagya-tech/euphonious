import mongoose, { Types } from "mongoose";

const chatroomSchema = mongoose.Schema({
    name:{
          type : String,
          required : true
    },
    description:{
         type : String,
          required : true

    },
    hostedBy:{
        type: mongoose.Schema.Types.ObjectId,       
         ref : "User"
    },
    currentSong :{
        type: mongoose.Schema.Types.ObjectId,       
         ref : "Song"
    },
    songQueue :[{
         type: mongoose.Schema.Types.ObjectId,       
         ref : "Song"
    }],
    code :{
        type : String,
        required : true
    },
    members:[{
            type: mongoose.Schema.Types.ObjectId,       
            ref : "User"
    }],
    isroomActive:{
        type : Boolean,
        default : false
    },
},{
    timestamps : true
})

const Room = mongoose.model("Room",chatroomSchema);
export default Room;