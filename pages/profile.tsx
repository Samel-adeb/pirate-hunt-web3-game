import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";

import "../app/globals.css";
import ProfileProgressBar from '@/app/components/ProfileProgressBar';
import HandonChest from "../public/assets/HandonChest.png";
import FirstBadge from "../public/assets/FirstBadge.png";
import userProfile from "../public/assets/userProfile.png";
import GoldCup from "../public/assets/GoldCup.png";
// import SilverCup from "../public/assets/SilverCup.png";
// import greenCup from "../public/assets/greenCup.png";
// import ThickGoldCup from "../public/assets/ThickGold.png";
// import friend1 from "../public/assets/friend1.png";
import user1 from "../public/assets/user1.png";
// import user2 from "../public/assets/user2.png";
import AshDot from "../public/assets/AshDot.svg";
// import FirstPlaceBadge from "../public/assets/FirstPlaceBadge.png";
import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
// import pinkBadge from "../public/assets/pinkBadge.png";
// import yellowBadge from "../public/assets/yellowBadge.png";
import Link from "next/link";
import { useAppContext } from "@/context";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useEffect } from "react";
import { getAllRankInfo } from "@/scripts";




export default function Profile() {
    const { username, level, userBalance, userRank,  allRanks, setAllRanks } = useAppContext();

    const getAllRank = async () => {
        await getAllRankInfo(setAllRanks);
        console.log(allRanks);
    }

    useEffect(() => {
        getAllRank();
    }, [])

    return (
        <>

            <GameNavbar />

            <div>
                <div className="relative">
                    {/* Image */}
                    <Image src={level.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${level.image_url}` : HandonChest} width={100} height={100}
                        alt="HandonChest" className="w-full h-full object-cover" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#000000B2]">
                        <div className="flex flex-col items-center justify-center pt-16 gap-y-[8px]">
                            <h6 className="text-[12px] leading-[16px] tracking-[0.4px] font-medium text-white">Your Rank</h6>

                            <div className="flex items-center gap-[10px]">
                                <Image width={35} height={35} src={FirstBadge} alt="FirstBadge" />

                                <h1 className="text-[32.59px] leading-[48.88px] font-semibold text-[#FFFFFF]">{level ? level.current_level : "Pirate"}</h1>
                            </div>

                            <div className="w-[205px] flex flex-col items-center justify-center">
                                <button className="bg-white text-center  p-[10px] rounded-[16px]">
                                    How it works?
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-[5px] left-[16px]">
                        <div className="flex gap-[5px] items-center bg-white p-[6.27px] rounded-[6.27px]">
                            <Image width={27.19} height={27.19} src={level.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${level.image_url}` : userProfile} alt="userProfile" className="rounded-[16px]" />

                            <h1 className="text-[9.31px] text-[#000000] leading-[13.96px] font-semibold">{username ? username : "User"}</h1>
                        </div>
                    </div>



                </div>
                <div className="relative h-[1000px]" style={{
                    background: `linear-gradient(180deg, #A16D45 85%, #3B2819 100%),
                        linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`
                }}>
                    {/* <div className=""
                       
                    >
                       
                    </div> */}
                    {/* Overlay */}


                    <div className="absolute inset-0 bg-[#000000B2] h-[1000px]">
                        <Link href="/profileshare">
                            <div className="absolute -top-[50px] left-[35px] border-[1px] rounded-[16px] border-[#FFFFFF40] p-[16px]" style={{ left: "20%", right: "20%" }}>

                                <ProfileProgressBar progress={userBalance * 100 / level.next_level_threshold} /> {/* Change the progress value as needed */}

                            </div>
                        </Link>

                        <div className="flex flex-col items-center pt-16">
                            <div className="mb-4">
                                <h1 className="text-[16px] leading-[24px] tracking-[0.15%] font-semibold text-white pl-[16px]">Top Users</h1>
                            </div>
                            {
                                allRanks ? (

                                    allRanks.map((user: Object|any) => (
                                        <div className="pt-[6px]" key={user.user_id}> {/* Add a unique key for each mapped element */}
                                            <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                                <div className="flex items-center gap-[10px]">
                                                    <div>
                                                        <Image src={GoldCup} alt="GoldCup" />
                                                    </div>

                                                    <div className="flex items-center gap-[5px]">
                                                        <Image src={user.level_image_url ? process.env.NEXT_PUBLIC_API_URL + user.level_image_url : user1} alt="user" className="rounded-[50px]" width='50' height='50' /> {/* Use user's image or fallback to user1 */}
                                                        <div>
                                                            <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">
                                                                {user.username} {/* Display the user's name */}
                                                            </h1>

                                                            <div className="flex items-center gap-[4px]">
                                                                <Image width={12} height={12} src={FirstBadge} alt="FirstBadge" />
                                                                <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">
                                                                    Lvl {user.level} {/* Display the user's level */}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-[5px]">
                                                        <div className="flex items-center gap-[5px]">
                                                            <Image src={AshDot} alt="AshDot" />
                                                            <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                                        </div>

                                                        <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">
                                                            {user.coin_balance.toLocaleString()} {/* Format the coin balance */}
                                                        </h2>
                                                    </div>
                                                </div>

                                                <div className="w-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                                    <h1 className="text-[12px] leading-[16px] tracking-[0.4px] text-[#FFFFFF] font-semibold">
                                                        {user.rank} {/* Display the rank based on the index */}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                ) : (
                                    <LoadingSpinner />
                                )

                            }


                            <div className="pt-[6px] my-4">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF] mx-auto">
                                    <div className="flex items-center gap-[10px]">
                                        <div>
                                            <Image src={GoldCup} alt="GoldCup" />
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user1} alt="user1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">{username ? username : "Me"}</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image width={12} height={12} src={FirstBadge} alt="FirstBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl {level.level}</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />


                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">{userBalance}</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">{userRank.rank?userRank.rank:''}</h1>
                                    </div>
                                </div>
                            </div>

                            {/*
                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">
                                        <div>
                                            <Image src={SilverCup} alt="SilverCup" />
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={friend1} alt="friend1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Juliet</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image src={yellowBadge} alt="yellowBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 12</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">8,114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">2</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">
                                        <div>
                                            <Image src={greenCup} alt="greenCup" />
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user2} alt="user2" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Jasmine</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image src={pinkBadge} alt="pinkBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 11</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">7,114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">3</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">
                                        <div>
                                            <Image src={SilverCup} alt="SilverCup" />
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user1} alt="user1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Tariq</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image width={12} height={12} src={FirstBadge} alt="FirstBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 10</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">6,114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">4</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">
                                        <div>
                                            <Image src={ThickGoldCup} alt="ThickGoldCup" />
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user1} alt="user1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Kelvin</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image width={12} height={12} src={FirstBadge} alt="FirstBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 9</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">4,114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">5</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user1} alt="user1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Smith</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image width={12} height={12} src={FirstBadge} alt="FirstBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 7</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">2,114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">7</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user1} alt="user1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Janet</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 6</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">1,114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">8</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-[6px]">
                                <div className="flex items-center justify-between bg-[#00000026] w-[358px] h-[78px] rounded-[16px] p-[16px] border-[1px] border-[#FFFFFF26] mx-auto">
                                    <div className="flex items-center gap-[10px]">

                                        <div className="flex items-center gap-[5px]">
                                            <Image src={user1} alt="user1" />

                                            <div>
                                                <h1 className="text-[16px] leading-[24px] font-semibold text-white tracking-[0.15%]">Bryan</h1>

                                                <div className="flex items-center gap-[4px]">
                                                    <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                                    <h2 className="text-[12px] leading-[16px] text-[#FFFFFF]">Lvl 1</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[5px]">
                                            <div className="flex items-center gap-[5px]">
                                                <Image src={AshDot} alt="AshDot" />
                                                <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                            </div>

                                            <h2 className="text-[#FFFFFF8C] text-[12px] leading-[16px] tracking-[0.4px] font-medium">114,230</h2>
                                        </div>
                                    </div>

                                    <div className="W-[26px] flex items-center justify-center h-[27px] p-[10px] bg-[#FFFFFF26] rounded-[50px]">
                                        <h1 className="text-[12px] leading-[16px] tracking-[0.4px]  text-[#FFFFFF] font-semibold">10000+</h1>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>



                </div>

            </div>

        </>
    )
}