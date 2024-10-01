import { FC } from 'react';
import Cross from "/public/assets/Cross.svg";
import GiftBox from "/public/assets/GiftBox.png";
import standingdollarcoin from "/public/assets/standingdollarcoin.svg";
import Image from "next/image";
import Link from 'next/link';
interface OverlayProps {
  isVisible: boolean;
  closeOverlay: () => void;
}

const DayOneOverlay: FC<OverlayProps> = ({ isVisible, closeOverlay }) => {
  if (!isVisible) return null; // Do not render if overlay is not visible

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeOverlay}
    >
      <div
        className="bg-[#000000] border-t-[4px] border-t-[#00A6DE] rounded-lg w-full mt-60 h-[100%] my-[190px] flex flex-col items-center justify-center p-4 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing the overlay when clicking inside
      >
       <div className="flex flex-col items-center justify-center text-center">
            <Image className="" src={GiftBox} alt="GiftBox" />

            <h1 className="text-white font-bold text-[16px] leading-[44px]">Daily Reward</h1>
            <p className="text-[12px] leading-[16px] font-normal text-[#FFFFFFD9]">One of the ways to increase your coin daily</p>

            <div className="pt-10">
                <div className="bg-[#00A6DE] rounded-[24.12px] w-[153.76px] flex flex-col items-center gap-y-[7px] justify-center">
                    <h1 className="text-[36.18px] leading-[48.24px] tracking-[1.21px] font-medium text-white">Day 1</h1>

                    <Image width={57.31} height={57.31} src={standingdollarcoin} alt="standingdollarcoin" />

                    <h2 className="text-[36.18px] leading-[48.24px] tracking-[1.21px] text-white font-bold">500</h2>
                </div>
            </div>

            <Link href="/claimReward">
              <div className="pt-6" onClick={closeOverlay}>
                  <button className="w-[361px] h-[52px] bg-[#00A6DE] p-[16px] rounded-[16px] text-white font-medium">
                      Claim
                  </button>
              </div>
            </Link>
       </div>

        <button onClick={closeOverlay} className="absolute top-2 right-2">
            <Image src={Cross} alt="CrossImg" />
        </button>
      </div>
    </div>
  );
};

export default DayOneOverlay;
