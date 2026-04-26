import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import User from "../model/user.model.js"
import Room from "../model/chatRoom.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Song from "../model/song.model.js";
import {v4 as uuidv4} from 'uuid'

/*
- tkae name description from body 
- tke userId and songid from params 
- code from req.body
- find user and song
- 
- 

*/


const createchatRoom = asynchandler(async(req,res)=>{

    const {name,description} = req.body;
    const {songId}  = req.params;

    if(!name){
        throw new ApiError(400,"name is required");
    }
    if(!description){
        throw new ApiError(400,"description is required");
    }
    
    const code = uuidv4().slice(0,6).toUpperCase()
    
    const userId = req.user._id
    const user = await User.findById(userId);
    
    const song = songId ? await Song.findById(songId) : null
     if(!song){
        throw new ApiError(404,"song not found")
     }

     const room = await Room.create({
        name,
        description,
        hostedBy : userId,
        code,
        currentSong: songId || null,
        members : [],
        songQueue : [],
    isroomActive : true
     })
     if(!room){
        throw new ApiError(404,"room not created")
     }
     res.status(200).json(
        new ApiResponse(200,room,"room created successfully")
     )
})

const joiningRoom = asynchandler(async(req,res)=>{

    /*
    roomid and code
    fimd room 
    check room id validatin
    usre id take 
    amd then push in the members

    */
  const {roomId} = req.params;
  const{code} = req.body;
  if(!roomId){
    throw new ApiError(400,"roomId is required")
  }
  if(!code){
    throw new ApiError(400,"code is required")
  }

  const userId = req.user._id;

  const room = await Room.findById(roomId);
  if(!room){
    throw new ApiError(404,"room doesn't exist")
  }
  if(!room.isroomActive){
    throw new ApiError(400,"room no longer availabe ")
  }

  if(code!==room.code){
    throw new ApiError(404, "code is wrong")
  }
  if(room.members.includes(userId)){
    throw new ApiError(400,"you are already in the room")
  }
  const addMember = await Room.findByIdAndUpdate(
    roomId,
    {
        $push:{
            members : userId
        }
    },{
        new : true
    }
  )
  if(!addMember){
    throw new ApiError(404,"memeber not addedd yet")
  }
res.status(200).json(
    new ApiResponse(200,addMember,"member added successfully")
)
}
)
export{createchatRoom};