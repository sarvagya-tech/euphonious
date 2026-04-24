import { ApiResponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import jamendo from "../utils/jamendo.js";

const getallSongs = asynchandler(async(req,res)=>{

  

     console.log("client id:", process.env.JAMENDO_CLIENT_ID);

    const {data} = await jamendo.get('/tracks')

       console.log("full data:", data)
    console.log("results:", data.results)

return res.status(200).json(
    new ApiResponse(200, data.results, "songs fetched")
)

})

const searchSongs = asynchandler(async(req,res)=>{

    const{title,artist,genre} = req.query;

     const params = {}
        if(title) params.search = title
        if(artist) params.artist_name = artist
        if(genre) params.tags = genre

    const {data} = await jamendo.get('/tracks',{
         params
    })

    return res.status(200).json(
        new ApiResponse(200,data.results,"songfetched")
    )

})
export{getallSongs,searchSongs};