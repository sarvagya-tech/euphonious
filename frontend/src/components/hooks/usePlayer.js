import { useEffect, useRef } from "react";
import { Howl } from "howler";
import usePlayerStore from "../../store/playerStore.js";

const usePlayer = () => {
    const { 
        currentTrack, 
        isPlaying, 
        volume, 
        muted,
        setProgress, 
        togglePlayPause 
    } = usePlayerStore();

    const howlRef = useRef(null);

    // Handle Track Changes
    useEffect(() => {
        if (currentTrack?.audio) {
            if (howlRef.current) {
                howlRef.current.stop();
                howlRef.current.unload();
            }

            howlRef.current = new Howl({
                src: [currentTrack.audio],
                html5: true,
                volume: volume,
                mute: muted,
                onplay: () => requestAnimationFrame(updateProgress),
                onend: () => {
                    togglePlayPause();
                },
                onloaderror: (id, err) => console.error("Howler Load Error:", err),
                onplayerror: (id, err) => {
                    console.error("Howler Play Error:", err);
                    howlRef.current.once('unlock', () => howlRef.current.play());
                }
            });

            if (isPlaying) howlRef.current.play();
        }

        return () => {
            if (howlRef.current) {
                howlRef.current.stop();
                howlRef.current.unload();
            }
        };
    }, [currentTrack]);

    // Handle Play/Pause
    useEffect(() => {
        if (!howlRef.current || !howlRef.current.state() === 'loaded') return;
        if (isPlaying) howlRef.current.play();
        else howlRef.current.pause();
    }, [isPlaying]);

    // Handle Volume & Mute
    useEffect(() => {
        if (!howlRef.current) return;
        howlRef.current.volume(volume);
        howlRef.current.mute(muted);
    }, [volume, muted]);

    const updateProgress = () => {
        const howl = howlRef.current;
        if (howl && howl.playing()) {
            const seek = howl.seek();
            const duration = howl.duration();
            if (duration) {
                setProgress((seek / duration) * 100);
            }
            requestAnimationFrame(updateProgress);
        }
    };

    const handleSeek = (percentage) => {
        if (howlRef.current) {
            const duration = howlRef.current.duration();
            howlRef.current.seek(duration * (percentage / 100));
        }
    };

    return { howlRef, handleSeek };
};

export default usePlayer;
