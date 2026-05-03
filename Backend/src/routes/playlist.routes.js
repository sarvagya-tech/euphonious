import { Router } from "express";
import {
    createPlaylist,
    getPlaylist,
    addSongs,
    deleteSong,
    deletePlaylist
} from "../controller/playlist.controller.js";
import { upload } from "../middleware/mullter.middleware.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const playlistRouter = Router();

// All playlist routes require authentication
playlistRouter.use(verifyJwt);

playlistRouter.route("/create").post(
    upload.fields([
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    createPlaylist
);

playlistRouter.route("/get").get(getPlaylist);

playlistRouter.route("/add/:playlistId/:songId").post(addSongs);
playlistRouter.route("/remove/:playlistId/:songId").patch(deleteSong);
playlistRouter.route("/:playlistId").delete(deletePlaylist);

export default playlistRouter;
