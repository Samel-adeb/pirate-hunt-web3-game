import Image from 'next/image'
import BigGiftBox from "../../public/assets/bluegiftbox.svg";
import standingdollarcoin from "../../public/assets/standingdollarcoin.svg";
import Cross from "../../public/assets/Cross.svg";
import React, { useEffect, useState } from 'react'
import DayOneOverlay from './DayOneOverlay';
import { useAppContext } from '@/context';
import { getAllDailyBounuses, getClaimedDailyBonuses } from '@/scripts';
import LoadingSpinner from './LoadingSpinner';
import { showInfoMessage } from '@/scripts/utils';

interface dailyBonus {
    id: number;
    name: string;
    amount: string;
}

function DailyBonuses({ isDailyOverlayVisible, closeDailyOverlay }: { isDailyOverlayVisible: boolean; closeDailyOverlay: () => void }) {
    // const { isDailyOverlayVisible, closeDailyOverlay } = props;
    const [isDayOneOverlayVisible, setIsDayOneOverlayVisible] = useState(false);
    const { userId, allDailyBonues, setAllDailyBonues, claimedDailyBonuses, setClaimedDailyBonuses } = useAppContext();
    const [currentDayBonus, setCurrentDayBonus] = useState<dailyBonus>();

    const load = async () => {
        await getClaimedDailyBonuses(userId, setClaimedDailyBonuses);
        await getAllDailyBounuses(setAllDailyBonues);

    }

    useEffect(() => {
        if (userId) {
            load();
        }

    }, []);


    function handleDayOneOverlay(dailyBonus: dailyBonus) {
        if (isBonusAlreadyClaimed(dailyBonus.id)) {
            showInfoMessage('You have already claimed this bonus today!');
            return;

        } else {
            setCurrentDayBonus(dailyBonus);
            setIsDayOneOverlayVisible(true);
        }
    }

    const closeDayOneOverlay = () => {
        setIsDayOneOverlayVisible(false);
    };
    interface Bonus {
        daily_bonus_id: number;
    }
    const isBonusAlreadyClaimed = (bonusId: number) => {
        if (claimedDailyBonuses) {
            // Find the bonus in the claimedDailyBonuses array
            const result = claimedDailyBonuses.find((bonus: Bonus) => bonus.daily_bonus_id == bonusId);
            // Return true if result exists (bonus is already claimed), otherwise false
            return !!result;
        } else {
            return false;
        }
    };


    return (
        <div>
            {isDailyOverlayVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeDailyOverlay}
                >
                    <div
                        className="bg-black border-t-4 border-white flex flex-col items-center justify-center m-1 mt-4 p-4 relative rounded-2xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image src={BigGiftBox} alt="BigGiftBox" className="my-6 w-20" />
                        <h2 className="text-2xl font-semibold text-white">Daily Reward</h2>
                        <p className="text-sm text-center text-white">
                            One of the ways to increase your coin daily
                        </p>

                        <div className="pt-5 flex items-center justify-center w-full">
                            {/* Triggering the separate overlay component */}
                            <DayOneOverlay
                                isVisible={isDayOneOverlayVisible}
                                currentDayBonus={currentDayBonus ?? { id: 0, name: '', amount: '0' }} // Default fallback value
                                closeOverlay={closeDayOneOverlay}
                                load={load}
                            />

                            <div className="grid grid-cols-2 gap-2 w-full">
                                {allDailyBonues ? (
                                    allDailyBonues.map((dailyBonus: dailyBonus, index: number) => (
                                        <div key={dailyBonus.id} className="p-2">
                                            <div
                                                className="flex flex-col border border-[#00A6DE] p-2 rounded-lg items-center justify-center cursor-pointer"
                                                onClick={() => handleDayOneOverlay(dailyBonus)}
                                                style={{ width: index === 6 ? '218%' : '' }}
                                            >
                                                <h1 className="text-white text-lg">
                                                    {dailyBonus.name ? dailyBonus.name : "Day"}
                                                </h1>
                                                {
                                                    isBonusAlreadyClaimed(dailyBonus.id) ? (
                                                        <div className="flex items-center bg-main justify-center p-3 rounded shadow text-white w-full">
                                                            <p className="text-white font-bold mx-1">CLAIMED</p>

                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center bg-main justify-center p-3 rounded shadow text-white w-full">
                                                            <p className="text-white font-bold mx-1">{dailyBonus.amount ? dailyBonus.amount : "0"}</p>
                                                            <Image width={25} height={25} src={standingdollarcoin} alt="standingdollarcoin" />
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <LoadingSpinner />
                                )}
                            </div>
                        </div>

                        <button onClick={closeDailyOverlay} className="absolute top-2 right-2">
                            <Image src={Cross} alt="CrossImg" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DailyBonuses;
