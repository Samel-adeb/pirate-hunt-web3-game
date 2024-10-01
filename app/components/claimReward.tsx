import "../globals.css";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import standingdollarcoinb from '../../public/assets/standingdollarcoinb.png'
import standingdollarcoin from '../../public/assets/standingdollarcoin.svg'
import MoneyBagChest from '../../public/assets/MoneyBagChest.png'
import Image from 'next/image';
import Link from 'next/link';

function ClaimReward() {


  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration
      // You can add more options here
    });
  }, []);
  return (

    <div className='p-5 bg-black bg-gradient d-flex h-100 w-100 flex-column align-items-center position-absolute z-2'>
      <div>
        <Image alt="" src={standingdollarcoinb.src} width={250} height={250} />
      </div>
      <div data-aos="zoom-in" className='text-white m-1 mb-0 p-3 text-center d-flex flex-column align-items-center justify-content-center bg-dark rounded-4 position-absolute bottom-0' style={{ borderTopColor: '#007bff', borderTopWidth: 6 }}>
        <button className='btn rounded-circle text-dark bg-secondary align-self-end fs-6'><Link href="/tasklist">&#x2715;</Link></button>
        <Image alt="" src={MoneyBagChest.src} width={150} height={150} />
        <h3 className='fs-4 fw-bold'>Daliy Rewards</h3>
        <p className='fs-6'>Congratulations, you&apos;ve claimed your daily reward!</p>

        <div className='rounded-3 bg-main rounded-circle shadow m-5 p-3 px-5'>

          <div>Day 1</div>
          <Image alt="" src={standingdollarcoin.src} width={50} height={50} />
          <div className='fw-bold fs-3'>500</div>
        </div>


        <button className='btn bg-main rounded-3 fs-6 text-white w-75 opacity-[0.5]'>Come back tommorow </button>
      </div>

    </div>


  )
}

export default ClaimReward