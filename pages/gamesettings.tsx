import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";

import "../app/globals.css";
import Image from "next/image";

import BackButton from "../public/assets/backButton.svg";
import { useEffect } from 'react';
import { useAppContext } from '@/context';




export default function GameSettings() {
    // const router = useRouter();

    // const handleClick = () => {
    //   router.push('/chooseexchange'); 
    // };
    const { isMusicOn, setIsMusicOn } = useAppContext();
    const router = useRouter(); // Initialize the router

    const handleBackClick = () => {
        router.back(); // Go back to the previous page
    };

    useEffect(() => {
        setIsMusicOn(localStorage.getItem('musicOn') !== 'false');
    }, [])
    const handleMusicChange = () => {
        const newMusicState = !isMusicOn;
        setIsMusicOn(newMusicState);
        localStorage.setItem('musicOn', newMusicState.toString());
    }


    return (
        <>

            <GameNavbar />

            <div className="relaive bg-[#000000] h-screen">



                <div className="relative pt-10">
                    <div className="flex items-center justify-center text-center">
                        <h1 className="text-[24px] font-semibold leading-[32px] text-white">Settings</h1>
                    </div>

                    <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                        <Image src={BackButton} alt="BackButton" />
                    </div>



                    <div className="pt-[30px]">


                        <div className="pt-[10px]">
                            <div className=" flex items-center justify-between bg-[#FFFFFF26] max-w-[363px] mx-auto p-[16px] rounded-[16px] ">
                                <div className="flex flex-col items-start gap-y-[10px] justify-start">
                                    <h1 className="text-[16px] leading-[16px] tracking-[0.4px] font-semibold text-white">Music</h1>

                                </div>
                                <div>
                                    <input
                                        type='checkbox'
                                        className='h-[27px] w-[40.19px]'
                                        checked={isMusicOn} // Set based on isMusicOn state
                                        onChange={() => handleMusicChange()}  // Correctly invoke the function here
                                    />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}