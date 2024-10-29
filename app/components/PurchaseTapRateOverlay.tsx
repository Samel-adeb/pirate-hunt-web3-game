import React from 'react'
import "../globals.css";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library

import standingdollarcoin from '../../public/assets/standingdollarcoin.svg'
import EnlargedBoost from '../../public/assets/lightning.svg'
import Image from 'next/image';


import { boostTapRateBonus } from '@/scripts';
import { useAppContext } from '@/context';
import { useRouter } from 'next/router';

interface levelTapRate {
    id: number;
    name: string;
    price: string;
    price_reward: number;
    reward: number;
    user_level: number;
    duration: number;
}
function PurchaseTreasureOverlay({ treasure, setIsPaymentOverlayVisible }: { treasure: levelTapRate | undefined; setIsPaymentOverlayVisible: (arg0: boolean) => void, isTapboost: boolean }) {
    const { userId, userBalance, setUserBalance, user_tap_rate_level, setUser_tap_rate_level, countdownResetTapRate } = useAppContext();
    const router = useRouter();
    const handleTransaction = async (id: number) => {
        const isSuccessful = await boostTapRateBonus(userId, id)

        if (isSuccessful) {
            setUser_tap_rate_level(parseInt(user_tap_rate_level) + parseInt(isSuccessful.price_reward));
            countdownResetTapRate(parseInt(isSuccessful.duration));
            setUserBalance(parseInt(userBalance) - parseInt(isSuccessful.price));
            router.back();
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 500, // Animation duration
            // You can add more options here
        });
    }, []);
    function abbreviateNumber(nnumber: number): string {
        // Ensure the input is a valid number
        let number = nnumber;
        if (typeof nnumber !== 'number' || isNaN(nnumber)) {
            number = parseInt(nnumber.toString());
        }

        const abbrev = ["", "K", "M", "B", "T"]; // Array of suffixes
        let i = 0;

        // Loop to divide the number and move to higher suffixes
        while (number >= 1000 && i < abbrev.length - 1) {
            number /= 1000;
            i++;
        }

        // Ensure small numbers are handled and round to one decimal place
        return number < 1000 ? number.toFixed(1).replace(/\.0$/, '') + abbrev[i] : number.toString();
    }
    return (
        treasure && (
            <div data-aos='slide-up' className='w-full bg-black flex flex-col p-3 items-center h-[100%] absolute z-50 text-center rounded-[30px]' style={{ top: '10%', color: '#000321' }}>
                <button className='p-3 rounded-full text-white align-self-end text-[14px]' onClick={() => setIsPaymentOverlayVisible(false)}>&#x2715;</button>
                <div className='text-white font-bold text-[20px] my-2'>
                    {treasure.price_reward ?? ''} COIN(S)
                </div>
                <p className='font-light text-[14px] text-gray-500  text-warning'>per tap!</p>
                <div className=' flex'>
                    <Image alt='vertical coin' src={standingdollarcoin.src} width={30} height={30} />
                    <div className='my-2 font-bold text-white'>
                        {abbreviateNumber(parseInt(treasure.price)) ?? '0'}
                    </div>
                </div>

                <div className='my-2' data-aos="zoom-in">
                    <Image alt='treasure chest' src={EnlargedBoost} className='rounded-[8px]' width={100} height={100} />
                </div>
                <div className='my-2 w-full'>
                    <div>
                        <button onClick={() => handleTransaction(treasure.id)} className='btn-warning rounded-[8px] w-75 font-bold text-white text-[14px] p-3'>Boost </button>

                    </div>

                </div>

            </div>
        )
    )
}

export default PurchaseTreasureOverlay