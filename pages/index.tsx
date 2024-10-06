import Link from 'next/link';
import "../app/globals.css";
import Image from "next/image";
import { useEffect, useRef } from 'react';
import BlueSail from "../public/assets/BlueSail.png";
import Cap from "../public/assets/Cap.png";
import telegramSvg from "../public/assets/telegramSvg.svg";
import TwitterSvg from "../public/assets/TwitterSvg.svg";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Using App Router's useRouter
import { GameNavbar } from '@/app/components/GameNavbar';
import { useAppContext } from '@/context';
import { getUserInfo, regusterUser, getUserId, getUsername } from '@/scripts';

export default function GameLoad() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { userId, setUserid, username, setUsername, setUserInfo, setLevel, setUser_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo } = useAppContext();

    const load = async () => {
        if (userId && username) {
            // Only run if both userId and username are set
            //alert('userId: ' + userId + ' username: ' + username);
            await regusterUser(userId, username);
            await getUserInfo(userId, setUsername, setUserInfo, setLevel, setUser_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo);
        }
    };

    
    const getId = async () => {
        //alert('getId loading...');
        const muserId = await getUserId();
        const musername = await getUsername();

        setUserid(muserId);
        setUsername(musername);
    };

    // Automatically start playing the background music and get userId/username
    useEffect(() => {
        getId();
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Adjust the volume (0.0 to 1.0)
            audioRef.current.play().catch((err) => {
                console.error('Failed to play audio:', err);
            });
        }
    }, []);

    // Call `load` when both `userId` and `username` are set
    useEffect(() => {
        if (userId && username) {
            load();
        }
    }, [userId, username]); // Trigger when both userId and username are set

    const [isLoading, setIsLoading] = useState(true); // State for loader
    const router = useRouter();

    const changePage = () => {
        router.push('/gamehome'); // Redirect to gamehome page
    }


    useEffect(() => {
        // Set a timeout to simulate loading and redirect
        const timer = setTimeout(() => {
            setIsLoading(false);

        }, 5000); // 3 seconds timeout

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [router]);


    return (

        <div>
            <div className="relative h-screen">
                <GameNavbar />
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full bg-cover">
                        <Image className='w-full' src={BlueSail} alt="BlueSail" />
                    </div>
                    <div className="bg-[#000000] h-[400px] pb-[10px] w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col items justify-center text-center">
                            <h1 className="text-[32px] leading-[32px] font-medium text-white">Pirate hunt</h1>
                            <p className="pt-[20px] font-medium text-white text-[12px] leading-[16px] max-w-[344px]">Ahoy, matey! Welcome to Pirate Hunt, a Telegram clicker mini-game that&apos;s a treasure trove of fun and excitement on<br /> the Ton Network</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="pt-16 text-center text-white text-[14px] leading-[24px] font-bold tracking-[0.15%]">Connect with us</h2>

                            <div className="flex items-center gap-[10px]">
                                <div className="flex items-center gap-[2px] text-white text-[8.78px] leading-[13.9px] font-medium">
                                    <Image src={telegramSvg} alt="telegramSvg" />
                                    Telegram:<Link href="/" className="underline">t.me/piratequest</Link>
                                </div>
                                <div className="flex items-center gap-[2px] text-white text-[8.78px] leading-[13.9px] font-medium">
                                    <Image src={TwitterSvg} alt="TwitterSvg" />
                                    Twitter:<Link href="/" className="underline">x.com/piratequest</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Loader overlay */}

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-75 z-50">
                    {/* Loading Image */}
                    <Image width={100} height={100} src={Cap} alt="Cap" />
                    {
                        isLoading ? (
                            <p className="text-white text-[20px] font-semibold mt-4">
                                Loading<span className="dot-anim"></span>
                            </p>
                        ) :
                            (<div className='bg-[#000000A6] m-5 p-2 px-6 rounded-[20.76px] text-[24px] text-white cursor-pointer' onClick={changePage}>Play</div>)
                    }
                    <style jsx>{`
                    .dot-anim {
                        display: inline-flex;
                        margin-left: 8px;
                    }
                    .dot-anim::after {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        margin: 0 3px;
                        background-color: white;
                        border-radius: 50%;
                        animation: dot-blink 1.5s infinite step-start;
                    }
                    .dot-anim::before {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        margin: 0 3px;
                        background-color: white;
                        border-radius: 50%;
                        animation: dot-blink 1.5s infinite 0.5s step-start;
                    }
                    .dot-anim span {
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        margin: 0 3px;
                        background-color: white;
                        border-radius: 50%;
                        animation: dot-blink 1.5s infinite 1s step-start;
                    }
                    @keyframes dot-blink {
                        0%, 50%, 100% {
                        opacity: 0;
                        }
                        25% {
                        opacity: 1;
                        }
                    }
                    `}</style>
                </div>

            </div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} loop hidden>
                <source src="/ES_They%20Sold%20Their%20Souls%20-%20Bonnie%20Grace.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>

    );
}