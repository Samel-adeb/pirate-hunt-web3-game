import "../globals.css";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import standingdollarcoinb from '../../public/assets/standingdollarcoinb.png'
import standingdollarcoin from '../../public/assets/standingdollarcoin.svg'
import MoneyBagChest from '../../public/assets/MoneyBagChest.png'
import Image from 'next/image';
import Link from 'next/link';

function ClaimReward({ setShowClaimSuccess }:{ setShowClaimSuccess: Function}) {
  
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration
    });
  }, []);

  return (
    <div className='claim-reward-container'>
      <div>
        <Image alt="" src={standingdollarcoinb.src} width={250} height={250} />
      </div>
      <div data-aos="zoom-in" className='reward-popup'>
        <button className='close-btn' onClick={()=>setShowClaimSuccess(false)}>
          &#x2715;
        </button>
        <Image alt="" src={MoneyBagChest.src} width={150} height={150} />
        <h3 className='title'>Daily Rewards</h3>
        <p className='description'>Congratulations, you&apos;ve claimed your daily reward!</p>

        <div className='reward-info'>
          <div>Day 1</div>
          <Image alt="" src={standingdollarcoin.src} width={50} height={50} />
          <div className='reward-amount'>500</div>
        </div>

        <button className='claim-btn'>Come back tomorrow</button>
      </div>
    </div>
  );
}

export default ClaimReward;
