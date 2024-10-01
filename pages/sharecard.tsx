import Image from "next/image";
import "../app/globals.css";

import BigCoin from "../public/assets/BigCoin.svg";
import Cap from "../public/assets/Cap.png";
import BigBaby from "../public/assets/BigBaby.png";


export default function ShareCard() {
    return (
        <>


        <div className="h-[100vh + 200px] bg-[#251301E8]">
            
            <div>
                <div className="pt-10">
                    <div className="flex items-center justify-center gap-[15px]">
                        <Image width={71.22} height={71.22} src={Cap} alt="Cap" />
                        <h1 className="text-[31.29px] leading-[46.93px] font-semibold tracking-[1.3px] text-white">Pirate Hunt</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center pt-[25px]">
                    <h2 className="text-center text-white text-[20.57px] leading-[30.86px] tracking-[1.29px] font-medium">i have earned</h2>

                    <div className="-mt-[20px] flex items-center justify-center gap-[15px]">
                        <Image width={52.67} height={52.67} src={BigCoin} alt="BigCoin" />

                        <h1 className="text-[36.87px] leading-[84.27px] font-bold text-white">100,000,000</h1>
                    </div>
                </div>

                <div className="pt-[25px]">
                    <Image width={361.48}  height={513} src={BigBaby} alt="BigBaby" />
                </div>
            </div>

        </div>
        
        
        
        </>
    )
}