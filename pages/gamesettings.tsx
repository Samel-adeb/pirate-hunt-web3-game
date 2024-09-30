import { GameNavbar } from "@/app/components/GameNavbar";

import "../app/globals.css";
import Image from "next/image";

import CaretRight from '../public/assets/Caret right.svg'

import { useRouter } from 'next/navigation';


export default function GameSettings() {
    const router = useRouter();

    const handleClick = () => {
      router.push('/chooseexchange'); // Navigate to the choose exchange page
    };


    return (
       <>

            <GameNavbar />

            <div className="bg-[#000000] h-screen">
                <div className="pt-10">
                    <div className="flex items-center justify-center text-center">
                        <h1 className="text-[24px] font-semibold leading-[32px] text-white">Settings</h1>
                    </div>

                    <div className="pt-[30px]">
                        <div className="flex items-center justify-between bg-[#FFFFFF26] max-w-[363px] mx-auto p-[16px] rounded-full ">
                            <div className="flex flex-col items-start gap-y-[10px] justify-start">
                                <h1 className="text-[16px] leading-[16px] tracking-[0.4px] font-semibold text-white">Select Lanuguage</h1>
                                <h3 className="text-[16px] leading-[16px] tracking-[0.4px] font-normal text-[#FFFFFFA6]">English</h3>
                            </div>
                            <div>
                                <Image src={CaretRight} alt="CaretRight" />
                            </div>
                        </div>


                        <div className="pt-[10px]">
                            <div className=" flex items-center justify-between bg-[#FFFFFF26] max-w-[363px] mx-auto p-[16px] rounded-full " onClick={handleClick}>
                                <div className="flex flex-col items-start gap-y-[10px] justify-start">
                                    <h1 className="text-[16px] leading-[16px] tracking-[0.4px] font-semibold text-white">Choose Exchange</h1>
                                    <h3 className="text-[16px] leading-[16px] tracking-[0.4px] font-normal text-[#FFFFFFA6]">Binance</h3>
                                </div>
                                <div>
                                    <Image src={CaretRight} alt="CaretRight" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
       
       </>
    )
}