import api from "./api";

const getallSongs = async () => {
    try {
        const allSongs = await api.get('/songs/all-songs');
        return allSongs
    } catch (error) {
        console.log("error in getting the song ", error)
    }
}
const getsearchSong = async (title, artist, genre) => {
    try {
        const searchSong = await api.get('/songs/search', {
            params: {
                title,
                artist,
                genre
            }
        })
        return searchSong
    } catch (error) {
        console.log("error in getting the search song ", error)
    }
}
export { getallSongs, getsearchSong }