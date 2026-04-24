//createliked songs
//delete liked song 
//add loked song
//gel liked song

import Liked from "../model/liked.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";

const createLikedSong = asynchandler(async(req,res)=>{
    const user = req.user._id
    if(!user){
        throw new ApiError(400,"user is required");
    }
    const liked = await Liked.create({
        songs : [],
        user
    })
    if(!liked){
        throw new ApiError(404,"not craeted ");
    }
    res.status(200).json(
        new ApiResponse(200,liked,"liked created successfully")
    )
})

const getLikesSongs = asynchandler(async(req,res)=>{

    const likedSongs = await Liked.findById(req.user._id);
    if(!likedSongs){
         throw new ApiError(404, "likedSongs not found");
    }
res.status(200).json(
    new ApiResponse(200,likedSongs,"all the liked songs ")
);
})

const addLikedSongs = asynchandler(async(req,res)=>{
    const {songId} = req.params;
    const {likedId}= req.params;
    if(!songId){
        throw new ApiError(400,"songId is required");
    }
    if(!likedId){
        throw new ApiError(400,"likedId is required");
    }
    const liked = await Liked.findByIdAndUpdate(likedId,
        {
            $push:{
                songs : songId
            }
        }
    )
    if(!liked){
         throw new ApiError(404, "liked not found");
    }
    res.status(200).json(
        new ApiResponse(200,liked,"liked songs added successfully")
    )
})

const deleteLikedSongs = asynchandler(async(req,res)=>{

    const {songId} = req.params;
    const {likesId} = req.params;
    if(!songId){
        throw new ApiError(400,"songId is required")
    }
    if(!likedId){
        throw new ApiError(400,"likedId is required")
    }

    const liked = await Liked.findByIdAndUpdate(likedId,
        {
            $pull :{
                songs : songId
            }
        }
    );
    if(!liked){
         throw new ApiError(404, "liked not found");
    }
  
res.status(200).json(
    new ApiResponse(200,liked,"song is deleted")
)
}
)

export {createLikedSong,deleteLikedSongs,getLikesSongs,addLikedSongs};