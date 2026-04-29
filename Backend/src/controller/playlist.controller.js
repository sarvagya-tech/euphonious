//create a playlist
//get playlist
//add songs
//remove songs
//delete songs 

import Playlist from "../model/playlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { UploadOnCloudinary } from "../utils/cloudinary";

const createPlaylist = asynchandler(async(req,res)=>{

    const {name} = req.body;
    if(!name){
        throw new ApiError(400,"playlist name is required")
    }
    const userId = req.user._id;

    
    
    const  coverlocalPath = req.files?.coverImage?.[0]?.path;
    
    if(!coverlocalPath){
            throw new ApiError(400,"cover file required");
    }
    
    const coverImage = await uploadOnCloudinary(coverlocalPath);
    
    if(!coverImage){
            throw new ApiError(400,"cover is required");
    }

    const playlist = await Playlist.create({
        name,
        coverImage : coverImage.url,
        songs :[],
        user : userId

    })
    res.status(200).json(new ApiResponse(200,playlist,"playlist created succesfully"));
    
    
})

const getPlaylist = asynchandler(async(req,res)=>{

    const playlist = await Playlist.find({
        user : req.user._id
    })
    if(!playlist){
        throw new ApiError()
    }

    res.status(200).json(
        new ApiResponse(200,playlist,"getting all playlist")
    )

})


const addSongs = asynchandler(async(req,res)=>{
//take song id and playlist is from params
//find the playlist by id 
//then push the song in the song []inside the playlist 
 
const{songId} = req.params;
const{playlistId} = req.params;
if(!songId){
    throw new ApiError(400,"songId is required");
}
if(!playlistId){
    throw new ApiError(400,"playlistId is required");
}
const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
        $push:{
            songs : songId
        }
    },{
        new : true
    }
)
if(!playlist){
    throw new ApiError(404, "playlist not found");
}

res.status(200).json(
    new ApiResponse(200,playlist,"song added")
);
})


const deleteSong = asynchandler(async(req,res)=>{
    const {songId} = req.params;
    const {playlistId} = req.params;
    if(!songId){
        throw new ApiError(400,"songId is required");
    }
    if(!playlistId){
        throw new ApiError(400,"playlistId is required");
    }
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull :{
                songs : songId
            }
        },{
        new : true
    }

    )
    if(!playlist){
        throw new ApiError(404, "playlist not found")
    }

    res.status(200).json(
        new ApiResponse(200,playlist,"song is deleted")
    )
})

const deletePlaylist = asynchandler(async(req,res)=>{
const {playlistId} = req.params;
if(!playlistId){
    throw new ApiError(400,"playlistId is required");

}

const playlist = await Playlist.findById(playlistId);
if(!playlist){
    throw new ApiError(404, "playlist not found");
}

if(playlist.user.toString()!== req.user._id.toString())
{
    throw new ApiError(403, "you are not authorized to delete this playlist");
}
await Playlist.findByIdAndDelete(playlistId);

res.status(200).json(
    new ApiResponse(200,null,"deleted successfully")
)
})


export {createPlaylist,getPlaylist,addSongs,deleteSong,deletePlaylist};



// only of commit just 