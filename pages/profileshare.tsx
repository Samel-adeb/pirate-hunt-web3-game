import  { useState } from 'react';
import { GameNavbar } from "@/app/components/GameNavbar";
import Link from "next/link";
import Image from "next/image";
import "../app/globals.css";
import ProfileSvg from "../public/assets/ProfileSvg.svg";
import Prize from "../public/assets/Prize.svg";
import golddollarcoin from "../public/assets/golddollarcoin.svg";
import baby from "../public/assets/baby.svg";
import ProgressBar from "@/app/components/ProgressBar";
import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
import ShareButton from "../public/assets/ShareButton.svg";
import brownCross from "../public/assets/brownCross.svg";
import Insta from "../public/assets/Insta.svg";
import Telegrame from "../public/assets/Telegrame.svg";
import Tweet from "../public/assets/Tweet.svg";


export default function ProfileShare() {

    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const handleShareClick = () => {
      setOverlayVisible(true);
    };
  
    const closeOverlay = () => {
      setOverlayVisible(false);
    };

    return (
        <>

            <GameNavbar />

            <div className="h-[100vh + 200px]"
                style={{
                    background: 'linear-gradient(180deg, #201101 0%, #472402 100%)',
                }}>
                <div className="px-[16px] flex items-center gap-[50px]">
                    <Link href="/profile">
                        <div className="border border-white/40 rounded-md w-[100px] h-[37.13px] flex items-center justify-start p-2">
                            <Image
                                width={25.24}
                                height={25.24}
                                src={ProfileSvg}
                                alt="Profile Picture"
                                className="mr-1"
                            />
                            <div className="flex flex-col justify-center">
                                <h1 className="text-[8.64px] text-white font-semibold leading-tight">BRYAN</h1>
                                <div className="flex items-center  whitespace-nowrap">
                                <Image
                                    width={10}
                                    height={10}
                                    src={Prize}
                                    alt="Prize Icon"
                                />
                                <p className="text-[6px] font-semibold text-white leading-tight max-w-[36.95px]">
                                    Rank 1<span className="text-white/70"> / 13</span>
                                </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="flex flex-col items-left">
                        <h1 className="text-[12px] leading-[32px] text-[#FFFFFF8C]">Coin</h1>
                        <div className="flex gap-[2px] items-center -mt-[7px]">
                            <Image
                                width={20}
                                height={20}
                                src={golddollarcoin}
                                alt="Gold Dollar Coin"
                                className="flex-shrink-0"
                            />
                            <h1 className="text-[16px]  leading-[32px] font-bold text-white">10000</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-left gap-y-0 whitespace-nowrap">
                        <h1 className="text-[12px] leading-[32px] text-[#FFFFFF8C]">Pirate Token</h1>
                        <div className="flex gap-[2px] items-center -mt-[7px]">
                            <Image
                                width={20}
                                height={20}
                                src={golddollarcoin}
                                alt="Gold Dollar Coin"
                                className="flex-shrink-0"
                            />
                            <h1 className="text-[16px] leading-[32px] font-bold text-white">10000</h1>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="pl-[16px] pt-[15px]" onClick={handleShareClick}>
                        <div className="flex flex-col items-left">
                            <div  className="pl-[10px]">
                                <Image src={ShareButton} alt="ShareButton" />
                            </div>
                            <p className="text-[16px] leading-[32px] font-bold text-white">Share story</p>
                        </div>
                    </div>

                    {isOverlayVisible && (
                        <div
                        className="fixed inset-0 z-50 flex flex-col justify-end "
                        style={{ backdropFilter: 'blur(15px)' }} // Blur effect for the entire page
                        onClick={closeOverlay} // Clicking the overlay outside the bottom content will close it
                        >
                        {/* Bottom Content with Background */}
                        <div
                            className="bg-[#1C1208] relative h-[370px] text-white w-full py-8 px-6 rounded-t-lg"
                            onClick={(e) => e.stopPropagation()} // Prevent overlay close when clicking inside
                        >
                            <h1 className="text-center text-[16px] leading-[16px] font-medium tracking-[0.4px]">Share On</h1>

                            <p className="text-center pt-2 text-[12px] leading-[16px] text-[#FFFFFF8C]  font-medium tracking-[0.4px]">
                                You can share to multiply social medials 
                            </p>

                            <div>
                                <div className="pt-[20px]">
                                    <div className=' px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247]   border-[1px] border-[#FFC247]'>
                                        <div className="flex items-center gap-[8px]">
                                            <Image src={Telegrame} alt="Telegrame" />
                                            <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Telegram story</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-[5px]">
                                    <div className=' px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247]   border-[1px] border-[#FFC247]'>
                                        <div className="flex items-center gap-[8px]">
                                            <Image src={Insta} alt="Insta" />
                                            <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Instagram story</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-[5px]">
                                    <div className=' px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247]   border-[1px] border-[#FFC247]'>
                                        <div className="flex items-center gap-[8px]">
                                            <Image src={Tweet} alt="Tweet" />
                                            <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Twitter story</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/sharecard">
                                <div className="pt-[10px]">
                                    <div className="bg-[#FFC247] p-[10px] rounded-[25px] h-[51px] flex flex-col items-center justify-center">
                                        <button className="text-[16px] leading-[16px] tracking-[0.4px] text-center  text-white font-medium">
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </Link>

                            <button
                            onClick={closeOverlay}
                            className="absolute top-4 right-4 text-white font-bold text-xl"
                            >
                                <Image src={brownCross} alt="brownCross" />
                            </button>
                        </div>
                        </div>
                    )}
                </div>

                <div className="pt-10 flex flex-col items-center justify-center">
                    <div>
                        <Image width={360}  height={237} src={baby} alt="baby" />
                    </div>

                    <div className="pt-[20px]">
                        <div className=" w-[115px] h-[42px] rounded-[50px] p-[10px] flex flex-col items-center justify-center" style={{
                            background: 'linear-gradient(180deg, rgba(255, 194, 71, 0.09) 0%, rgba(153, 116, 43, 0.09) 100%)',
                        }}>
                            <h1 className="text-[16px] leading-[32px] font-bold text-white">Bryan</h1>
                        </div>
                    </div>


                    <div className="pt-4">
                        <div className="flex items-center justify-between mb-2"> 
                            <div className="flex items-center gap-[2px]">
                                <Image
                                    src={standingdollarcoin} // Replace with the actual image path
                                    width={16}
                                    height={16}
                                    alt="standingdollarcoin"
                                />
                                <p className="text-white text-[12px] leading-[16px] tracking-[0.4px] font-semibold">Coin Balance:</p>
                                </div>
                                <p className="text-[12px] leading-[16px] font-normal text-[#FFFFFF73] tracking-[0.4px]">
                                <span className="font-extrabold text-white">12000</span>/15000
                                </p>
                            </div>
                            <div className="w-[280.32px] h-[0.38px] rounded-full">
                                <ProgressBar  progress={60} /> {/* Change the progress value as needed */}
                            </div>

                            
                            
                    </div>

                    <div className="pt-[30px] text-center">
                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-[#FFFFFF73]">Coin increases when you engaged in the game by tapping<br />
                            You can as well level up your Pirate Token by unlocking the<br /> boost from the Treasure Hunt 
                        </p>
                    </div>
                </div>

                <div className="pt-10 pb-10 flex flex-col justify-center gap-y-[3px] items-center just">
                    <div className="w-[361px] h-[48px] py-[16px] px-[8px] rounded-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Days in game</h1>
                        <p className="text-[12px] leading-[16px] text-white">32</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] px-[8px] rounded-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Pirate Token</h1>
                        <p className="text-[12px] leading-[16px] text-white">1.17M</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] px-[8px] rounded-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Invited Friends</h1>
                        <p className="text-[12px] leading-[16px] text-white">12</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] rounded-[8px] px-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Treasures</h1>
                        <p className="text-[12px] leading-[16px] text-white">4</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] rounded-[8px] px-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Telegram user name</h1>
                        <p className="text-[12px] leading-[16px] text-white">Success123</p>
                    </div>
                </div>
            </div>

        </>
    )
}