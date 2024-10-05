import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";
import { useState } from 'react';
import Image from "next/image";

import "../app/globals.css";
import Cross from "../public/assets/Cross.svg";
import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
import Calendar from "../public/assets/Calendar.svg";
import Instagramm from "../public/assets/Instagramm.svg";
import TelegramApp from "../public/assets/TelegramApp.svg";
import TwitterX from "../public/assets/TwitterX.svg";
import YouTubee from "../public/assets/YouTubee.svg";
import Wallet from "../public/assets/Wallet.svg";
import Cinema from "../public/assets/Cinema.svg";
import GiftBox from "../public/assets/GiftBox.png";
import BackButton from "../public/assets/backButton.svg";
import  DayOneOverlay  from "@/app/components/DayOneOverlay";



export default function TaskList() {
    const router = useRouter(); // Initialize the router

    const handleBackClick = () => {
      router.back(); // Go back to the previous page
    };
    
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleDailyBonusClick = () => {
        setIsOverlayVisible(true);
    };

    const closeOverlay = () => {
        setIsOverlayVisible(false);
    };

    const [isDayOneOverlayVisible, setIsDayOneOverlayVisible] = useState(false);

    const handleDayOneOverlay = () => {
      setIsDayOneOverlayVisible(true);
    };
  
    const closeDayOneOverlay = () => {
      setIsDayOneOverlayVisible(false);
    };
  

    return (

        <>
            <GameNavbar />

            <div className="relative bg-[#000000] h-[100vh + 200px] pt-16 pb-20">
                <div className="flex flex-col items-center justify-center text-center">
                    <Image src={standingdollarcoin} alt="standingdollarcoin" />

                    <h1 className="pt-[20px] text-[24px] leading-[44px] text-white font-bold">Earn More Coins</h1>
                </div>

                <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                    <Image src={BackButton} alt="BackButton" />
                </div>

                <div>
                    <h1 className="pl-[16px] text-[12px] leading-[44px] text-white font-bold">Daily tasks</h1>
                    <div className="flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]" onClick={handleDailyBonusClick}>

                        <div className="flex gap-6">
                            <Image src={Calendar} alt="Calendar" />

                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Daily Bonus</h2>
                              
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">500</p>
                                </span>
                             
                            </div>

                           
                           
                        </div>

                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px]  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>

                    </div>

                     {/* Overlay for Daily Bonus */}
                        {isOverlayVisible && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeOverlay}>
                                <div className="bg-[#000000] border-t-[4px]  border-t-[#FFFFFF40] rounded-lg w-full mt-60 h-[100%] my-[190px]  flex flex-col items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                                    <Image src={GiftBox} alt="GiftBox" className="" />
                                    <h2 className="text-[24px] leading-[32px] font-semibold text-white">Daily Reward</h2>
                                    <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white">One of the ways to increase your coin daily</p>

                                    <div className="pt-[20px] flex items-center justify-center">
                                        <div className="grid grid-cols-4 gap-[15px]">
                                            <div>
                                                <div className="flex flex-col w-[82.1px] border-[0.5px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center"  onClick={handleDayOneOverlay}>
                                                    <h1 className="text-white">Day 1</h1>
                                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                    <p className="text-white">500</p>
                                                </div>

                                                 {/* Triggering the separate overlay component */}
                                                {/* <DayOneOverlay isVisible={isDayOneOverlayVisible} closeOverlay={closeDayOneOverlay} /> */}
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 2</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">1k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 3</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">2.5k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 4</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">5k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 5</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">15k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 6</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">25k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 7</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">50k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 8</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">100k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 9</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">250k</p>
                                            </div>

                                            <div className="flex flex-col border-[0.5px] w-[82.1px] border-[#00A6DE] p-[9.8px] rounded-[9.8px] items-center justify-center">
                                                <h1 className="text-white">Day 10</h1>
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-white">500k</p>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <button onClick={closeOverlay} className="absolute top-2 right-2">
                                        <Image src={Cross} alt="CrossImg" />
                                    </button>
                                </div>
                            </div>
                        )}


                </div>


                <div>
                    <h1 className="pl-[16px] text-[12px] leading-[44px] text-white font-bold">Task list</h1>
                    <div className="flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">

                        <div className="flex gap-6">
                            <Image src={TelegramApp} alt="TelegramApp" />

                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Follow Pirate Hunt Coin on Telegram</h2>
                              
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                             
                            </div>

                           
                           
                        </div>

                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">1/1</h2>
                        </div>

                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={TelegramApp} alt="TelegramApp" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Join Telegram Chat</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px]  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">1/1</h2>
                        </div>
                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={TwitterX} alt="TwitterX" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Follow Pirate Hunt Coin on Twitter</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>


                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={Instagramm} alt="Instagramm" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Follow Pirate Hunt Coin on Instagram</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={TelegramApp} alt="TelegramApp" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Connect Telegram</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={TwitterX} alt="TwitterX" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Connect Twitter</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px]  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={Wallet} alt="Wallet" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Connect Wallet</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">20k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={TelegramApp} alt="TelegramApp" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Join Telegram Channel</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>

                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={YouTubee} alt="YouTubee" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px]  text-white font-semibold max-w-[207px]">Subscribe to Pirate Hunt Coin Youtube Chanel</h2>
                    
                                <span className="flex -mt-[10px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px]  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>


                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={Cinema} alt="Cinema" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">watch Full Ad</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px]  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>


                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={TwitterX} alt="TwitterX" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Like our new post on Twitter</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px]  bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>


                <div className="pt-[16px]">
                    <div className=" flex items-center justify-between p-[16px] border-[0.5px] border-[#FFFFFF73]">
                        <div className="flex gap-6">
                            <Image src={Instagramm} alt="Instagramm" />
                            <div className="flex flex-col gap-y-0">
                                <h2 className="text-[12px] leading-[44px] text-white font-semibold">Like our new post on Instagram</h2>
                    
                                <span className="flex -mt-[25px]">
                                    <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[44px] text-white font-normal">10k</p>
                                </span>
                    
                            </div>
                        </div>
                    
                    
                        <div className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] tracking-[0.4px] bg-[#FFFFFF26] text-white p-[8px] rounded-[8px] w-[37px] h-[32px]">
                            <h2 className="text-center -mt-[4px]">0/1</h2>
                        </div>
                    </div>
                </div>

            </div>

        
        </>
    )
}