import { useEffect, useState, useRef } from 'react';
import { GameNavbar } from "@/app/components/GameNavbar";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import "../app/globals.css";
import ProfileSvg from "../public/assets/ProfileSvg.svg";
import Prize from "../public/assets/Prize.svg";
import golddollarcoin from "../public/assets/golddollarcoin.svg";
import baby from "../public/assets/baby.svg";
import ProgressBar from "@/app/components/ProgressBar";
import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
import ShareButton from "../public/assets/ShareButton.svg";

import brownCross from "../public/assets/brownCross.svg";
import Insta from "../public/assets/whatsapp.png";
import Telegrame from "../public/assets/Telegrame.svg";
import Cross from "../public/assets/Cross.svg";
import Tweet from "../public/assets/Tweet.svg";
import { useAppContext } from '@/context';
import { getInviteLink, getTreasurePurchaseHistory, getUserInvivites } from '@/scripts';
import html2canvas from 'html2canvas';
import { showInfoMessage } from '@/scripts/utils';


export default function ProfileShare() {
    const { userId, username, userInfo, level, userBalance, userInvites, inviteLink, setInviteLink, setUserInvites, treasurePurchaseHistory, setTreasurePurchaseHistory } = useAppContext();
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const router = useRouter();


    const load = async () => {
        await getUserInvivites(userId, setUserInvites);
        await getInviteLink(userId, setInviteLink);
        await getTreasurePurchaseHistory(userId, setTreasurePurchaseHistory);

    }
    useEffect(() => {
        if (userId) {
            load();
        }

    }, []);
    const handleShareClick = () => {
        setOverlayVisible(true);
    };

    const closeOverlay = () => {
        setOverlayVisible(false);
    };
    const convertToDays = (dateString: string) => {
        const givenDate = new Date(dateString); // Convert string to Date object
        const currentDate = new Date(); // Get the current date

        // Calculate the difference in milliseconds
        const differenceInMs = currentDate.getTime() - givenDate.getTime();

        // Convert milliseconds to days
        const daysDifference = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

        return daysDifference;
    }


    // Reference to the container you want to capture, with correct TypeScript type
    const shareSectionRef = useRef<HTMLDivElement | null>(null);

    // Scroll to and capture the element
    const scrollToAndCapture = async () => {
        if (!shareSectionRef.current) return; // Ensure the ref is not null

        // Scroll to the element
        shareSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add a slight delay to apply the offset after centering

        window.scrollBy(0, 50); // Adjust '20' to whatever extra offset you need


        // Delay a bit to allow scroll positioning
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(shareSectionRef.current);
        return canvas.toDataURL('image/png');
    };
    // Function to handle sharing
    const handleShare = async () => {
        // Optional: close any overlays if needed
        closeOverlay();

        // Capture the section and get the image URL
        const imageUrl = await scrollToAndCapture();
        if (imageUrl && window.Telegram?.WebApp) {
            // Define optional parameters
            const params = {
                text: "Check out my Pirate Hunt score!", // Caption for the story
                widget_link: {
                    url: "http://t.me/Pirate_FunBot/Pirate", // Link back to the game
                    text: "Play Pirate Hunt"
                }
            };

            interface CustomError extends Error {
                message: string;
            }
            try {
                // Share to Telegram story
                window.Telegram.WebApp.shareToStory(imageUrl, params);
            } catch (e) {
                const error = e as CustomError;
                showInfoMessage(error.message);
                console.log(error);

            }
        } else {
            console.error("Telegram WebApp is not available or image capture failed.");
        }
    };
    // Define sharing functions for each platform
    const handleTelegramShare = async () => {
        closeOverlay();


        // const telegramUrl = `https://t.me/share/url?url=`;//${encodeURIComponent(imageUrl)}`;
        const url = encodeURIComponent(inviteLink); // Link to share
        const message = encodeURIComponent('Check out Pirate hunt!');
        window.open(`https://t.me/share/url?url=${url}&text=${message}`, '_blank');



    };

    const handleInstagramShare = async () => {
        closeOverlay();

        // const instagramUrl = `https://www.instagram.com/create/story/?media=${encodeURIComponent(imageUrl)}`;
        // window.open(instagramUrl, '_blank');
        const message = encodeURIComponent('Check out Pirate hunt! \n' + inviteLink);
        window.open(`https://wa.me/?text=${message}`, '_blank');

    };

    const handleTwitterShare = async () => {
        closeOverlay();

        // const twitterUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(imageUrl)}`;
        // window.open(twitterUrl, '_blank');

        const url = encodeURIComponent(inviteLink);
        const message = encodeURIComponent('Check out Pirate hunt!');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${message}`, '_blank');

    };

    return (
        <>

            <GameNavbar />

            <div className="relative h-[100vh + 200px]"
                id="shareSection"
                ref={shareSectionRef}
                style={{
                    background: 'linear-gradient(180deg, #201101 0%, #472402 100%)',
                }}>
                <div className="px-[16px] flex items-center gap-[50px]">
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

                    <div className="flex flex-col items-left">
                        {/* <h1 className="text-[12px] leading-[32px] text-[#FFFFFF]">Coin</h1> */}
                        <div className="flex gap-[2px] items-center -mt-[7px]">
                            <Image
                                width={20}
                                height={20}
                                src={golddollarcoin}
                                alt="Gold Dollar Coin"
                                className="flex-shrink-0"
                            />
                            <h1 className="text-[16px]  leading-[32px] font-bold text-white">{userBalance ? userBalance : 0}</h1>
                        </div>
                    </div>


                </div>


                <div className="absolute" style={{ cursor: 'pointer', top: '2%', right: '2%', zIndex: 2 }} onClick={() => router.back()}>
                    <Image width={35} height={35} src={Cross} alt="Cross" />
                </div>

                <div>
                    <div className="pl-[16px] pt-[15px]" onClick={handleShareClick}>
                        <div className="flex flex-col items-left">
                            <div className="pl-[10px]">
                                <Image
                                    width={50}
                                    height={50}
                                    src={level.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${level.image_url}` : ShareButton} alt="ShareButton"
                                    className="rounded-full" />
                            </div>
                            <p className="text-[16px] leading-[32px] font-bold text-white">Share story</p>
                        </div>
                    </div>

                    {isOverlayVisible && (
                        <div
                            className="fixed inset-0 z-50 flex flex-col justify-end"
                            style={{ backdropFilter: 'blur(15px)' }} // Blur effect for the entire page
                            onClick={closeOverlay} // Clicking the overlay outside the bottom content will close it
                        >
                            {/* Bottom Content with Background */}
                            <div
                                className="bg-[#1C1208] relative h-[370px] text-white w-full py-8 px-6 rounded-t-lg"
                                onClick={(e) => e.stopPropagation()} // Prevent overlay close when clicking inside
                            >
                                <h1 className="text-center text-[16px] leading-[16px] font-medium tracking-[0.4px]">Share On</h1>

                                <p className="text-center pt-2 text-[12px] leading-[16px] text-[#FFFFFF8C] font-medium tracking-[0.4px]">
                                    You can share to multiple social platforms
                                </p>

                                <div>
                                    <div className="pt-[20px]">
                                        <div
                                            className="px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247] border-[1px] border-[#FFC247]"
                                            onClick={() => handleShare()} // Set platform to telegram on click
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <Image src={Telegrame} alt="Telegrame" width={30} />
                                                <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Telegram Story</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-[20px]">
                                        <div
                                            className="px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247] border-[1px] border-[#FFC247]"
                                            onClick={() => handleTelegramShare()} // Set platform to telegram on click
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <Image src={Telegrame} alt="Telegrame" width={40} />
                                                <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Telegram</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-[5px]">
                                        <div
                                            className="px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247] border-[1px] border-[#FFC247]"
                                            onClick={() => handleInstagramShare()} // Set platform to Instagram on click
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <Image src={Insta} alt="Insta" width={40} />
                                                <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Whatsapp</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-[5px]">
                                        <div
                                            className="px-[16px] py-[12px] rounded-[8px] hover:bg-[#FFC247] border-[1px] border-[#FFC247]"
                                            onClick={() => handleTwitterShare()} // Set platform to Twitter on click
                                        >
                                            <div className="flex items-center gap-[8px]">
                                                <Image src={Tweet} alt="Tweet" width={40} />
                                                <h1 className="tracking-[0.4px] text-[16px] leading-[16px] font-medium">Twitter</h1>
                                            </div>
                                        </div>
                                    </div>



                                </div>



                                <button
                                    onClick={closeOverlay}
                                    className="absolute top-4 right-4 text-white font-bold text-xl"
                                >
                                    <Image src={brownCross} alt="brownCross" />
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                <div className="pt-10 flex flex-col items-center justify-center">
                    <div>
                        <Image width={360} height={237} src={level.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${level.image_url}` : baby} alt="baby" className='w-full ' />
                    </div>

                    <div className="pt-[20px]">
                        <div className=" w-[115px] h-[42px] rounded-[50px] p-[10px] flex flex-col items-center justify-center" style={{
                            background: 'linear-gradient(180deg, rgba(255, 194, 71, 0.09) 0%, rgba(153, 116, 43, 0.09) 100%)',
                        }}>
                            <h1 className="text-[16px] leading-[32px] font-bold text-white">{username ?? "Name"}</h1>
                        </div>
                    </div>


                    <div className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-[2px]">
                                <Image
                                    src={standingdollarcoin} // Replace with the actual image path
                                    width={16}
                                    height={16}
                                    alt="standingdollarcoin"
                                />
                                <p className="text-white text-[12px] leading-[16px] tracking-[0.4px] font-semibold">Coin Balance:</p>
                            </div>
                            <p className="text-[12px] leading-[16px] font-normal text-[#FFFFFF73] tracking-[0.4px]">
                                <span className="font-extrabold text-white">{userBalance ? userBalance : 0}</span> / {level.next_level_threshold ? level.next_level_threshold : 0}
                            </p>
                        </div>
                        <div className="w-[280.32px] h-[0.38px] rounded-full">
                            <ProgressBar progress={userBalance * 100 / level.next_level_threshold} /> {/* Change the progress value as needed */}
                        </div>



                    </div>

                    <div className="pt-[30px] text-center">
                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-[#FFFFFF73] mt-3 mx-1">Increase your coins by engaging in the </p>
                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-[#FFFFFF73]  mx-1">game through tapping.</p>

                        <p className="text-[12px]  leading-[16px] tracking-[0.4px] text-[#FFFFFF73] mt-3 mx-1">Level up your Pirate Token by unlocking </p>
                        <p className="text-[12px]  leading-[16px] tracking-[0.4px] text-[#FFFFFF73]  mx-1">boosts in the Treasure Hunt.</p>

                    </div>
                </div>

                <div className="pt-10 pb-10 flex flex-col justify-center gap-y-[3px] items-center just">
                    <div className="w-[361px] h-[48px] py-[16px] px-[8px] rounded-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Days in game</h1>
                        <p className="text-[12px] leading-[16px] text-white">{convertToDays(userInfo.created_at) ?? 0} days</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] px-[8px] rounded-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Coin Balance</h1>

                        <p className="text-[12px] leading-[16px] text-white">{userBalance}</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] px-[8px] rounded-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Invited Friends</h1>
                        <p className="text-[12px] leading-[16px] text-white">{userInvites.length ?? 0}</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] rounded-[8px] px-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Treasures Purchased</h1>
                        <p className="text-[12px] leading-[16px] text-white">{treasurePurchaseHistory.length ?? 0}</p>
                    </div>

                    <div className="w-[361px] h-[48px] py-[16px] rounded-[8px] px-[8px] border-[1px] border-[#FFFFFF26]  mx-auto flex items-center justify-between">
                        <h1 className="text-[16px] leading-[16px] text-white">Telegram user name</h1>
                        <p className="text-[12px] leading-[16px] text-white">{username}</p>
                    </div>
                </div>
            </div>

        </>
    )
}