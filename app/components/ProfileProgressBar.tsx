import React, { useEffect } from 'react';
import Image from "next/image";
import standingdollarcoin from "/public/assets/standingdollarcoin.svg";
import { useAppContext } from '@/context';
import { claimLevelUpReward, getNextClaimableReward } from '@/scripts';

// Define the prop types for ProgressBar
interface ProgressBarProps {
  progress: number; // The progress should be a number
}

const ProileProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const { userId, userBalance,setUserBalance, nextClaimableReward, setNextClaimableReward } = useAppContext();
  const load = async () => {
    await getNextClaimableReward(userId, setNextClaimableReward);
  }
  progress;
  useEffect(() => {
    if (userId) {
      load();
    }

  }, [])
  const claimReward = async (id:number) => {
    const isSuccessful = await claimLevelUpReward(userId, id);

    load();
    if (isSuccessful) {
      setUserBalance(parseInt(userBalance) + parseInt(nextClaimableReward.reward_amount));
    }
  }
  return (
    <>
      {/* Coin Balance and Image */}
      <div className="flex items-center justify-between mb-2"> {/* Added mb-2 for spacing */}
        <div className="flex items-center gap-[2px]">

          <p className="text-white font-semibold">{nextClaimableReward.next_level_name ?? "Level"}</p>
        </div>
        <p className="text-[12px] leading-[16px] font-normal text-[#FFFFFF73] tracking-[0.4px]">
          <span className="font-extrabold text-white">{userBalance ? userBalance : 0}</span> / {nextClaimableReward.level_threshold ? nextClaimableReward.level_threshold : 0}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="">
        <div
          className="relative p-1 rounded-full overflow-hidden"
          style={{
            backgroundColor: 'white',
            borderRadius: '50px',
            
            transition: 'width 0.3s ease-in-out',
          }}
        >
          {/* Inner Progress */}
          <div
            className="h-full w-full rounded-full"
            style={{
              height: '20px',
              backgroundColor: 'red',
              transition: 'width 0.3s ease-in-out',
              borderRadius: '50px',
              width: `${(parseInt(userBalance) > parseInt(nextClaimableReward.level_threshold)) ? 100 : (parseInt(userBalance) *100 / parseInt(nextClaimableReward.level_threshold))}%`, // Control the width based on progress
            }}
          />
        </div>
      </div>
      <div className='text-white flex justify-between'>
        <div className='flex items-center justify-center mx-1'>Reward:</div>
        <div className='flex items-center justify-center mx-1'>

          <Image
            src={standingdollarcoin} // Replace with the actual image path
            width={16}
            height={16}
            alt="standingdollarcoin"
            className='mx-1'
          />
          <p className='text-lg font-semibold'>{nextClaimableReward.reward_amount ? nextClaimableReward.reward_amount : 0}</p>
        </div>
        {
          nextClaimableReward.claimable ? (
            <button onClick={()=>claimReward(nextClaimableReward.next_level_id)} className='p-1 bg-black p-2 rounded-full text-[12px] mt-3'>CLAIM</button>
          ) : (
            <button className='p-1 bg-black/50 p-2 rounded-full mt-3' style={{ opacity: "0.5" }}>CLAIM</button>
          )
        }

      </div >
    </>
  );
};

export default ProileProgressBar;
