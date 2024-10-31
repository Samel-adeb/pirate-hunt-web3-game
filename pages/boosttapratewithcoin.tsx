import React from 'react'
import Coin from '../public/assets/standingdollarcoin.svg'
import Lightning from "../public/assets/lightning.svg";

import BackButton from "../public/assets/backButton.svg";
import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import { useEffect, useState } from 'react';
import "../app/globals.css";
import { useAppContext } from '@/context';
import { getAllLevelTapRate } from '@/scripts';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PurchaseTreasureOverlay from '@/app/components/PurchaseTapRateOverlay';


interface levelTapRate {
  id: number;
  name: string;
  price: string;
  price_reward: number;
  reward: number;
  user_level: number;
  duration: number;
}
const Boosttapratewithcoin = () => {
  const router = useRouter(); // Initialize the router
  const [isPaymentOverlayVisible, setIsPaymentOverlayVisible] = useState(false);
  const { userId, tapTreasures, setTapTreasures } = useAppContext();
  const [currentTreasue, setCurrentTreasure] = useState<levelTapRate>();
  const load = async () => {
    await getAllLevelTapRate(setTapTreasures);

  }

  useEffect(() => {
    if (userId) {
      load();
    }

  }, []);

  // Show the second overlay when "Pay Now" is clicked
  const handlePayNowClick = (treasure: levelTapRate) => {
    setCurrentTreasure(treasure);
    setIsPaymentOverlayVisible(true);
  };
  const handleBackClick = () => {
    router.back(); // Go back to the previous page
  };
  return (
    <>
      <GameNavbar />
      {
        isPaymentOverlayVisible && (<PurchaseTreasureOverlay setIsPaymentOverlayVisible={setIsPaymentOverlayVisible} treasure={currentTreasue} isTapboost={true} />)
      }
      <div className="relative bg-[#000000] h-[100vh + 100px]" style={{ minHeight: '100vh' }}>

        <div className="flex flex-col items-center justify-center pt-5 text-center">
          <Image src={Lightning} alt="MoneyBagChest" width={150} height={150} />

          <h1 className="font-semibold text-white text-[24px] leading-[32px]">Boosts Tap Rate</h1>
          <p className="pt-[10px] text-[12px] max-w-[352px] text-[#FFFFFFA6] font-normal">Purchase any of the boost to temorarily boost your Tap rate</p>
        </div>

        <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
          <Image src={BackButton} alt="BackButton" />
        </div>

        {
          tapTreasures ? (
            tapTreasures.map((treasure: levelTapRate) => (

              <div
                key={treasure.id}
                className='row w-[100] text-white px-3'>
                <div className='w-[100] flex justify-between p-3 border border-[#00A6DE7A] rounded-2xl my-3'>
                  <div className='text-[12.47px] flex text-[#FFC247]' style={{ alignItems: 'center' }}>
                    <strong className='text-[14px] px-1 text-[#FFFFFF]'>{treasure.price_reward} COIN(S)</strong>
                    per tap!
                  </div>
                  <div className='fw-bold flex text-[12.47px]' style={{ alignItems: 'center' }}>{(treasure.price && parseInt(treasure.price)) ? parseInt(treasure.price).toFixed(0) : 0}
                    <Image src={Coin} alt='coin' width={20} height={20} className='mx-1' />
                  </div>
                  <button className='text-[10px] btn btn-warning rounded-2xl p-3' onClick={() => handlePayNowClick(treasure)}>BOOST</button>
                </div>


              </div>
            ))
          ) : (
            <LoadingSpinner />
          )
        }


      </div>
    </>

  )
}

export default Boosttapratewithcoin




