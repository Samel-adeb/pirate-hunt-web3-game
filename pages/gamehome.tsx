import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import Link from 'next/link';
import "../app/globals.css";
import  ProgressBar  from '@/app/components/ProgressBar';
import piratehomeBg from "../public/assets/piratehomeBg.png";
import Island from "../public/assets/Island.svg";
import boatHome from "../public/assets/boatHome.svg";
import Users from "../public/assets/Users.png";
import TaskForHunt from "../public/assets/Task for hunt.svg";
import TapCoin from "../public/assets/TapCoin.svg";
import ProfileSvg from "../public/assets/ProfileSvg.svg";
import Prize from "../public/assets/Prize.svg";
import golddollarcoin from "../public/assets/golddollarcoin.svg";
import XAS from "../public/assets/XAS.svg";
import Info from "../public/assets/Info.svg";
import settings from "../public/assets/settings.svg";
import lightning from "../public/assets/lightning.svg";
import treasureChest from "../public/assets/treasure chest.svg";
import Cross from "../public/assets/Cross.svg";
import GiftBox from "../public/assets/gift box.png";

import { useState } from "react";

export default function GameHome() {

    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const handleBoostClick = () => {
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOverlayVisible(false);
    };


    return (
        <>
            <div className="h-screen">
                <GameNavbar />
                <div className="relative overflow-hidden">
                    <div className=" relative w-full bg-cover bg-center overflow-hidden h-[800px]">
                        <div className="absolute px-5 py-[6px] bg-[#854C348C] w-full h-[51px]">
                            <div className="flex items-center gap-[20px]">
                                <Link href="/profile">
                                    <div className="border border-white/40 rounded-md w-[100px] h-[37.13px] flex items-center justify-start p-1">
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

                                <div className="flex items-center max-w-[116px] border-[1px] px-[16px] rounded-[8px]  border-[#00A6DE7A]">
                                    <Image
                                        width={20}
                                        height={20}
                                        src={golddollarcoin}
                                        alt="Gold Dollar Coin"
                                        className="flex-shrink-0"
                                    />
                                    <h1 className="text-[16px] leading-[32px] font-bold text-white">10000</h1>
                                </div>


                                <div className="bg-[#1A314E] rounded-[25.71px] px-[6px] py-[4px] flex items-center">
                              
                                    <div className="mr-[5px]">
                                        <Image src={XAS} alt="XAS Icon" className="flex-shrink-0" />
                                    </div>

                             
                                    <div className="border-r-[1px] border-r-[#FFFFFF8C] h-[16px]"></div>

                               
                                    <div className="flex flex-col items-center justify-center px-[5px]">
                                        <p className="text-[8px] leading-[12px] font-medium text-[#FFFFFFBF] text-center">Pirate Token</p>
                                        <div className="flex items-center">
                                            <Image width={12.34} height={12.34} src={golddollarcoin} alt="Gold Dollar Coin" />
                                            <h1 className="text-[12.34px] font-bold leading-[16.46px] text-white">+1.17M</h1>
                                            
                                            <Image  width={12.34} height={12.34} src={Info} alt="Info Icon" />
                                                
                                        </div>
                                    </div>

                               
                                    <div className="border-r-[1px] pl-[17px]  border-r-[#FFFFFF8C] h-[16px]"></div>

                            
                                    <div className="pl-[5px]">
                                        <Link href="/gamesettings"> 
                                            <div className="p-[5px] rounded-full flex items-center justify-center border-[2.84px] cursor-pointer">
                                            <Image src={settings} alt="Settings Icon" className="flex-shrink-0 w-auto h-auto" />
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <Image
                         className="w-full h-full object-cover overflow-hidden"
                         width={393}
                         height={754}
                         src={piratehomeBg}
                         alt="piratehomeBg"
                        />
                    </div>


                    <Link href="/tasklist">
                        <div className="absolute top-[54px] left-[290px]">
                            <div className="flex flex-col items-center justify-center bg-white w-[63.92px] h-[49.74px] border-[1px] border-[#B30202] p-[5.06px] gap-y-[0.63px] rounded-[7.59px]">
                                <Image src={GiftBox} alt="GiftBoxImg" />
                                <h2 className="text-[7.59px] leading-[9.49px] text-[#1A314E]">Daily Rewards</h2>
                                <p className="text-[7.65px] leading-[15.19px] tracking-[0.15%] font-medium  text-[#1A314EBF]">19:02:23</p>
                            </div>
                        </div>
                    </Link>


                    
                   
                                      

                       

                    <div className="absolute top-28 -right-40 ">

                        <div className="relative">
                            <div className="fadeImageContainer">
                                <Image  width={289} height={273} src={Island} alt="Island" />
                            </div>

                            <Link href="/inviteafriend">
                                <div className="absolute top-[0px] left-[70px] ">
                                    <div className="bg-[#1A314E] flex flex-col items-center justify-center border-[4px] border-[#FFFFFF0D] w-[40.19px] h-[40.19px] rounded-[30px]">
                                        <Image src={Users} alt="Users" />
                                    </div>
                                    <h1 className="text-[12.47px] leading-[18.7px] font-bold text-white text-center">Invite</h1>
                                </div>
                            </Link>
                
                        </div>

                        <style jsx>{`
                             .fadeImageContainer {
                                position: relative;
                                display: inline-block;
                                width: 289px;
                                height: 273px;
                                // background-color: #64C7EF; /* The color to blend the image edges into */
                                border-radius: 50%; /* Optional: Make the fade more circular */
                              }
                      
                              .fadeImageContainer :global(img) {
                                mask-image: radial-gradient(
                                  circle,
                                  rgba(255, 255, 255, 1) 100%, /* Full opacity at the center */
                                  rgba(255, 255, 255, 0) 0% /* Transparent at the edges */
                                );
                                -webkit-mask-image: radial-gradient(
                                  circle,
                                  rgba(255, 255, 255, 1) 50%,
                                  rgba(255, 255, 255, 0) 75%
                                );
                            }
                        `}</style>
                       
                    </div>

                    <div className="absolute top-36 -left-10">
                        <Image src={boatHome} alt="boatHome" />
                    </div>

            
                    <Link href="/tasklist">
                        <div className="absolute top-[240px] left-[25px]">
                            <Image src={TaskForHunt} alt="TaskForHunt" />
                        </div>
                    </Link>



                    <div className="absolute top-[450px] left-[180px]">
                        <Image src={TapCoin} alt="TapCoin" />
                    </div>


                    <div className="absolute top-[622px] left-[11px]">
                        <div className="flex items-center  p-[10.38px] bg-[#1A314E] border-[3.24px] border-white max-w-[165.97px] h-[51.9px] rounded-[20.76px] gap-[2px]">
                            <div>
                                <Image width={35.68} height={51.9} src={Prize} alt="PrizeSvg" />
                            </div>
                            
                            <h1 className="text-[20.76px] leading-[31.14px] font-semibold text-white">10000<span className="text-[15.57px] leading-[23.36px] font-semibold text-[#FFFFFFA6]">/15000</span></h1>
                        </div>
                    </div>

                    <div className="w-[200.31px] h-[5.57px] absolute top-[675px] left-[105.6px]">
                        <ProgressBar  progress={60} /> {/* Change the progress value as needed */}
                    </div>

                    {/* Boost */}
                    <div className="absolute top-[710px] left-[246.53px]" onClick={handleBoostClick}>
                        <div className="bg-[#1A314E] px-[7.75px] max-w-[133.47px] h-[51px] flex items-center gap-[5px] border-[2.8px] border-[#FFFFFF] rounded-[20.87px] ">
                            <div>
                                <Image src={lightning} alt="lightning" />
                            </div>
                            <h1 className="text-[20.87px] leading-[25.02px] font-semibold text-white">1000<span className="text-[15.51px] leading-[18.77px] text-[#FFFFFFA6]">/1000</span></h1>
                        </div>


                        {isOverlayVisible && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeOverlay}>
                                <div className="bg-gradient-to-b from-black  to-brown-dark  border-t-[4px] border-t-[#6B4C2D] rounded-lg w-full mt-60 h-[80%] flex flex-col items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                                <Image src={treasureChest} alt="treasureChest" className="-mt-24" />
                                <h2 className="text-[24px] leading-[32px] font-semibold text-white">Boost your Pirate Token</h2>
                                <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white">Tap the treasure hunt menu to buy upgrades for your exchange</p>

                                <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">Earn even when offline</p>

                     
                                <Link href="/boosttreasurechest">
                                    <div className="pt-10">
                                        <button className="w-[365px] h-[48px] rounded-[16px] bg-[#00A6DE] text-center text-white text-[16px] leading-[16px] font-semibold">
                                            Upgrade
                                        </button>
                                    </div>
                                </Link>
                       
                        
                                <button onClick={closeOverlay} className="absolute top-2 right-2">
                                    <Image src={Cross} alt="CrossImg" />
                                </button>
                            </div>
                            
                    </div>
            )}
                    </div>
                </div>
            </div>

                  
                
                    
        </>
    )
}

