import { GameNavbar } from '@/app/components/GameNavbar'
import "../app/globals.css";
import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import standingdollarcoinb from '../public/assets/standingdollarcoinb.png'
import standingdollarcoin from '../public/assets/standingdollarcoin.svg'
import MoneyBagChest from '../public/assets/MoneyBagChest.png'

function claimReward() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration
      // You can add more options here
    });
  }, []);
  return (
    <div>
      <GameNavbar />
      <div style={{ height: '200vw' }} className='p-5 bg-black d-flex flex-column align-items-center'>
        <div>
          <img src={standingdollarcoinb.src} width={250} height={250} />
        </div>
        <div data-aos="zoom-in" className='text-white m-1 mb-0 p-3 text-center d-flex flex-column align-items-center justify-content-center bg-dark rounded-4 position-absolute bottom-0' style={{ borderTopColor: '#007bff', borderTopWidth: 6 }}>
          <button className='btn rounded-circle text-dark bg-secondary align-self-end fs-6'>&#x2715;</button>
          <img src={MoneyBagChest.src} width={150} height={150} />
          <h3 className='fs-4 fw-bold'>Daliy Rewards</h3>
          <p className='fs-6'>Congratulations, you've claimed your daily reward!</p>

          <div className='rounded-3 bg-main rounded-circle shadow m-5 p-3 px-5'>

            <div>Day 1</div>
            <img src={standingdollarcoin.src} width={50} height={50} />
            <div className='fw-bold fs-3'>500</div>
          </div>


          <button className='btn bg-main rounded-3 fs-6 text-white w-75'>Claim Reward</button>
        </div>

      </div>
    </div >
  )
}

export default claimReward