import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    room:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Room"
    },
    sender:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    message:{  
        type : String,
        required : true,
        trim : true
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// ✅ This one line auto deletes after 30 min!
messageSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 1800 }

)

const Message = mongoose.model("Message",messageSchema);
export default Message;