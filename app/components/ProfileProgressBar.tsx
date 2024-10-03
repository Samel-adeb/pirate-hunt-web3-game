import React from 'react';
import Image from "next/image";
import standingdollarcoin from "/public/assets/standingdollarcoin.svg";
import { useAppContext } from '@/context';

// Define the prop types for ProgressBar
interface ProgressBarProps {
  progress: number; // The progress should be a number
}

const ProileProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const { level, userBalance } = useAppContext();
  return (
    <>
      {/* Coin Balance and Image */}
      <div className="flex items-center justify-between mb-2"> {/* Added mb-2 for spacing */}
        <div className="flex items-center gap-[2px]">
          <Image
            src={standingdollarcoin} // Replace with the actual image path
            width={16}
            height={16}
            alt="standingdollarcoin"
          />
          <p className="text-white text-lg font-semibold">Coin Balance:</p>
        </div>
        <p className="text-[12px] leading-[16px] font-normal text-[#FFFFFF73] tracking-[0.4px]">
          <span className="font-extrabold text-white">{userBalance ? userBalance : 0}</span> / {level.next_level_threshold ? level.next_level_threshold : 0}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="">
        <div
          className="relative  h-2 rounded-full overflow-hidden"
          style={{
            border: '14px solid transparent',
            borderImageSource: 'linear-gradient(90deg, #C10000 66.5%, rgba(0, 0, 0, 0.35) 100%)',
            borderImageSlice: 1,
            borderRadius: '50px',
            width: `${progress}%`, // Control the width based on progress
            transition: 'width 0.3s ease-in-out',
          }}
        >
          {/* Inner Progress */}
          <div
            className="h-full bg-[#C10000] rounded-full"
            style={{

            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProileProgressBar;
