import { useState } from 'react';
import { GameNavbar } from "@/app/components/GameNavbar";

import "../app/globals.css";
import Image from "next/image";
import  BinanceOverlay  from "@/app/components/BinanceOverlay";

import CaretRight from '../public/assets/Caretright.svg'
import XAS from "../public/assets/XAS.svg";
import Check from '../public/assets/Check.svg'

import UseRouteChange from '../hooks/useRouteChange';

export default function ChooseExchange() {
    const [checked, setChecked] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
   


  const handleClick = async () => {
    // Perform your check here
    if (!checked) {
      setChecked(true); // Update the state to show the checkmark
      
      // Show the overlay
      setOverlayVisible(true);

      // Delay before navigation
    //   await delay(2000); // Delay for 2 seconds (2000 milliseconds)
      
    //   // Navigate to game home
    //   router.push('/gamehome');
    }
  };

  // Ensure the overlay visibility is handled correctly
  UseRouteChange('/gamehome', () => {
    if (checked) { // Ensure it shows only after the check is done
      setOverlayVisible(true);
    }
  });

  const handleOverlayClose = () => {
    setOverlayVisible(false); // Hide overlay
  };
    

    return (
        <>

            <GameNavbar />

            <div className="bg-[#000000] h-screen">
                <div className="pt-10">
                    <div className="flex items-center justify-center text-center">
                        <h1 className="text-[24px] font-semibold leading-[32px] text-white">Choose Exchange</h1>
                    </div>

                    <div className="pt-[30px] relative">
                        <div className="flex items-center justify-between rounded-[8px] py-[4px] px-[8px] max-w-[361px] mx-auto border-[1px] border-[#FFFFFF26]"  onClick={handleClick}>
                            <div className="flex items-center gap-[10px]">
                                <Image src={XAS} alt="XAS" />
                                <h1 className="text-white">Binance</h1>
                            </div>
                        
                            <div className="flex items-center gap-[10px]">
                                {checked ? (
                                    <Image src={Check} alt="Check" className="flex-shrink-0" />
                                ) : (
                                    <Image src={CaretRight} alt="CaretRight" className="flex-shrink-0" />
                                )}
                            </div>

                           
                        </div>

                        {overlayVisible && (
                            <BinanceOverlay message="Successful" onClose={handleOverlayClose} />
                        )}


                        <div className="pt-[10px]">
                            <div className="flex items-center justify-between rounded-[8px] py-[4px] px-[8px] max-w-[361px] mx-auto border-[1px] border-[#FFFFFF26]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={XAS} alt="XAS" />
                                    <h1 className="text-white">OKX</h1>
                                </div>
                            
                                <div>
                                    <Image  src={CaretRight} alt="CaretRight" />
                                </div>
                            </div>
                        </div>


                        <div className="pt-[10px]">
                            <div className="flex items-center justify-between rounded-[8px] py-[4px] px-[8px] max-w-[361px] mx-auto border-[1px] border-[#FFFFFF26]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={XAS} alt="XAS" />
                                    <h1 className="text-white">Bybit</h1>
                                </div>
                            
                                <div>
                                    <Image  src={CaretRight} alt="CaretRight" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
        </>
    )
}


