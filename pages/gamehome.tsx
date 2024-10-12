import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";
import Link from 'next/link';
import "../app/globals.css";
// import  ProgressBar  from '@/app/components/ProgressBar';
import piratehomeBg from "../public/assets/piratehomeBg.png";
import Island from "../public/assets/Island.svg";
import boatHome from "../public/assets/boatHome.svg";
import flyingchest from "../public/assets/flyingchest.webp";
import Users from "../public/assets/Users.png";
import TaskForHunt from "../public/assets/Task for hunt.svg";
import TapCoin from "../public/assets/TapCoin.svg";
import ProfileSvg from "../public/assets/ProfileSvg.svg";
import Prize from "../public/assets/Prize.svg";
import golddollarcoin from "../public/assets/golddollarcoin.svg";
import XAS from "../public/assets/XAS.svg";
import Info from "../public/assets/Info.svg";
import settings from "../public/assets/setting.png";
import lightning from "../public/assets/lightning.svg";
import treasureChest from "../public/assets/treasure chest.svg";
import Cross from "../public/assets/Cross.svg";
import GiftBox from "../public/assets/gift box.png";
// import BigGiftBox from "../public/assets/GiftBox.png";
import BigLightning from "../public/assets/BigLightning.svg";
// import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
import Coinfromtap from "../public/assets/Coinfromtap.svg";
import { useEffect, useRef } from 'react';
import { useAppContext } from '@/context';
import { useState } from "react";
// import DayOneOverlay from "@/app/components/DayOneOverlay";
import { addTapTransaction } from "@/scripts";
import DailyBonuses from "@/app/components/DailyBonuses";
import { useRouter } from "next/router";

// import ProgressBar from "@/app/components/ProgressBar";


export default function GameHome() {

    const { userId, username, level, userBalance, setUserBalance, userRank, userDailyRewardInfo, user_tap_rate_level } = useAppContext();
    const [energyLevel, setEnergyLevel] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ENERGY_CAPACITY_VALUE = 1000; // Maximum energy capacity
    const [timeLeft, setTimeLeft] = useState<string>('');
    const targetDate = userDailyRewardInfo ? new Date(userDailyRewardInfo.next_claim_time).getTime() : new Date();
    const [_, setTapCount] = useState(0);
    // const [chestMoving, setChestMoving] = useState(false);
    const [showChest, setShowChest] = useState(false);
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


    // Automatically start playing the background music
    useEffect(() => {
        // Play background music automatically when the component mounts
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // Adjust volume (0.0 to 1.0)
            audioRef.current.play().catch((err) => {
                console.error('Failed to play audio:', err);
            });
        }

        // Retrieve energy level from local storage or set it to maximum
        const storedEnergy = parseInt(localStorage.getItem('energy') || '') || ENERGY_CAPACITY_VALUE;
        setEnergyLevel(storedEnergy);

        // Countdown logic
        const interval = setInterval(() => {
            const now = new Date().getTime(); // Current time
            const difference = targetDate.valueOf() - now; // Difference in milliseconds

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
            localStorage.setItem('energy', newEnergyLevel.toString()); // Store updated energy in local storage
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
        const abbrev = ["", "K", "M", "B", "T"]; // Array of suffixes
        let i = 0;

        // Loop to divide the number and move to higher suffixes
        while (number >= 1000 && i < abbrev.length - 1) {
            number /= 1000;
            i++;
        }

        // Round to one decimal place and add the suffix
        return number.toFixed(1).replace(/\.0$/, '') + abbrev[i];
    }



    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (navigator.vibrate) {
            navigator.vibrate(100);  // 200ms vibration
        }

        // Get the click position relative to the page
        const x = e.clientX;
        const y = e.clientY;

        setTapCount((prevCount) => {
            const newCount = prevCount + 1;
      
            if (newCount >= 50) {
              setShowChest(true);
            }
      
            return newCount;
        });
        


        if (energyLevel > user_tap_rate_level && !(user_tap_rate_level > 1)) {
            // Create a new coin element by pushing a unique ID and the position
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

        } else if (user_tap_rate_level > 1) {
            // Create a new coin element by pushing a unique ID and the position
            const newCoinId = Date.now();
            setCoins((prevCoins) => [...prevCoins, { id: newCoinId, x, y }]);

            // Remove the coin after 2 seconds
            setTimeout(() => {
                setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== newCoinId));
            }, 2000);

            console.log(user_tap_rate_level);

            setUserBalance(parseInt(userBalance) + parseInt(user_tap_rate_level));
            setTempbal(tempbal + parseInt(user_tap_rate_level));
            localStorage.setItem('tempbal', (tempbal + parseInt(user_tap_rate_level)).toString());
        }
    };

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isEnergyOverlayVisible, setIsEnergyOverlayVisible] = useState(false);

    const handleEnergyBoostClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEnergyOverlayVisible(true);
    };

    const closeEnergyBoostOverlay = () => {
        setIsEnergyOverlayVisible(false);
    };


    const handleBoostClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOverlayVisible(true);
    };

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

    const handlegoToInvite = (e: React.MouseEvent) =>{
        e.stopPropagation();
        
        router.push('/inviteafriend');
    }


    return (
        <>
            <div>
                <div className="h-screen">
                    <GameNavbar />
                    <div className="relative overflow-hidden">
                        <div className=" relative w-full bg-cover bg-center overflow-hidden h-screen">
                            <div className="absolute px-[14px] py-[6px] bg-[#854C348C] w-full ">
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
                                                <h1 className="text-[10px] text-white font-semibold leading-tight">{username ? username.toUpperCase() : "Name"}</h1>
                                                <div className="items-center  whitespace-nowrap">
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
                                    <Link href="/boosttreasurechest">
                                        <div className="flex items-center justify-center max-w-[116px] border-[1px] px-[16px] rounded-[8px]  border-[#00A6DE7A]">
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
                                                    <div >
                                                        <Image width={20} height={20} src={Info} alt="Info Icon" />
                                                    </div>

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
                        <div className=" w-full h-screen">
                            {/* Full-screen image to tap on */}
                            <Image
                                className="w-full h-screen object-cover overflow-hidden"
                                src={piratehomeBg}
                                alt="piratehomeBg"
                                onClick={handleTap}
                            />

                            {/* Flying chest appears and moves after 50 taps */}
                            {showChest && (
                                <div className="fixed top-32 left-0 flying-chest-animation">
                                <Image
                                    className="rounded-[8px]"
                                    width={65}
                                    height={65}
                                    src={flyingchest}
                                    alt="flying chest"
                                />
                                </div>
                            )}

                            <style jsx>{`
                                .flying-chest-animation {
                                animation: moveAroundScreen 5s infinite linear;
                                }

                                @keyframes moveAroundScreen {
                                0% {
                                    transform: translate(0, 0);
                                }
                                25% {
                                    transform: translate(300px, -100px);
                                }
                                50% {
                                    transform: translate(600px, 200px);
                                }
                                75% {
                                    transform: translate(900px, -50px);
                                }
                                100% {
                                    transform: translate(1200px, 0);
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


                        <div onClick={handleBoostClick} className="absolute animate-bounce-up" style={{top:'25%', left:'20%'}}>
                            <Image src={TaskForHunt} alt="TaskForHunt" />
                        </div>

                        <div>
                            <div className="absolute animate-bounce-up" style={{top:'30%', left:'7%'}} onClick={handleEnergyBoostClick}>
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
                        <div className="absolute" style={{ bottom: '5%', right: '10%' }} >
                            <div className="bg-[#1A314E] px-[7.75px] max-w-[133.47px] h-[51px] flex items-center gap-[5px] border-[2.8px] border-[#FFFFFF] rounded-[20.87px] ">
                                <div>
                                    <Image src={lightning} alt="lightning" />
                                </div>
                                <h1 className="text-[10.87px] leading-[25.02px] font-semibold text-white">{energyLevel.toFixed(0)}<span className="text-[8.51px] leading-[18.77px] text-[#FFFFFFA6]"> / {ENERGY_CAPACITY_VALUE}</span></h1>
                            </div>
                            {isEnergyOverlayVisible && (
                                <div className="fixed inset-0 bg-[#000000A6]  flex items-center justify-center z-50" onClick={closeEnergyBoostOverlay}>
                                    <div className="bg-gradient-to-b from-black  to-brown-dark  border-t-[4px] border-t-[#6B4C2D] rounded-lg w-full mt-60 h-[570px] flex flex-col items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                                        <Image width={100} height={100} src={BigLightning} alt=" BigLightning" className="-mt-52" />
                                        <h2 className="pt-10 text-[24px] leading-[32px] font-semibold text-white">BOOST TAP RATE</h2>
                                        <p className="pt-[2px] text-[12px] leading-[16px] tracking-[0.4px] text-center text-white mt-3">Purchase treasure to get random tap rate</p>
                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-center text-white pt-[10px] font-normal">From <strong>10</strong> to <strong>3k</strong> coins per tap!</p>


                                        <Link href="/boosttaprate">
                                            <div className="pt-10 -mb-[25px]">
                                                <button className="w-[365px] h-[48px] rounded-[16px] bg-[#00A6DE] text-center text-white text-[16px] leading-[16px] font-semibold">
                                                    PURCHASE
                                                </button>
                                            </div>
                                        </Link>


                                        <button onClick={closeEnergyBoostOverlay} className="absolute top-2 right-2">
                                            <Image src={Cross} alt="CrossImg" />
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Hidden Audio Element */}
                <audio ref={audioRef} loop hidden>
                    <source src="/Wave%20Crashing%20On%20Rocks,%20Swirl,%20Distant,%20Continuous%20Roar.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>




        </>
    )
}

