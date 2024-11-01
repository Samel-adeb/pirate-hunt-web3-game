import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import Link from 'next/link';
import "../app/globals.css";
// import  ProgressBar  from '@/app/components/ProgressBar';
import piratehomeBg from "../public/assets/piratehomeBg.png";

import TapHere from "../public/assets/touch.png";
import Island from "../public/assets/Island.svg";
import boatHome from "../public/assets/boatHome.svg";
import flyingchest from "../public/assets/flyingchest.webp";
import Users from "../public/assets/Users.png";
import ShiningCoin from "../public/assets/standingdollarcoinb.png";
import TapCoin from "../public/assets/TapCoin.svg";
import ProfileSvg from "../public/assets/ProfileSvg.svg";
import Prize from "../public/assets/Prize.svg";
import golddollarcoin from "../public/assets/golddollarcoin.svg";
import XAS from "../public/assets/XAS.svg";
import settings from "../public/assets/setting.png";
import lightning from "../public/assets/lightning.svg";
import treasureChest from "../public/assets/treasure chest.svg";
import Cross from "../public/assets/Cross.svg";
import GiftBox from "../public/assets/gift box.png";
// import BigGiftBox from "../public/assets/GiftBox.png";
import BigLightning from "../public/assets/BigLightning.svg";
// import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
import Coinfromtap from "../public/assets/Coinfromtap.svg";
import { useEffect } from 'react';
import { useAppContext } from '@/context';
import { useState } from "react";
// import DayOneOverlay from "@/app/components/DayOneOverlay";
import { addTapTransaction } from "@/scripts";
import { addClaimRandomTransaction } from "@/scripts";
import DailyBonuses from "@/app/components/DailyBonuses";
import { useRouter } from "next/router";
import LogStatus from "@/app/components/LogStatus";
import Cookies from 'js-cookie';
// import ProgressBar from "@/app/components/ProgressBar";


export default function GameHome() {

    const { userId, username, userInfo, level, userBalance, setUserBalance, userRank, userDailyRewardInfo, user_tap_rate_level, user_temp_tap_rate_level, setIsMusicOn } = useAppContext();
    const [energyLevel, setEnergyLevel] = useState<number>(0);

    const ENERGY_CAPACITY_VALUE: number = userInfo['energy_capacity']; // Maximum energy capacity
    const [timeLeft, setTimeLeft] = useState<string>('');
    const targetDate = userDailyRewardInfo ? new Date(userDailyRewardInfo.next_claim_time).getTime() : new Date();
    const [tapCount, setTapCount] = useState(0);
    // const [chestMoving, setChestMoving] = useState(false); 

    const [showChest, setShowChest] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [claimed, setClaimed] = useState(false); // Track if the chest has been claimed

    const getRandomCoinAmount = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const [randomCoinAmount, setRandomCoinAmount] = useState<number | null>(null);
    const [hasClaimed, setHasClaimed] = useState(false); // state to track if the reward is claimed
    const [chestPosition, setChestPosition] = useState<{
        top: string;
        left: string;
        direction: string; // Keep this as a string
    }>({
        top: '0px',
        left: '0px',
        direction: "0" // Initialize with a string value, e.g., '0'
    });
    const [canShowChest, setCanShowChest] = useState(true);

    const [coins, setCoins] = useState<{ id: number; x: number; y: number }[]>([]);
    const [tempbal, setTempbal] = useState<number>(0);
    const router = useRouter();



    useEffect(() => {

        if (localStorage.tempbal) {
            const bal = parseInt(localStorage.tempbal);
            if (bal > 0 && userId) {
                addTapTransaction(userId, bal);
                setUserBalance(parseInt(userBalance) + bal);
                localStorage.removeItem('tempbal');
            }

        }



    }, []);
    // Automatically start playing the background music based on local storage
    useEffect(() => {

        const musicSetting = localStorage.getItem('musicOn') !== 'false'; // Default to true if not set
        setIsMusicOn(!musicSetting);
        setIsMusicOn(musicSetting);

    }, []);

    // Automatically start playing the background music
    useEffect(() => {



        // Retrieve energy level from local storage or set it to maximumlocalStorage.getItem('energy_')
        const storedEnergy = parseInt(Cookies.get('energy_') || '') || ENERGY_CAPACITY_VALUE;
        setEnergyLevel(storedEnergy);

        // Countdown logic
        const interval = setInterval(() => {
            const now = new Date().getTime(); // Get current time in milliseconds
            const nowUTC = now + (new Date().getTimezoneOffset() * 60000); // Convert 'now' to UTC time by accounting for the timezone offset

            const difference = targetDate.valueOf() - nowUTC; // Difference in milliseconds

            if (difference > 0) {
                // Calculate remaining time in days, hours, minutes, and seconds
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Claim now');
                clearInterval(interval); // Stop the countdown when the target date is reached
            }
        }, 1000); // Update every second


        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [targetDate]);

    // Function to update energy level over time
    const updateEnergyLevel = () => {
        const RECHARGE_SPEED = 1; // Energy increase per second when below maximum
        const currentTime = Date.now();
        const lastUpdateTime = parseInt(localStorage.getItem('lastUpdateTime') || '') || currentTime;
        const elapsedTime = (currentTime - lastUpdateTime) / 1000; // Convert milliseconds to seconds

        // If energy level is below maximum, increase it
        if (energyLevel < ENERGY_CAPACITY_VALUE) {
            const energyIncrease = RECHARGE_SPEED * elapsedTime;
            const newEnergyLevel = Math.min(energyLevel + energyIncrease, ENERGY_CAPACITY_VALUE); // Ensure energy level doesn't exceed maximum
            setEnergyLevel(newEnergyLevel); // Update state
            Cookies.set('energy_', newEnergyLevel.toString());
            //localStorage.setItem('energy_', newEnergyLevel.toString()); // Store updated energy in local storage
        }

        // Update last update time
        localStorage.setItem('lastUpdateTime', currentTime.toString());
    };

    // Continuously update energy level every 5 seconds
    useEffect(() => {

        const energyInterval = setInterval(() => {
            updateEnergyLevel();
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(energyInterval);
    }, [energyLevel]); // This effect runs whenever energyLevel changes

    function abbreviateNumber(number: number): string {
        if (number != undefined) {
            const abbrev = ["", "K", "M", "B", "T"]; // Array of suffixes
            let i = 0;

            // Loop to divide the number and move to higher suffixes
            while (number >= 1000 && i < abbrev.length - 1) {
                number /= 1000;
                i++;
            }

            // Round to one decimal place and add the suffix
            return number.toFixed(1).replace(/\.0$/, '') + abbrev[i];
        } else {
            return '0';
        }
    }

    const hasClaimedToday = () => {
        const today = new Date().toISOString().split('T')[0];
        const lastClaimDate = localStorage.getItem('lastClaimDate');
        return lastClaimDate === today;
    };



    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();


        // Get the click position relative to the page
        const x = e.clientX;
        const y = e.clientY;

        if (!hasClaimed) {  // Only allow taps to show the chest if the reward hasn't been claimed
            setTapCount((prevCount) => {
                const newCount = prevCount + 1;

                if (newCount >= 50 && canShowChest) {
                    setShowChest(true);
                }

                return newCount;
            });
        }

        // if (hasClaimedToday()) {
        //     // If the user has already claimed today, don't increment the tap count
        //     return;
        // }



        if (parseInt(user_tap_rate_level) == parseInt(user_temp_tap_rate_level)) {
            // Create a new coin element by pushing a unique ID and the position
            if (energyLevel > parseInt(user_tap_rate_level)) {
                const newCoinId = Date.now();
                setCoins((prevCoins) => [...prevCoins, { id: newCoinId, x, y }]);

                // Remove the coin after 2 seconds
                setTimeout(() => {
                    setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== newCoinId));
                }, 700);

                // console.log(user_tap_rate_level);

                setUserBalance(parseInt(userBalance) + parseInt(user_tap_rate_level));
                setTempbal(tempbal + parseInt(user_tap_rate_level));
                localStorage.setItem('tempbal', (tempbal + parseInt(user_tap_rate_level)).toString());
                setEnergyLevel(energyLevel - parseInt(user_tap_rate_level));
            } else {
                if (navigator.vibrate) {
                    navigator.vibrate(100);  // 200ms vibration
                }
            }
        }
        else {
            const newCoinId = Date.now();
            setCoins((prevCoins) => [...prevCoins, { id: newCoinId, x, y }]);

            // Remove the coin after 2 seconds
            setTimeout(() => {
                setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== newCoinId));
            }, 700);

            // console.log(user_tap_rate_level);

            setUserBalance(parseInt(userBalance) + parseInt(user_tap_rate_level));
            setTempbal(tempbal + parseInt(user_tap_rate_level));
            localStorage.setItem('tempbal', (tempbal + parseInt(user_tap_rate_level)).toString());
        }

    };

    const moveChestRandomly = () => {
        const direction = Math.floor(Math.random() * 4); // 0: left, 1: right, 2: top, 3: bottom
        let newTop = '0px';
        let newLeft = '0px';

        switch (direction) {
            case 0: // From left
                newTop = Math.floor(Math.random() * window.innerHeight) + 'px';
                newLeft = '-100px';
                break;
            case 1: // From right
                newTop = Math.floor(Math.random() * window.innerHeight) + 'px';
                newLeft = window.innerWidth + 'px';
                break;
            case 2: // From top
                newTop = '-100px';
                newLeft = Math.floor(Math.random() * window.innerWidth) + 'px';
                break;
            case 3: // From bottom
                newTop = window.innerHeight + 'px';
                newLeft = Math.floor(Math.random() * window.innerWidth) + 'px';
                break;
            default:
                break;
        }

        setChestPosition({ top: newTop, left: newLeft, direction: direction.toString() });
        setShowChest(true);

        // Set a timer to disable the chest after 5 seconds
        setTimeout(() => {
            setShowChest(false);
            setCanShowChest(false);

        }, 15000);
    };

    // Move chest at random positions every 2 seconds
    useEffect(() => {
        if (showChest) {
            const intervalId = setInterval(moveChestRandomly, 1000); // Moves every 2 seconds
            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, [showChest]);


    const handleCloseOverlay = async () => {
        const today = new Date().toISOString().split('T')[0];
        const lastClaimDate = localStorage.getItem('lastClaimDate');

        // Check if the user has already claimed today
        if (lastClaimDate === today) {
            alert("You have already claimed the chest today.");
            return; // Exit if the user has already claimed today
        }

        const minAmount = 1000;   // Minimum coin amount
        const maxAmount = 50000;  // Maximum coin amount
        const generatedCoinAmount = getRandomCoinAmount(minAmount, maxAmount); // 
        setRandomCoinAmount(generatedCoinAmount); // Set the random coin amount to state


        setShowOverlay(false);
        setShowChest(false);
        // Optional: Hide the chest once the overlay is closed
        setHasClaimed(true);
        // Set hasClaimed to true, so the chest won't show again
        if (!claimed) {
            if (!userId) {
                console.error("User ID is null. Transaction cannot be processed.");
                return;
            }

            try {
                // Attempt to add the claim transaction
                const response = await addClaimRandomTransaction(userId, generatedCoinAmount);
                console.log("Transaction Response:", response); // Log response for debugging

                // Update the user's balance if the transaction was successful
                setUserBalance((prevBalance: number) => prevBalance + generatedCoinAmount);
                setClaimed(true); // Mark the chest as claimed


                localStorage.setItem('lastClaimDate', today);
            } catch (error) {
                console.error("Error adding random claim transactions:", error); // Log any error
            }
        }

    };

    // Check whether the chest should be displayed at any point (for example, when loading the page)
    useEffect(() => {
        if (hasClaimedToday()) {
            // If the user has claimed today, prevent the chest from showing
            setShowChest(false);
            setHasClaimed(true);
        }
    }, []);


    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isEnergyOverlayVisible, setIsEnergyOverlayVisible] = useState(false);

    const handleEnergyBoostClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEnergyOverlayVisible(true);
    };

    const closeEnergyBoostOverlay = () => {
        setIsEnergyOverlayVisible(false);
    };


    // const handleBoostClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    //     setOverlayVisible(true);
    // };

    const closeOverlay = () => {
        setOverlayVisible(false);
    };

    const [isDailyOverlayVisible, setIsDailyOverlayVisible] = useState(false);

    const handleDailyBonusClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDailyOverlayVisible(true);
    };

    const closeDailyOverlay = () => {
        setIsDailyOverlayVisible(false);
    };

    const handlegoToInvite = (e: React.MouseEvent) => {
        e.stopPropagation();

        router.push('/inviteafriend');
    }











    const [isTapRateOverlayVisible, setIsTapRateOverlayVisible] = useState(false);

    const handleTapRateClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsTapRateOverlayVisible(true);
    };

    const closeTapRateOverlay = () => {
        setIsTapRateOverlayVisible(false);
    };



    return (
        <>
            <div>
                <div className="h-screen">
                    <GameNavbar />
                    <LogStatus />
                    {
                        tapCount == 0 && (
                            <div className="absolute z-50 text-sec" style={{ top: '80%', left: '38%', pointerEvents: 'none' }} >
                                <Image alt='taphere' src={TapHere} width={40} height={40} className=" animate-bounce-up" />
                                Tap here
                            </div>
                        )
                    }
                    <div className="relative overflow-hidden">
                        <div className=" relative w-full bg-cover bg-center overflow-hidden h-screen">
                            <div className="absolute px-1 py-[6px] bg-[#854C348C] w-full ">
                                <div className="flex items-center justify-between">
                                    <Link href="/profile">
                                        <div className="border border-white/40 rounded-md flex items-center justify-start p-1">
                                            <Image
                                                width={35}
                                                height={35}
                                                src={level.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${level.image_url}` : ProfileSvg} // Properly handle fallback
                                                alt="Profile Picture"
                                                className="rounded-full"
                                            />

                                            <div className="flex flex-col justify-center px-[6px]">
                                                <h1 className="text-[10px] w-full truncate text-white font-semibold leading-tight">{username ? username.toUpperCase() : "Name"}</h1>
                                                <div className="items-center">
                                                    <div className="flex items-center">
                                                        <Image
                                                            width={15}
                                                            height={15}
                                                            src={Prize}
                                                            alt="Prize Icon"
                                                        />
                                                        <p className="text-[8px] font-semibold text-white leading-tight max-w-">
                                                            Level <span className="text-white/70">{level.level}</span>
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/boosttapratewithcoin">
                                        <div className="flex items-center justify-center max-w-[116px] border-[1px] px-1 rounded-[8px]  border-[#00A6DE7A]">
                                            <Image
                                                width={20}
                                                height={20}
                                                src={golddollarcoin}
                                                alt="Gold Dollar Coin"
                                                className="flex-shrink-0"
                                            />
                                            <h1 className="leading-[40.28px] text-[12px] font-bold text-white">{userBalance ? userBalance : 0}</h1>
                                        </div>
                                    </Link>
                                    <div className="bg-[#1A314E] rounded-[25.71px] px-[6px] py-[4px] flex items-center">

                                        <Link href="/tasklist">
                                            <div className="mr-[5px]">
                                                <Image src={XAS} alt="XAS Icon" className="flex-shrink-0" />
                                            </div>
                                        </Link>

                                        <div className="border-r-[1px] border-r-[#FFFFFF8C] h-[16px]"></div>

                                        <div className="flex flex-col items-center justify-center px-[5px]">
                                            {/* <p className="text-[8px] leading-[12px] font-medium text-[#FFFFFFBF] text-center whitespace-nowrap">Pirate Token</p> */}
                                            <div className="flex items-center">
                                                <Image width={12.34} height={12.34} src={golddollarcoin} alt="Gold Dollar Coin" />
                                                <h1 className="text-[8.34px] p-2 font-bold leading-[16.46px] text-white">+{abbreviateNumber(userBalance)}</h1>

                                                <div>
                                                    {/* <div >
                                                        <Image width={20} height={20} src={Info} alt="Info Icon" />
                                                    </div> */}

                                                    {isOverlayVisible && (
                                                        <div className="fixed bg-[#000000A6] inset-0 flex items-center justify-center z-50" onClick={closeOverlay}>
                                                            <div className="bg-gradient-to-b from-black  to-brown-dark  border-t-[4px] border-t-[#6B4C2D] rounded-lg w-full mt-60 h-[80%] flex flex-col items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                                                                <Image src={treasureChest} alt="treasureChest" className="-mt-24" />
                                                                <h2 className="text-[24px] leading-[32px] font-semibold text-white">TREASURE CHEST</h2>
                                                                <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white mt-3">Purchase Chest to get random amount of coins</p>
                                                                <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">From <strong>10k</strong> to <strong>10M</strong> coins!</p>

                                                                <Link href="/boosttreasurechest">
                                                                    <div className="pt-10">
                                                                        <button className="w-[365px] h-[48px] rounded-[16px] bg-[#00A6DE] text-center text-white text-[16px] leading-[16px] font-semibold">
                                                                            PURCHASE
                                                                        </button>
                                                                    </div>
                                                                </Link>


                                                                <button onClick={closeOverlay} className="absolute top-2 right-2">
                                                                    <Image src={Cross} alt="CrossImg" />
                                                                </button>
                                                            </div>

                                                        </div>
                                                    )}

                                                </div>


                                            </div>
                                        </div>

                                        <div className="border-r-[1px] pl-[1px]  border-r-[#FFFFFF8C] h-[16px]"></div>

                                        <div className="pl-[5px]">
                                            <Link href="/gamesettings">
                                                <div >
                                                    <Image width={20} height={20} src={settings} alt="Settings Icon" className="flex-shrink-0" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-screen">
                                {/* Full-screen image to tap on */}
                                <Image
                                    className="w-full h-screen object-cover overflow-hidden"
                                    src={piratehomeBg}
                                    alt="piratehomeBg"
                                    onClick={handleTap}
                                />

                                {/* Flying chest appears and moves after 50 taps */}
                                {showChest && (
                                    <div
                                        className={`fixed z-50 flying-chest-animation ${chestPosition.direction === "0" || chestPosition.direction === "1" ? 'horizontal' : 'vertical'}`}
                                        style={{ top: chestPosition.top, left: chestPosition.left }} // Dynamic position
                                        onClick={() => setShowOverlay(true)}
                                    >
                                        <Image
                                            className="rounded-[8px]"
                                            width={65}
                                            height={65}
                                            src={flyingchest}
                                            alt="flying chest"
                                        />
                                    </div>
                                )}

                                {/* Overlay for congratulatory message */}
                                {showOverlay && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-8 rounded-md text-center relative w-[90%] max-w-lg">
                                            {/* Close button */}
                                            <button className="absolute top-4 right-4 text-black" onClick={handleCloseOverlay}>
                                                <Image src={Cross} alt="Cross" />
                                            </button>

                                            {/* Chest image */}
                                            <Image className="mx-auto rounded-[20px]" width={130} height={130} src={flyingchest} alt="Chest" />

                                            {/* Congratulations message */}
                                            <h2 className="text-xl font-bold mt-4">Congratulations Mate!</h2>
                                            <p className="text-lg mt-2">You won</p>

                                            {/* Coins image */}
                                            <div className="flex items-center justify-center mx-auto pt-[8px] gap-[3px]">
                                                <Image width={20} height={20} src={golddollarcoin} alt="Coins" />
                                                <p className="text-[16px] font-semibold">{randomCoinAmount !== null ? randomCoinAmount : 2000}</p>
                                            </div>

                                            {/* Claim button */}
                                            <button className="mt-6 px-10 py-2 font-semibold bg-green-500 text-white rounded" onClick={handleCloseOverlay}>
                                                Claim
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <style jsx>{`
                                .flying-chest-animation {
                                position: fixed;
                                transition: transform 2s ease-in-out, top 2s ease-in-out, left 2s ease-in-out;
                                }

                                .horizontal {
                                animation: moveHorizontally 5s linear infinite;
                                }

                                .vertical {
                                animation: moveVertically 5s linear infinite;
                                }

                                @keyframes moveHorizontally {
                                0% {
                                    transform: translateX(0);
                                }
                                100% {
                                    transform: translateX(-100vw);
                                }
                                }

                                @keyframes moveVertically {
                                0% {
                                    transform: translateY(0);
                                }
                                100% {
                                    transform: translateY(-100vh);
                                }
                                }
                            `}</style>
                            </div>
                        </div>

                        <div>
                            <div className="absolute top-[54px] left-[180px]" onClick={handleDailyBonusClick}>
                                <div className="flex flex-col items-center justify-center bg-white border-[1px] border-[#B30202] p-[5.06px] gap-y-[0.63px] rounded-[7.59px] ">
                                    <Image src={GiftBox} alt="GiftBoxImg" />
                                    <h2 className="text-[7.59px] leading-[9.49px] text-[#1A314E] whitespace-nowrap">Daily Rewards</h2>
                                    <p className="font-bold leading-[15.19px] text-[7.65px] tracking-[0.15%]">{userDailyRewardInfo ? timeLeft : "0s"}</p>
                                </div>
                            </div>
                            <DailyBonuses
                                isDailyOverlayVisible={isDailyOverlayVisible}
                                // handleDailyBonusClick={handleDailyBonusClick}
                                closeDailyOverlay={closeDailyOverlay}
                            />

                        </div>




                        <div className="absolute top-28 -right-40 " onClick={handleTap}>
                            <div className="relative">
                                <div className="fadeImageContainer">
                                    <Image width={289} height={273} src={Island} alt="Island" />
                                </div>
                                {/* <Link href="/inviteafriend"> */}
                                <div className="absolute top-[0px] left-[70px] " onClick={handlegoToInvite}>
                                    <div className="bg-[#1A314E] flex flex-col items-center justify-center border-[4px] border-[#FFFFFF0D] w-[40.19px] h-[40.19px] rounded-[30px]">
                                        <Image src={Users} alt="Users" width={25} height={25} />
                                    </div>
                                    <h1 className="text-[12.47px] leading-[18.7px] font-bold text-white text-center">Invite</h1>
                                </div>
                                {/* </Link> */}

                            </div>
                            <style jsx>{`
                                 .fadeImageContainer {
                                    position: relative;
                                    display: inline-block;
                                    width: 289px;
                                    height: 273px;
                                    // background-color: #64C7EF; /* The color to blend the image edges into */
                                    border-radius: 50%; /* Optional: Make the fade more circular */
                                  }
                
                                  .fadeImageContainer :global(img) {
                                    mask-image: radial-gradient(
                                      circle,
                                      rgba(255, 255, 255, 1) 100%, /* Full opacity at the center */
                                      rgba(255, 255, 255, 0) 0% /* Transparent at the edges */
                                    );
                                    -webkit-mask-image: radial-gradient(
                                      circle,
                                      rgba(255, 255, 255, 1) 50%,
                                      rgba(255, 255, 255, 0) 75%
                                    );
                                }
                            `}</style>

                        </div>
                        <div className="absolute top-36 -left-10" onClick={handleTap}>
                            <Image src={boatHome} alt="boatHome" />
                        </div>

                        {/* <div className="absolute top-32 left-36">
                            <Image className="rounded-[8px]" width={65} height={65} src={flyingchest} alt="flyingchest" />
                        </div> */}


                        {/* <div onClick={handleBoostClick} className="absolute animate-bounce-up" style={{ top: '25%', left: '20%' }}>
                            <Image src={TaskForHunt} alt="TaskForHunt" />
                        </div> */}

                        <div>
                            <div className="absolute animate-bounce-up" style={{ top: '30%', left: '7%' }} onClick={handleTapRateClick}>
                                <div className="tapcoin-animation">
                                    <Image src={TapCoin} alt="TapCoin" className="gap-[50px]" />
                                </div>
                            </div>
                            {coins.map((coin) => (
                                <div
                                    key={coin.id}
                                    className="absolute coin-animation text-white flex"
                                    style={{
                                        animationDuration: '2s',
                                        top: `${coin.y}px`,
                                        left: `${coin.x}px`,
                                    }} // Position the coin at the click position
                                >
                                    +{user_tap_rate_level}
                                    <Image src={Coinfromtap} alt="Coinfromtap" />
                                </div>
                            ))}
                        </div>
                        <Link href="/profile">
                            <div className="absolute" style={{ bottom: '5%', left: '10%' }}>
                                <div className="flex items-center  p-[10.38px] bg-[#1A314E] border-[3.24px] border-white max-w-[165.97px] h-[51.9px] rounded-[20.76px] gap-[2px]">
                                    <div>
                                        <Image width={35.68} height={51.9} src={Prize} alt="PrizeSvg" />
                                    </div>

                                    <h1 className="text-[10.76px] leading-[31.14px] font-semibold text-white">{userRank.rank}<span className="text-[8.57px] leading-[23.36px] font-semibold text-[#FFFFFFA6]"> / {userRank.total_users}</span></h1>
                                </div>
                            </div>
                        </Link>
                        {/* <div className="w-[200.31px] h-[5.57px] absolute top-[675px] left-[105.6px]">
                            <ProgressBar  progress={60} />
                        </div> */}
                        {/* Boost */}
                        <div className="absolute" style={{ bottom: '5%', right: '10%' }} onClick={handleEnergyBoostClick}>
                            <div className="bg-[#1A314E] px-[7.75px] max-w-[133.47px] h-[51px] flex items-center gap-[5px] border-[2.8px] border-[#FFFFFF] rounded-[20.87px] ">
                                <div>
                                    <Image src={lightning} alt="lightning" />
                                </div>
                                <h1 className="text-[10.87px] leading-[25.02px] font-semibold text-white">{(energyLevel && energyLevel.toFixed(0)) ? energyLevel.toFixed(0) : 0}<span className="text-[8.51px] leading-[18.77px] text-[#FFFFFFA6]"> / {ENERGY_CAPACITY_VALUE}</span></h1>
                            </div>
                            {isEnergyOverlayVisible && (
                                <div className="fixed inset-0 bg-[#000000A6]  flex items-center justify-center z-50" onClick={closeEnergyBoostOverlay}>
                                    <div className="bg-gradient-to-b from-black  to-brown-dark  border-t-[4px] border-t-[#6B4C2D] rounded-lg w-full mt-60 h-[570px] flex flex-col items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                                        <Image width={100} height={100} src={BigLightning} alt=" BigLightning" className="-mt-52" />
                                        <h2 className="pt-10 text-[24px] leading-[32px] font-semibold text-white">ENERGY BOOST</h2>
                                        <p className="pt-[2px] text-[14px] leading-[16px] tracking-[0.4px] text-center text-white my-3"><strong>Level up</strong> to increase your energy capacity</p>
                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">Your energy capacity: <strong>{ENERGY_CAPACITY_VALUE}</strong></p>
                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">Level <strong>{level.level}</strong> </p>





                                        <button onClick={closeEnergyBoostOverlay} className="absolute top-2 right-2">
                                            <Image src={Cross} alt="CrossImg" />
                                        </button>
                                    </div>

                                </div>
                            )}

                            {isTapRateOverlayVisible && (
                                <div className="fixed inset-0 bg-[#000000A6]  flex items-center justify-center z-50" onClick={closeTapRateOverlay}>
                                    <div className="bg-gradient-to-b from-black  to-brown-dark  border-t-[4px] border-t-[#6B4C2D] rounded-lg w-full mt-60 h-[570px] flex flex-col items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                                        <Image width={250} height={250} src={ShiningCoin} alt=" BigLightning" className="-mt-52" style={{ marginLeft: '1rem' }} />
                                        <h2 className="text-[24px] leading-[32px] font-semibold text-white">BOOST TAP RATE</h2>

                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">Your tap rate: <strong>{user_tap_rate_level}</strong>
                                            <span className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">&nbsp; &nbsp;Level <strong>{level.level}</strong> </span></p>
                                        <p className="pt-[2px] text-[14px] leading-[16px] tracking-[0.4px] text-center text-white mb-3"><>Level up</> to increase your tap rate</p>

                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal mt-4">OR</p>
                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal mb-4">Purchase boost to get up to <strong>10 000</strong>  <strong></strong> coins per tap for 15 Seconds!</p>




                                        <Link href="/boosttapratewithcoin">
                                            <div className="pt-10 -mb-[25px]">
                                                <button className="w-[365px] h-[48px] rounded-[16px] bg-[#00A6DE] text-center text-white text-[16px] leading-[16px] font-semibold">
                                                    BOOST
                                                </button>
                                            </div>
                                        </Link>


                                        <button onClick={closeTapRateOverlay} className="absolute top-2 right-2">
                                            <Image src={Cross} alt="CrossImg" />
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Hidden Audio Element */}
                {/* <audio ref={audioRef} loop hidden>
                    <source src="/Wave%20Crashing%20On%20Rocks,%20Swirl,%20Distant,%20Continuous%20Roar.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio> */}
            </div>




        </>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setIsMusicOn(arg0: boolean) {
    throw new Error("Function not implemented.");
}

