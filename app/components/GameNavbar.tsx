
import Link from 'next/link';
import Image from "next/image";
import dotCircle from "../../public/assets/dotCircle.svg";

export function GameNavbar() {
    

    return (
        <nav className="relative lg:hidden md:hidden xl:hidden bg-[#1A314E]  py-[8.08px]  px-[16.15px] w-full">
            <div  className="flex items-center justify-between">
                <div className="text-[16.15px] leading-[19.55px] font-medium text-white">
                    <Link href="/">Cancel</Link>
                </div>

                <div className="flex flex-col items-center justfy-center text-center">
                    <h1 className="text-[16.15px] leading-[19.55px] font-semibold text-white">Pirate Hunt Coin</h1>
                    <p className="text-[12.11px] leading-[14.66px] font-normal text-white">bot</p>
                </div>

                <Image src={dotCircle} alt="dotCircle" />
            </div>
        </nav>

    )
}