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
    
    if (songId) {
        const song = await Song.findById(songId);
        if (!song) {
            throw new ApiError(404, "song not found");
        }
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

  const normalizedCode = String(code).trim().toUpperCase();
  if (normalizedCode !== room.code) {
    throw new ApiError(404, "code is wrong");
  }
  const alreadyMember = room.members.some((m) => String(m) === String(userId));// this is to check if the user is already a member of the room
  if (alreadyMember) {
    return res.status(200).json(
      new ApiResponse(200, room, "already in this room")
    );
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
const leaveRoom = asynchandler(async(req,res)=>{

    /*
    roomid,userid
    find room
    pull thr user id from members
    */
   const {roomId} = req.params;
   if(!roomId){
    throw new ApiError(400,"roomId required")
   }
   const userId = req.user._id;
   const room = await Room.findById(roomId);
   if(!room){
    throw new ApiError(404,"user not found")
   }
if(room.hostedBy.toString() === userId.toString()){
    if(room.members.length === 0){
        // host is only member → delete room
        await Room.findByIdAndDelete(roomId)
        return res.status(200).json(
            new ApiResponse(200, null, "room deleted")
        )
    }
    // transfer host to first member
    room.hostedBy = room.members[0]
    await room.save()
}
// then remove host from members using $pull
   const updatedRoom = await Room.findByIdAndUpdate(
    roomId,{
        $pull :{
            members : userId
        }
    },{
        new : true
    })
    if(!updatedRoom){
        throw new ApiError(404,"something went wrong while leaving")
    }
    res.status(200).json(
        new ApiResponse(200,updatedRoom,"user successfully leaved the room")
    )

})
 const deleteRoom = asynchandler(async(req,res)=>{

    const {roomId} = req.params;
    if(!roomId){
        throw new ApiError(400,"roomId is required")

    }
    const userId = req.user._id;

    const room = await Room.findById(roomId);
    if(!room){
        throw new ApiError(404,"room is not found")
    }
    if(room.hostedBy.toString()!== userId.toString()){
        throw new ApiError(403, "only host can delete the room")
    }

    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if(!deleteRoom){

         throw new ApiError(500, "something went wrong while deleting room");

    }

    res.status(200).json(
        new ApiResponse(200,null,"room is deleted successfully")
    )

 })

 const getcurrentRoom = asynchandler(async(req,res)=>{

    const {roomId} = req.params;
    if(!roomId){
        throw new ApiError(400,"roomId is required");
    }

    const roomData = await Room.findById(roomId)
        .populate('members', 'fullname avatar')
        .populate('hostedBy', 'fullname avatar')
        .populate('currentSong', 'title audio coverimage')
        .populate('songQueue', 'title audio coverimage')

    if(!roomData){
        throw new ApiError(404,"room does not exist");
    }

    res.status(200).json(
        new ApiResponse(200, roomData, "room data fetched")
    )
})
export{createchatRoom,joiningRoom,leaveRoom,deleteRoom,getcurrentRoom};