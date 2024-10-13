import { useEffect, useRef } from 'react';
import { useAppContext } from '@/context'; // Adjust the path according to your context structure

function Sound() {
    const { isMusicOn} = useAppContext(); // Access userId from context
    const audioRef = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        // Play or pause background music based on isMusicOn
        //alert(isMusicOn);
        if (audioRef.current) {
            if (isMusicOn) {
                audioRef.current.volume = 0.5; // Adjust volume (0.0 to 1.0)
                audioRef.current.play().catch((err) => {
                    console.error('Failed to play audio:', err);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMusicOn]);

    


    return <>
        <audio ref={audioRef} loop hidden>
            <source src="/Wave%20Crashing%20On%20Rocks,%20Swirl,%20Distant,%20Continuous%20Roar.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    </>
}

export default Sound;
