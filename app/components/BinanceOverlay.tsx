// components/BinanceOverlay.tsx
import React from 'react';
import Image from "next/image";
import btc from "../../public/assets/btc.svg";
import Link from 'next/link';

interface OverlayProps {
    message: string;
    onClose: () => void;
}

const  BinanceOverlay: React.FC<OverlayProps> = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 top-60 flex items-center justify-center bg-black/50 z-50">
        
        <div className="bg-gradient-to-b from-black  to-brown-dark border-t-[4px] border-t-[#6B4C2D] w-full pb-40 p-4 rounded-lg shadow-lg relative">
            <button 
                onClick={onClose} 
                className="absolute top-2 right-2 text-[30px] text-white"
            >
                &times;
            </button>
           
            <div className="pt-10 flex flex-col items-center justify-center text-center">
                <Image className="mx-auto" src={btc} alt="btc" />
                

                <div className="bg-[#0F0E0E61] border-[1px] border-[#FFFFFF26] px-[14px] py-[10px] rounded-tl-[8px] rounded-br-[8px] rounded-bl-[25px] rounded-tr-[25px]">
                    <h2 className="text-white font-semibold text-[16px]">You've successfully linked Binance as your wallet exchange</h2>
                </div>


                <Link href="/gamehome" className="pt-10">
                    <div className=" bg-[#F7931A] rounded-[16px] w-[365px] p-[16px]">
                        <button className="text-white text-[16px] leading-[16px] font-semibold">
                            Good luck!
                        </button>
                    </div>
                </Link>
            </div>
          
         
        </div>
      </div>
    );
  };

export default BinanceOverlay;
