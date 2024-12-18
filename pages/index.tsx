'use client'
//import Link from 'next/link';
import "../app/globals.css";
import Image from "next/image";
import { useEffect } from 'react';
import BlueSail from "../public/assets/BlueSail.png";
import Cap from "../public/assets/Cap.png";
// import telegramSvg from "../public/assets/telegramSvg.svg";
// import TwitterSvg from "../public/assets/TwitterSvg.svg";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Using App Router's useRouter
import { GameNavbar } from '@/app/components/GameNavbar';
import { useAppContext } from '@/context';
import { getUserInfo, registerUser, getUserId, getUsername } from '@/scripts';
import { showFailedMessage, showWariningMessage } from "@/scripts/utils";
import LogStatus from "@/app/components/LogStatus";
import { clearCache } from "@/scripts/ClearCache";

export default function GameLoad() {
    // const audioRef = useRef<HTMLAudioElement | null>(null);
    const { userId, setUserId, username, userInfo, setUsername, setUserInfo, setLevel,setUser_tap_rate_level, setUser_temp_tap_rate_level, setUserTaprateCount, setUserBalance, setUserRank, setUserDailyRewardInfo } = useAppContext();
    const router = useRouter();

    const checkVersion = () => {
        // Extract the `tgWebAppVersion` parameter from the URL
        const urlParams = new URLSearchParams(window.location.hash.replace('#', ''));
        const tgWebAppVersion = urlParams.get('tgWebAppVersion');

        if (tgWebAppVersion) {
            // Split version into major and minor parts
            const [major, minor] = tgWebAppVersion.split('.').map(Number);

            // Compare version: unsupported if version is less than 7.10
            if (major < 7 || (major === 7 && minor < 10)) {
                showWariningMessage(
                    `Your tgWebAppVersion is ${tgWebAppVersion} and unsupported. Update your Telegram app.`
                );
                return false;
            } else {
                getId();
                console.log(`tgWebAppVersion is ${tgWebAppVersion}, which is supported.`);
                return true;
            }
        } else {
            console.warn('tgWebAppVersion not found in URL.');
            return true;
        }
    };
    useEffect(() => {

        checkVersion();

    }, []);

    const load = async () => {
        clearCache("2024-11-08_cleanup_", "true");
        if (userId && username) {
            // Only run if both userId and username are set
            //alert('userId: ' + userId + ' username: ' + username);
            await registerUser(userId, username);
            await getUserInfo(userId, setUsername, setUserInfo, setLevel, setUser_tap_rate_level, setUser_temp_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo, setUserTaprateCount);

        }
    };

    const getId = async () => {
        //alert('getId loading...');
        const muserId = await getUserId();
        const musername = await getUsername();

        setUserId(muserId);
        setUsername(musername);
    };

    // Call `load` when both `userId` and `username` are set
    useEffect(() => {
        if (userId && username) {
            load();
        }
    }, [userId, username]); // Trigger when both userId and username are set

    const [isLoading, setIsLoading] = useState(true); // State for loader


    const changePage = () => {
        if (userId == undefined) {
            showFailedMessage("Your information could not be retreived from telegram");

        } else if (isObjectEmpty(userInfo) || ('message' in userInfo && userInfo.message === 'Failed')) {

            showFailedMessage('Something went wrong.');
            // setTimeout(() => {
            //     //showWariningMessage('Please Check your internet connection.');
            // }, 1000);

            load();
        } else {
            router.push('/gamehome'); // Redirect to gamehome page
        }

    }

    const isObjectEmpty = (objectName: object) => {

        return JSON.stringify(objectName) === "{}";
    };
    useEffect(() => {
        // Set a timeout to simulate loading and redirect
        const timer = setTimeout(() => {
            setIsLoading(false);

        }, 2500); // 3 seconds timeout

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [router]);


    return (

        <div>
            <LogStatus />
            <div className="bg-[#000000] relative h-screen" style={{ maxHeight: '100vh', minHeight: '100vh' }}>
                <GameNavbar />
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full bg-cover">
                        <Image className='w-full' src={BlueSail} alt="BlueSail" />
                    </div>
                    <div className="mt-6 pb-[10px] w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col items justify-center text-center">
                            <h1 className="text-[32px] leading-[32px] font-medium text-white">Pirate hunt</h1>
                            <p className="pt-[20px] font-medium text-white text-[12px] leading-[16px] max-w-[344px]">Ahoy, matey! Welcome to Pirate Hunt, a Telegram clicker mini-game that&apos;s a treasure trove of fun and excitement on the Ton Network</p>
                        </div>
                        {/* <div className="flex flex-col items-center justify-center">
                            <h2 className="pt-16 text-center text-white text-[14px] leading-[24px] font-bold tracking-[0.15%]">Connect with us</h2>

                            {/* <div className="flex items-center gap-[10px]">
                                <div className="flex items-center gap-[2px] text-white text-[8.78px] leading-[13.9px] font-medium">
                                    <Image src={telegramSvg} alt="telegramSvg" />
                                    Telegram:<Link href="/" className="underline">t.me/piratequest</Link>
                                </div>
                                <div className="flex items-center gap-[2px] text-white text-[8.78px] leading-[13.9px] font-medium">
                                    <Image src={TwitterSvg} alt="TwitterSvg" />
                                    Twitter:<Link href="/" className="underline">x.com/piratequest</Link>
                                </div>
                            </div>
                        </div> */}
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
                            (<div className='bg-[#000000A6] m-5 p-2 px-6 rounded-[20.76px] text-[24px] text-white cursor-pointer' style={{ marginTop: "25px" }} onClick={changePage}>Start Mining!</div>)
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
            {/* <audio ref={audioRef} loop hidden>
                <source src="/ES_They%20Sold%20Their%20Souls%20-%20Bonnie%20Grace.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio> */}
        </div>

    );
}
