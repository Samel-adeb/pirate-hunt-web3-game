import { FC, useState } from 'react';
import Cross from "/public/assets/Cross.svg";
import GiftBox from "/public/assets/bluegiftboxb.png";
import standingdollarcoin from "/public/assets/standingdollarcoin.svg";
import Image from "next/image";
//import Link from 'next/link';
import ClaimReward from "@/app/components/ClaimRewardd";
import { claimDailyBonus, getDailyRewardInfo } from '@/scripts';
import { useAppContext } from '@/context';
interface OverlayProps {
  isVisible: boolean;
  currentDayBonus: {
    id: number;
    name: string;
    amount: string;
  };
  closeOverlay: () => void;
  load: () => void;
}

const DayOneOverlay: FC<OverlayProps> = ({ isVisible, currentDayBonus, closeOverlay, load }) => {

  const [showClaimSuccess, setShowClaimSuccess] = useState(false);
  const { userId, userBalance, setUserBalance, setUserDailyRewardInfo } = useAppContext();

  const handleClaim = async () => {

    const isSuccessful = await claimDailyBonus(userId, currentDayBonus.id)


    setShowClaimSuccess(isSuccessful);
    load();
    await getDailyRewardInfo(userId, setUserDailyRewardInfo);
    if (isSuccessful) {
      setUserBalance(parseInt(userBalance) + parseInt(currentDayBonus.amount));
    }

    setTimeout(() => {
      setShowClaimSuccess(false);
      closeOverlay();
    }, 3000);



  }
  if (!isVisible) return null; // Do not render if overlay is not visible
  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeOverlay}
    >
      {
        showClaimSuccess && (<ClaimReward setShowClaimSuccess={setShowClaimSuccess} />)
      }
      <div
        className="bg-[#000000] border-t-[#00A6DE] border-t-[4px] flex flex-col h-[100%] items-center justify-center m-1 mt-60 my-[190px] p-4 relative rounded-[24.12px] w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing the overlay when clicking inside
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Image className="w-[82.1px]" src={GiftBox} alt="GiftBox" />

          <h1 className="text-white font-bold text-[16px] leading-[44px]">Daily Reward</h1>
          <p className="text-[12px] leading-[16px] font-normal text-[#FFFFFFD9]">One of the ways to increase your coin daily</p>

          <div className="pt-10 w-full">
            <div className="bg-[#00A6DE] border-[#FFC247] border-[2.8px] flex flex-col items-center justify-center p-3 rounded-[8px] w-full">
              <h1 className="text-[20px] leading-[48.24px] tracking-[1.21px] font-medium text-white mb-3">{currentDayBonus.name ?? "Day"}</h1>

              <Image width={57.31} height={57.31} src={standingdollarcoin} alt="standingdollarcoin" />

              <h2 className="text-[30.21px] leading-[48.24px] tracking-[1.21px] text-white font-bold">{currentDayBonus.amount ?? 0}</h2>
            </div>
          </div>


          <div className="pt-6" onClick={handleClaim}>
            <button className="bg-[#00A6DE] font-medium p-[16px] rounded-[50px] text-[20.57px] text-white w-[153.76px]">
              Claim
            </button>
          </div>

        </div>

        <button onClick={closeOverlay} className="absolute top-2 right-2">
          <Image src={Cross} alt="CrossImg" />
        </button>
      </div>


    </div>
  );
};

export default DayOneOverlay;
