import React from 'react'
import "../globals.css";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import standingdollarcoin from '../../public/assets/standingdollarcoin.svg'
import EnlargedBoost from '../../public/assets/EnlargedBoost1.png'
import Image from 'next/image';
import Link from 'next/link';

function PurchaseTreasureOverlay() {
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
                PURCHASE TREASURE
            </div>
            <p className='fw-light fs-6 text-grey mb-3 text-warning'>To get random amount of coins</p>
            <div className='mt-3'>
                <Image alt='vertical coin' src={standingdollarcoin.src} width={30} height={30} />
            </div>
            <div className='my-2 fw-bold text-white'>
                10,000 - 200,000 Coins
            </div>
            <div className='my-2' data-aos="zoom-in">
                <Image alt='treasure chest' src={EnlargedBoost.src} width={300} height={300} />
            </div>
            <div className='my-2 w-100'>
                <button className='btn btn-warning w-75 fw-bold text-white f-6 p-3'>PURCHASE</button>
            </div>

        </div>
    )
}

export default PurchaseTreasureOverlay