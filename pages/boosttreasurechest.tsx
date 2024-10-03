import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import { useState } from 'react';
import "../app/globals.css";

import MoneyBagChest from "../public/assets/MoneyBagChest.png";

import Boost1 from "../public/assets/Boost1.png";
import Boost1Svg from "../public/assets/BoostSvg.svg";
import Boost2 from "../public/assets/Boost2.png";
import Boost3 from "../public/assets/Boost3.png";
import Boost4 from "../public/assets/Boost4.png";
import Boost5 from "../public/assets/Boost5.png";
import Boost6 from "../public/assets/Boost6.png";
import BackButton from "../public/assets/backButton.svg";
import Unlocked from "../public/assets/unlocked.svg";
import Link from "next/link";





export default function BoostTreasureChest() {
    const router = useRouter(); // Initialize the router

    const handleBackClick = () => {
      router.back(); // Go back to the previous page
    };

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    // Toggle the overlay visibility
    const handleClick = () => {
      setIsOverlayVisible(true);
    };
  
 

    const [isPaymentOverlayVisible, setIsPaymentOverlayVisible] = useState(false);

    // Show the second overlay when "Pay Now" is clicked
    const handlePayNowClick = () => {
      setIsPaymentOverlayVisible(true);
    };

    return(
        <>
            <GameNavbar />

            <div className="relative bg-[#000000] h-[100vh + 100px]">
                <div className="flex flex-col items-center justify-center text-center">
                    <Image src={MoneyBagChest} alt="MoneyBagChest" />

                    <h1 className="font-semibold text-white text-[24px] leading-[32px]">Boosts Treasure Chests</h1>
                    <p className="pt-[10px] text-[12px] leading-[16px] tracking-[0.4px] max-w-[352px] text-[#FFFFFFA6] font-normal">Without the treasure hunt, winning gets tougher! Buy now to discover treasures and keep your edge in the game!</p>
                </div>

                <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                    <Image src={BackButton} alt="BackButton" />
                </div>

                <div className="pt-10 pb-10">
                    <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]" onClick={handleClick}>
                        <div>
                            <Image src={Boost1} alt="Boost1" />
                        </div>

                            
                            
                        <div className="flex flex-col items-right gap-y-[10px]">
                            <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">10,000-50,000</h2>
                            <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$1</p>
                        </div>


                         {/* Overlay */}
                        {isOverlayVisible && (
                            <div
                            className="fixed inset-0 bg-[#000000] bg-opacity-80 flex flex-col items-center justify-center z-50"
                            >
                                <div className="pt-20 flex flex-col items-center justify-center text-center">
                                    <h1 className="text-[20px] leading-[26.67px] font-semibold tracking-[0.67px] text-white">Unlock to boost your Pirate Token</h1>

                                    <p className="text-[12px] leading-[16px] font-normal text-white">Unlock to boost your Pirate Token</p>
                                </div>
                                {/* Enlarged image */}
                                <div className="pt-10">
                                    <div className="relative">
                                        <Image src={Boost1Svg} alt="Boost1Svg" width={318.23} height={323} />
                                        
                                        {/* Buttons */}
                                        <div>
                                            <div className="flex justify-center gap-4 mt-4">
                                                <button className="bg-[#FFC247] text-[12px] leading-[16px] text-white tracking-[0.4px] w-[160px] h-[48px] rounded-[8px] font-semibold"  onClick={handlePayNowClick}>
                                                    Pay Now
                                                </button>
                                                <button className="border-[1px] border-[#FFC247] text-[12px] leading-[16px] text-white tracking-[0.4px] rounded-[8px] w-[150px] h-[48px]font-semibold ">
                                                    Confirm payment
                                                </button>
                                            </div>

                                            {isPaymentOverlayVisible && (
                                                <div className="fixed inset-0 bg-[#000000] bg-opacity-80 flex flex-col items-center justify-center z-50">

                                                    
                                                    <div className="pt-[30px]">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <Image width={98.2} height={101} src={Unlocked} alt="Unlocked" />

                                                            <p className="text-white">Treasure Unlocked</p>
                                                        </div>
                                                        <div className="relative">
                                                            {/* Enlarged Boost1 Image (without Locked) */}
                                                            <Image src={Boost1Svg} alt="Boost1Svg" width={318.23} height={323} />
                                                            {/* Button for Claiming Token */}
                                                            <Link href="/gamehome">
                                                                <div className="flex justify-center mt-4">
                                                                    <button className="w-[318px] h-[48px] rounded-[8px] text-[12px] leading-[16px] text-white tracking-[0.4px]  font-semibold bg-[#FFC247]">
                                                                        Claim Token
                                                                    </button>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]">
                            <div>
                                <Image src={Boost2} alt="Boost2" />
                            </div>

                               
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">50,000-500,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$2</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]">
                            <div>
                                <Image src={Boost3} alt="Boost3" />
                            </div>

                               
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">1,000,000-10,000,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$5</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]">
                            <div>
                                <Image src={Boost4} alt="Boost4" />
                            </div>

                              
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">10,000-100,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$2</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]">
                            <div>
                                <Image src={Boost5} alt="Boost5" />
                            </div>

                               
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">50,000-500,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$5</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]">
                            <div>
                                <Image src={Boost6} alt="Boost6" />
                            </div>

                               
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">100,000-1,000,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}