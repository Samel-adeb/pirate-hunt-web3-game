import React from 'react'
import "../globals.css";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import standingdollarcoin from '../../public/assets/standingdollarcoinb.png'
import EnlargedBoost from '../../public/assets/EnlargedBoost1.png'
import Image from 'next/image';
import Link from 'next/link';

function PurchaseCongratulationOverlay() {
    useEffect(() => {
        AOS.init({
            duration: 500, // Animation duration
            // You can add more options here
        });
    }, []);
    return (
        <div className='container-fluid bg-gradient bg-dark d-flex flex-column p-3 align-items-center h-100 position-absolute z-2 text-center'>
            <button className='btn rounded-circle text-dark bg-secondary align-self-end fs-6'><Link href="/tasklist">&#x2715;</Link></button>
            <div className='text-white fw-bold fs-4 my-2'>
                CONGRATULATIONS
            </div>
            <p className='fw-light fs-6 text-grey mb-2 text-warning'>You got</p>
            <div className=''>
                <Image alt='vertical coin' src={standingdollarcoin.src} width={100} height={100} style={{backgroundSize: 'cover'}}/>
            </div>
            <div className='my-2 fs-5 fw-bold text-white'>
                200,000 Coins
            </div>
            <div className='my-2' data-aos="zoom-in">
                <Image alt='treasure chest' src={EnlargedBoost.src} width={300} height={300} />
            </div>
            <div className='my-2 w-100'>
                <button className='btn btn-warning rounded-2 w-75 fw-bold text-white f-6 p-3'>PURCHASE AGAIN</button>
            </div>

        </div>
    )
}

export default PurchaseCongratulationOverlay;