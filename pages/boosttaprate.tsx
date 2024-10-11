import { useRouter } from 'next/navigation';
import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import { useEffect, useState } from 'react';
import "../app/globals.css";


import Lightning from "../public/assets/lightning.svg";
import Boost2 from "../public/assets/Boost2.png";
import Coin from "../public/assets/standingdollarcoin.svg";
import BackButton from "../public/assets/backButton.svg";

import { useAppContext } from '@/context';
import { getAllTapTreausres } from '@/scripts';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PurchaseTreasureOverlay from '@/app/components/PurchaseTreasureOverlay';


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


export default function BoostTapRateChest() {
    const router = useRouter(); // Initialize the router
    const { userId, tapTreasures, setTapTreasures } = useAppContext();
    const [currentTreasue, setCurrentTreasure] = useState<treasure>();
    const load = async () => {
        //await getDoneTasks(userId, setDoneTasks);
        await getAllTapTreausres(setTapTreasures);

    }

    useEffect(() => {
        if (userId) {
            load();
        }

    }, []);











    const handleBackClick = () => {
        router.back(); // Go back to the previous page
    };



    const [isPaymentOverlayVisible, setIsPaymentOverlayVisible] = useState(false);

    // Show the second overlay when "Pay Now" is clicked
    const handlePayNowClick = (treasure: treasure) => {
        setCurrentTreasure(treasure);
        setIsPaymentOverlayVisible(true);
    };

    // function abbreviateNumber(number: number): string {
    //     const abbrev = ["", "K", "M", "B", "T"]; // Array of suffixes
    //     let i = 0;

    //     // Loop to divide the number and move to higher suffixes
    //     while (number >= 1000 && i < abbrev.length - 1) {
    //         number /= 1000;
    //         i++;
    //     }
    //     alert(number);
    //     // Round to one decimal place and add the suffix
    //     return number.toFixed(1).replace(/\.0$/, '') + abbrev[i];
    // }
    return (
        <>
            <GameNavbar />
            {
                isPaymentOverlayVisible && (<PurchaseTreasureOverlay setIsPaymentOverlayVisible={setIsPaymentOverlayVisible} treasure={currentTreasue} isTapboost={true}/>)
            }
            <div className="relative bg-[#000000] h-[100vh + 100px]" style={{ minHeight: '100vh' }}>

                <div className="flex flex-col items-center justify-center pt-5 text-center">
                    <Image src={Lightning} alt="MoneyBagChest" width={150} height={150} />

                    <h1 className="font-semibold text-white text-[24px] leading-[32px]">Boosts Treasure Chests</h1>
                    <p className="pt-[10px] text-[12px] max-w-[352px] text-[#FFFFFFA6] font-normal">Without the treasure hunt, winning gets tougher! Buy now to discover treasures and keep your edge in the game!</p>
                </div>

                <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                    <Image src={BackButton} alt="BackButton" />
                </div>

                <div className="pt-5 pb-10">


                    {
                        tapTreasures ? (
                            tapTreasures.map((treasure: treasure) => (
                                <div key={treasure.id} className="pt-[5px] my-2" onClick={() => handlePayNowClick(treasure)}>
                                    <div className="flex items-center mx-auto rounded-[8px] px-[16px] py-[8px] border-[1px] border-[#FFC247A6] w-[361px] hover:bg-[#FFC247]">
                                        <div className='mx-1'>
                                            <Image src={treasure.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${treasure.image_url}` : Boost2} alt="Boost2" width={100} height={100} className='rounded-[8px]' />
                                        </div>
                                        <div className="flex flex-col w-full items-right gap-y-[10px]">
                                            <h2 className="text-[16px] text-white font-bold">{treasure.name ?? 'Chest'}</h2>
                                            <div className='flex items-center'>
                                                <h2 className="text-[10px] text-white font-bold mx-1">{treasure.start_reward ?? '0'} to {treasure.end_reward ?? '0'} </h2>
                                                <Image src={Coin} width={20} height={20} alt="Coin" />
                                                <p className="text-[16px] text-white font-semibold text-right" style={{ marginLeft: 'auto' }}>{treasure.price ?? 0} TON</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            ))

                        ) : (
                            <LoadingSpinner />
                        )
                    }


                </div>
            </div>

        </>
    )
}