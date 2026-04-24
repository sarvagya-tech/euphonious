import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true,
        trim : true,
    },
    artist : {
        type : String,
        required : true,
        trim : true
    },
    audio : {
        type : String,
        required : true
    },
    coverimage : {
        type : String,
        required : true
    },
    genre:{
        type : String
    },
    jamendo_id: {
    type: String,
    unique: true 
},
duration : {
    type: Number,
    default : 0
},
},
{
    timestamps : true
})

const Song = mongoose.model('Song',songSchema);
export default Song;