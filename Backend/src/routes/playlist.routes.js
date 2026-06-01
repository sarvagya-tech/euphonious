import { Router } from "express";
import {
    createPlaylist,
    getPlaylist,
    addSongs,
    deleteSong,
    deletePlaylist,
    getPlaylistById
} from "../controller/playlist.controller.js";
import { upload } from "../middleware/mullter.middleware.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const playlistRouter = Router();

// All playlist routes require authentication
playlistRouter.use(verifyJwt);

playlistRouter.post('/create', upload.fields([
    {
        name: "coverImage",
        maxCount: 1,
    }
]), createPlaylist);

playlistRouter.get('/get',verifyJwt,getPlaylist);
playlistRouter.get('/get/:playlistId',verifyJwt,getPlaylistById);

playlistRouter.post('/add/:playlistId/:songId',verifyJwt, addSongs);
playlistRouter.patch('/remove/:playlistId/:songId', verifyJwt, deleteSong);
playlistRouter.delete('/:playlistId', verifyJwt, deletePlaylist);

export default playlistRouter;
