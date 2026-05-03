import Song from "../model/song.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




const uploadSong = asynchandler(async (req, res) => {

    const { title, artist, genre, duration } = req.body;
    if (!title || !artist || !genre || !duration) {
        throw new ApiError(400, "all field are required");
    }
    const coverlocalPath = req.files?.coverImage[0]?.path;
    if (!coverlocalPath) {
        throw new ApiError(400, "coverimage is required");
    }
    const audiolocalpath = req.files?.audio[0]?.path;
    if (!audiolocalpath) {
        throw new ApiError(400, "audio is required");
    }
    const coverImage = await uploadOnCloudinary(coverlocalPath);
    if (!coverImage) {
        throw new ApiError(400, "coverimage not uploaded")
    }
    const audio = await uploadOnCloudinary(audiolocalpath);
    if (!audio) {
        throw new ApiError(400, "audio not uploaded")
    }

    const song = await Song.create({
        title,
        artist,
        genre,
        audio: audio.url,
        coverimage: coverImage.url,
        duration: duration
    })
    if (!song) {
        throw new ApiError(400, "song not uploaded")
    }
    return res.status(200).json(
        new ApiResponse(200, song, "song uploded successfully")
    )


})


const getallSongs = asynchandler(async (req, res) => {

    const song = await Song.find();
    if (!song) {
        throw new ApiError(404, "song not found");
    }




    return res.status(200).json(
        new ApiResponse(200, song, "all songs fetched successfully ")
    )

})

const searchSongs = asynchandler(async (req, res) => {

    const { title, artist, genre } = req.query;

    const query = {};

    if (title && typeof title === "string") {
        query.title = { $regex: title, $options: "i" };
    }

    if (artist && typeof artist === "string") {
        query.artist = { $regex: artist, $options: "i" };
    }

    if (genre && typeof genre === "string") {
        query.genre = { $regex: genre, $options: "i" };
    }


    const songs = await Song.find(query);

    if (!songs) {
        throw new ApiError(404, "song not found");
    }

    return res.status(200).json(
        new ApiResponse(200, songs, "song fetched")
    )
})

export { getallSongs, searchSongs, uploadSong };