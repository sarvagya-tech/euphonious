import { Router } from "express";
import { getallSongs, searchSongs, uploadSong } from "../controller/song.controller.js";
import { upload } from "../middleware/mullter.middleware.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const songRouter = Router();

songRouter.route("/upload-song").post(verifyJwt, upload.fields([{
    name: "coverImage",
    maxCount: 1
}, {
    name: "audio",
    maxCount: 1
}]), uploadSong);

songRouter.get('/all-songs', getallSongs);
songRouter.get('/search', searchSongs);

export default songRouter;