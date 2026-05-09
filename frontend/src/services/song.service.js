import api from "./api";

const getallSongs = async () => {
    try {
        const response = await api.get('/songs/all-songs');
        return response.data;
    } catch (error) {
        console.log("error in getting the song ", error)
    }
}
const getsearchSong = async (title, artist, genre) => {
    try {
        const response = await api.get('/songs/search', {
            params: {
                title,
                artist,
                genre
            }
        });
        return response.data;
    } catch (error) {
        console.log("error in getting the search song ", error)
    }
}
const uploadSong = async (formData) => {
    try {
        const response = await api.post('/songs/upload-song', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.log("error in uploading the song", error)
    }
}
export { getallSongs, getsearchSong, uploadSong }