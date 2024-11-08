import { useRouter } from 'next/navigation';

import { GameNavbar } from "@/app/components/GameNavbar";
import Image from "next/image";

import "../app/globals.css";

import CaptainDogs from "../public/assets/CaptainDogs.png";
import bluegiftbox from "../public/assets/bluegiftbox.png";
import Dot from "../public/assets/Dot.svg";
import friend1 from "../public/assets/friend1.png";
// import friend2 from "../public/assets/friend2.png";
// import friend3 from "../public/assets/friend3.png";
import standingdollarcoin from "../public/assets/standingdollarcoin.svg";
import FirstPlaceBadge from "../public/assets/FirstPlaceBadge.png";

import Copy from "../public/assets/Copy.svg";
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useAppContext } from "@/context";
import { claimInviteReward, getInviteClaimed, getInviteLink, getUserInvivites } from "@/scripts";
import { useEffect, useState } from "react";
import { showInfoMessage } from "@/scripts/utils";
import BackButton from "../public/assets/backButton.svg";
interface invite {
    id: number,
    coin_balance: number,
    username: string,
    user_id: number,
    level: {
        id: number,
        level_name: string,
        level_reward: number,
        level_threshold: number,
        image_url: string,
        created_at: Date,
        updated_at: Date
    }
}
interface inviteClaimed {
    invitation_id: number;
    reward: number;
    invited_username: string;
}
export default function InviteAFriend() {
    const { userId, userInvites, setUserInvites,userBalance,setUserBalance, inviteLink, setInviteLink, claimedInvites, setClaimedInvites } = useAppContext();
    //console.log(userInvites);
    const [isDisabled, setDisabled] = useState(false);
    const load = async () => {
        await getUserInvivites(userId, setUserInvites);
        await getInviteLink(userId, setInviteLink);
        await getInviteClaimed(userId, setClaimedInvites);
    }
    useEffect(() => {
        if (userId) {
            load();
        }

    }, []);


    const handleCopyInviteLink = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            showInfoMessage('Invite Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }

    }
    const isInviteClaimed = (inviteId: number) => {
        if (claimedInvites) {
            // Find the bonus in the claimedDailyBonuses array
            const result = claimedInvites.find((invite: inviteClaimed) => invite.invitation_id == inviteId);
            // Return true if result exists (bonus is already claimed), otherwise false
            return !!result;
        } else {
            return false;
        }
    }
    const handleClaimInvite = async (inviteId: number) => {
        setDisabled(true);
        const isSuccessful = await claimInviteReward(userId, inviteId);
        load();
        if (isSuccessful) {
            setUserBalance(parseInt(userBalance) + parseInt(isSuccessful.reward_amount));
        }
    }


    const router = useRouter();
    const handleBackClick = () => {
        router.back(); // Go back to the previous page
    };
    return (
        <>

            <GameNavbar />


            <div>
                <div className="relative pb-20" style={{ background: 'linear-gradient(173.23deg, #000000 -5.41%, #171000 36.99%, #150E00 91.05%)', minHeight:'100vh' }}>
                    {/* Image Container */}
                    <div className="relative">
                        <Image src={CaptainDogs} alt="CaptainDogs" />

                        {/* Overlay on Image */}
                        <div className="absolute inset-0 bg-[#000000CF]">
                            <div className="pt-16 flex flex-col items-center justify-center text-center">
                                <h1 className="text-white text-[30.21px] leading-[40.28px] font-semibold">Invite a friend</h1>
                                <p className="text-white text-[15.11px] leading-[20.14px] tracking-[0.5px]">you and your friend will receive a bonuses</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                        <Image src={BackButton} alt="BackButton" />
                    </div>

                    <div className="absolute top-[20px] left-[20px]" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                        <Image src={BackButton} alt="BackButton" />
                    </div>


                    <div className="pt-[16px]">
                        <div className="bg-[#0A0021BF] w-[358px] h-[72px] mx-auto border-[1px] border-[#FFFFFF26] rounded-[8px] flex items-center gap-[15px] p-[16px]">
                            <div>
                                <Image src={bluegiftbox} alt="bluegiftbox" />
                            </div>

                            <div className="flex flex-col gap-y-[10px]">
                                <h1 className="text-[12px] leading-[16px] tracking-[0.4px] text-white font-bold">Invite a friend</h1>
                                <div className="flex items-center gap-[5px]">
                                    <div className="flex items-center gap-[4px]">
                                        <Image src={Dot} alt="Dot" />
                                        <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                    </div>
                                    <p className="text-[12px] leading-[16px] tracking-[0.4px] text-white"><span className="text-[#FFC247] font-medium">+10,000</span> for you and your friend</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-[9px]">
                            <div className="bg-[#0A0021BF] w-[358px] h-[72px] mx-auto border-[1px] border-[#FFFFFF26] rounded-[8px] flex items-center gap-[15px] p-[16px]">
                                <div>
                                    <Image src={bluegiftbox} alt="bluegiftbox" />
                                </div>

                                <div className="flex flex-col gap-y-[10px]">
                                    <h1 className="text-[12px] leading-[16px] tracking-[0.4px] text-white font-bold">Invite a friend with telegram premium</h1>
                                    <div className="flex items-center gap-[5px]">
                                        <div className="flex items-center gap-[4px]">
                                            <Image src={Dot} alt="Dot" />
                                            <Image width={12} height={12} src={standingdollarcoin} alt="standingdollarcoin" />
                                        </div>
                                        <p className="text-[12px] leading-[16px] tracking-[0.4px] text-white"><span className="text-[#FFC247] font-medium">+15,000</span> for you and your friend</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="pt-[30px]">
                        <div className="flex flex-col items-center mt-3">
                            <h1 className="text-lg leading-[16px] tracking-[0.4px] font-bold text-white pl-[16px]">List of your friends ({userInvites ? userInvites.length : 0})</h1>
                        </div>
                        {
                            userInvites ? (
                                userInvites.map((invite: invite) => (
                                    <div className="pt-[9px]" key={invite.id}>
                                        <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                            <div className="flex items-center gap-[10px]">
                                                <Image src={invite.level.image_url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${invite.level.image_url}` : friend1} alt="friend1" width={40} height={40} className="mr-1 rounded-full" />
                                                <div>
                                                    <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">{invite.username ? invite.username : "Name"}</h1>
                                                    <div className="flex items-center gap-[3px]">
                                                        <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                                        <p className="text-[12px] leading-[16px] text-white">{invite.level.level_name ? invite.level.level_name : "Pirate"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-[10px]">
                                                <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                                <p className="text-[12px] leading-[16px] text-white font-semibold">{invite.coin_balance ? invite.coin_balance : 0}</p>
                                            </div>
                                            {
                                                isInviteClaimed(invite.id) ? (
                                                    <button className='bg-[#1A314E] text-[14px] p-1 rounded text-white'>Claimed</button>) :
                                                    !isDisabled ?
                                                    (<button className='bg-[#1A314E] text-[14px] p-1 rounded text-white' onClick={() => handleClaimInvite(invite.id)}>Claim</button>):
                                                    
                                                    (<button className='bg-[#1A314E] text-[14px] p-1 rounded text-white' style={{opacity:0.5}} disabled>Claim</button>)
                                                    
                                            }

                                        </div>
                                    </div>
                                ))
                            )
                                : (<LoadingSpinner />)
                        }


                        {/*
                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend2} alt="friend2" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">Jackson</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Coin collector</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">150k PRT</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend1} alt="friend1" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">Brown</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Pirate lord</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">2M PRT</p>
                                </div>
                            </div>
                        </div>


                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend3} alt="friend3" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">April</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Pirate legendary</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">3M PRT</p>
                                </div>
                            </div>
                        </div>


                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend1} alt="friend1" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">John</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Rookie pirate</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">100k PRT</p>
                                </div>
                            </div>
                        </div>


                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend2} alt="friend2" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">Steve</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Rookie pirate</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">100k PRT</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend1} alt="friend1" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">Felix</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Wealthy pirate</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">1.1M PRT</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-[9px]">
                            <div className=" flex items-center justify-between w-[358px] h-[62px] py-[8px] px-[16px] mx-auto bg-[#080019] border-[1px] border-[#FFFFFF26] rounded-[8px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={friend2} alt="friend2" />
                                    <div>
                                        <h1 className="text-[12px] leading-[24px] tracking-[0.15%] font-semibold text-white">Brain</h1>
                                        <div className="flex items-center gap-[3px]">
                                            <Image src={FirstPlaceBadge} alt="FirstPlaceBadge" />
                                            <p className="text-[12px] leading-[16px] text-white">Treasure master</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[10px]">
                                    <Image width={16} height={16} src={standingdollarcoin} alt="standingdollarcoin" />
                                    <p className="text-[12px] leading-[16px] text-white font-semibold">500k PRT</p>
                                </div>
                            </div>
                        </div>*/}
                    </div>

                    <div className="pt-16 flex items-center gap-[10px] mx-auto w-[358px]">
                        <button className="border-[#FFC247] border-[2.8px] cusor-pointer h-[44px] px-[14px] py-[8px] rounded-[8px] m-1">
                            <div className="flex items-center justify-center gap-[5px] ">
                                {/* <Image src={Friend} alt="Friend" /> */}
                                <h1 className="text-[12px] leading-[16px] text-white font-semibold" style={{ textWrap: 'nowrap', overflow: 'hidden', minWidth:'100%' }}>{inviteLink ? inviteLink : 'https://...'}</h1>

                            </div>
                        </button>

                        <button className=" rounded-[8px]" onClick={handleCopyInviteLink}>
                            <Image style={{ maxWidth: "1000px", color:"white" }} src={Copy} alt="Copy" width={30} height={30}  />
                        </button>
                    </div>

                </div>
            </div>


        </>
    )
}