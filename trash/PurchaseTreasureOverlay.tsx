import React from 'react'
import "../globals.css";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library

import standingdollarcoin from '../../public/assets/standingdollarcoin.svg'
import EnlargedBoost from '../../public/assets/EnlargedBoost1.png'
import Image from 'next/image';
import { useTonConnect } from '@/hooks/useTonConnect'
import { showFailedMessage, showInfoMessage } from '@/scripts/utils';
import { AwardTapboostPurchse, AwardTreasurePurchse } from '@/scripts';
import { useAppContext } from '@/context';
import { useRouter } from 'next/router';

interface treasure {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string
    start_reward: number;
    end_reward: number;
    duration: number;
}
function PurchaseTreasureOverlay({ treasure, setIsPaymentOverlayVisible, isTapboost }: { treasure: treasure | undefined; setIsPaymentOverlayVisible: (arg0: boolean) => void, isTapboost: boolean }) {
    const {
        connect,
        disconnect,
        connected,

        sendTransaction,
    } = useTonConnect();
    const { userId, userBalance, setUserBalance, setUser_tap_rate_level, countdownResetTapRate } = useAppContext();
    const router = useRouter();
    const handleTransaction = async (amountn: number, id: number, info: { treasure_id: number, amount: number, name: string }) => {
        if (!connected) {
            await connect();
        }
        try {
            // alert( process.env.NEXT_PUBLIC_RECIEVER_ADDRESS);
            const result = await sendTransaction([{
                address: `${process.env.NEXT_RECEIVER_WALLET_ADDRESS}`,
                amount: (amountn * 1000000000).toString()  // in nanoTON
            }]);

            showInfoMessage("Transaction successful: " + result);  // Could be transaction hash or confirmation details
            if (!isTapboost) {
                const isSuccessful = await AwardTreasurePurchse(userId, id, info);

                if (isSuccessful) {
                    setUserBalance(parseInt(userBalance) + parseInt(isSuccessful.reward));
                    showInfoMessage("Congratulation! You got " + isSuccessful.reward + " coin reward!");
                }
            } else {
                const isSuccessful = await AwardTapboostPurchse(userId, id);

                if (isSuccessful) {
                    setUser_tap_rate_level(isSuccessful.boost_amount);
                    countdownResetTapRate(isSuccessful.duration)
                    showInfoMessage("Congratulation! You got " + isSuccessful.boost_amount + " coin per tap for the next " + isSuccessful.duration + " seconds!");
                    router.back();
                }
            }

        } catch (error) {
            showFailedMessage("Transaction failed: " + error);  // Logs error if the transaction fails
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 500, // Animation duration
            // You can add more options here
        });
    }, []);
    function abbreviateNumber(nnumber: number): string {
        if (nnumber != undefined) {
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
        } else {
            return '0';
        }
    }
    return (
        treasure && (
            <div data-aos='slide-up' className='w-full bg-black flex flex-col p-3 items-center h-[100%] absolute z-50 text-center rounded-[30px]' style={{ top: '10%', color: '#000321' }}>
                <button className='p-3 rounded-full text-white align-self-end text-[14px]' onClick={() => setIsPaymentOverlayVisible(false)}>&#x2715;</button>
                <div className='text-white font-bold text-[20px] my-2'>
                    {treasure.name ?? 'CHEST'}
                </div>
                <p className='font-light text-[14px] text-gray-500  text-warning'>Get random amount of coins</p>
                <div className=' flex'>
                    <Image alt='vertical coin' src={standingdollarcoin.src} width={30} height={30} />
                    <div className='my-2 font-bold text-white'>
                        {abbreviateNumber(treasure.start_reward) ?? '0'} to {abbreviateNumber(treasure.end_reward) ?? '0'}
                    </div>
                </div>

                <div className='my-2' data-aos="zoom-in">
                    <Image alt='treasure chest' src={treasure.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${treasure.image_url}` : EnlargedBoost} className='rounded-[8px]' width={300} height={300} />
                </div>
                <div className='my-2 w-full'>
                    <div>
                        {
                            connected ? (
                                <button onClick={() => handleTransaction(treasure.price, treasure.id, { treasure_id: treasure.id, amount: treasure.price, name: treasure.name })} className='btn btn-warning w-75 font-bold text-white p-3'>PURCHASE ({treasure.price ?? 0} TON)</button>
                            ) : (
                                <button onClick={connected ? disconnect : connect} className='btn-warning rounded-[8px] w-75 font-bold text-white text-[14px] p-3'>
                                    Connect Wallet
                                </button>
                            )
                        }

                        {/* <button onClick={() => handleTransaction(treasure.price, treasure.id, { treasure_id: treasure.id, amount: treasure.price, name: treasure.name })} className='btn btn-warning w-75 font-bold text-white p-3'>PURCHASE ({treasure.price ?? 0} TON)</button> */}

                        {/* {connected && <p>Connected Wallet: {walletAddress}</p>} */}


                    </div>

                </div>

            </div>
        )
    )
}

export default PurchaseTreasureOverlay