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

          <p className="text-white text-lg font-semibold">Level Up</p>
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
      {/* <div className='text-white flex justify-between'>
        <div className='flex items-center justify-center mx-1'>Reward:</div>
        <div className='flex items-center justify-center mx-1'>

          <Image
            src={standingdollarcoin} // Replace with the actual image path
            width={16}
            height={16}
            alt="standingdollarcoin"
            className='mx-1'
          />
          <p className='text-lg font-semibold'>{level.reward_amount ? level.reward_amount : 0}</p>
        </div>
        <button className='p-1 bg-black/50 p-2 rounded-full'>CLAIM</button>
      </div > */}
    </>
  );
};

export default ProileProgressBar;
