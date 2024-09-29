import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import Link from 'next/link';
import "../app/globals.css";

import MoneyChest from "../public/assets/MoneyChest.svg";
import Locked from "../public/assets/Locked.svg";





export default function BoostTreasureChest() {
    return(
        <>
            <GameNavbar />

            <div className="bg-[#000000] h-[100vh + 100px]">
                <div className="pt-10 flex flex-col items-center justify-center text-center">
                    <Image src={MoneyChest} alt="MoneyChest" />

                    <h1 className="font-semibold text-white text-[24px] leading-[32px]">Boosts Treasure Chests</h1>
                    <p className="pt-[10px] text-[12px] leading-[16px] tracking-[0.4px] max-w-[352px] text-[#FFFFFFA6] font-normal">Without the treasure hunt, winning gets tougher! Buy now to discover treasures and keep your edge in the game!</p>
                </div>

                <div className="pt-10 pb-10">
                    <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px]">
                        <div>
                            <Image src={Locked} alt="Locked" />
                        </div>
                        <div className="flex flex-col items-right gap-y-[10px]">
                            <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">10,000-50,000</h2>
                            <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$1</p>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px]">
                            <div>
                                <Image src={Locked} alt="Locked" />
                            </div>
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">50,000-500,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$2</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px]">
                            <div>
                                <Image src={Locked} alt="Locked" />
                            </div>
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">1,000,000-10,000,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$5</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px]">
                            <div>
                                <Image src={Locked} alt="Locked" />
                            </div>
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">10,000-100,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$2</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px]">
                            <div>
                                <Image src={Locked} alt="Locked" />
                            </div>
                            <div className="flex flex-col items-right gap-y-[10px]">
                                <h2 className="text-[16px] leading-[16px] tracking-[0.4px] text-white font-bold">50,000-500,000</h2>
                                <p className="text-[20px] leading-[16px] tracking-[0.4px] text-white font-semibold text-right">$5</p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[10px]">
                        <div className="flex items-center justify-between mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px]">
                            <div>
                                <Image src={Locked} alt="Locked" />
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