import { Router } from "express";
import { getallSongs, searchSongs } from "../controller/song.controller.js";

const songRouter = Router();

songRouter.get('/all-songs', getallSongs);
songRouter.get('/search', searchSongs);

export default songRouter;