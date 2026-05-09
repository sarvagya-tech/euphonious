import { Howl } from "howler";

import { useRef } from "react";
import usePlayerStore from "../store/playerStore.js";

let howlInstance = null;

const usePlayer = () => {
    const { currentTrack, isPlaying, progress, queue, volume, muted } = usePlayerStore();


    const playSong = (song) => {
        if (howlInstance) {
            howlInstance.stop();
            howlInstance.unload();
        }
        howlInstance = new Howl({
            src: [song.audio],
            html5: true,
            volume: volume,

            onplay: () => {
                requestAnimationFrame(updateProgress);
            },
            onend: () => {
                console.log("song ended");
                togglePlayPause();
            },
            onerror: (error) => {
                console.log("howler error", error);

            }
        })
        setSong(song);
        howlInstance.play();
    }
    const updateProgress = () => {
        if (howlInstance && howlInstance.playing()) {
            const progress = howlInstance.seek();
            setProgress(progress);
            requestAnimationFrame(updateProgress);
        }
    }
    const togglePlay = () => {
        if (!howlInstance) return
        if (isPlaying) {
            howlInstance.pause()
        } else {
            howlInstance.play()
        }
        togglePlayPause()
    }

    const seek = (position) => {
        if (howlInstance) {
            howlInstance.seek(position)
        }
    }

    const changeVolume = (vol) => {
        if (howlInstance) {
            howlInstance.volume(vol)
        }
    }

    return {
        playSong,
        togglePlay,
        seek,
        changeVolume,
        howlInstance
    }
}
export default usePlayer


