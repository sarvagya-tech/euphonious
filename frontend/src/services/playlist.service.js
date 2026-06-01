import api from "./api";

const createplaylistService = async (formData) => {
    try {
        const newPlaylist = await api.post('/playlists/create', formData,
            {

                headers: {
                    "Content-Type": "multipart/form-data"
                }

            })
        return newPlaylist
    } catch (error) {
        console.log("error in creating the playlist", error)

    }
}
const getPlaylist = async () => {
    try {
        const yourPlaylist = await api.get('/playlists/get')
        return yourPlaylist;
    }
    catch (error) {
        console.log("error in getting the playlist ", error);
    }
}
const getPlaylistById = async (playlistId) => {
    try {
        const playlist = await api.get(`/playlists/get/${playlistId}`)
        return playlist;
    } catch (error) {
        console.log("error in getting the playlist by id ", error);
    }
}

const addSongs = async (playlistId, songId) => {
    try {
        const addSong = await api.post(`/playlists/add/${playlistId}/${songId}`)
        return addSong;
    } catch (error) {
        console.log("error in adding the song ", error);

    }

}
const removeSong = async (playlistId, songId) => {
    try {
        const removedSong = await api.patch(`/playlists/remove/${playlistId}/${songId}`)
        return removedSong
    } catch (error) {
        console.log("error in removing the song ", error);

    }
}
const deletePlaylist = async (playlistId) => {
    try {
        const deletedPlaylist = await api.delete(`/playlists/${playlistId}`)
        return deletedPlaylist;
    } catch (error) {
        console.log("error in deleting the playlist ", error);
    }
}
export { createplaylistService, getPlaylist, getPlaylistById, addSongs, removeSong, deletePlaylist }