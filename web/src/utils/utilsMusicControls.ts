import { useRef, useState } from 'react';

const useMusicControls = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);

    const handleLoadedTotalTime = () => setDuration(audioRef.current?.duration || 0);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (value: number) => {
        if (audioRef.current) {
            audioRef.current.volume = value;
            setVolume(value);
        }
    };
    const handleSeek = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };

    const FormatTime = (time: number) => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 1 ? + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    return {
        audioRef,
        currentTime,
        duration,
        isPlaying,
        togglePlayPause,
        handleTimeUpdate,
        handleLoadedTotalTime,
        handleSeek,
        FormatTime,
        volume,
        handleVolumeChange
    };
};

export default useMusicControls;

