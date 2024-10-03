'use client';


import "../app/globals.css";
import Image from "next/image";
import Pirate from "../public/assets/Pirate.png";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserId, getUsername } from '@/scripts';
import { useAppContext } from '@/context';



export default function GameIntro() {
  const router = useRouter();
  const { userId, setUserid, username, setUsername } = useAppContext();
  const getId = async () => {
    const muserId = await getUserId();
    const musername = await getUsername();
    setUserid(muserId);
    setUsername(musername);
  }

  useEffect(() => {
    getId();
    // Redirect to the gameload page after a delay
    const timer = setTimeout(() => {
      router.push('/gameload');
    }, 2000); // 2-second delay (adjust as needed)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router]);

  return (

    <div className="ease-in-out-back flex items-center justify-center h-screen gap-[16px]">
      <div>
        <Image width={100} height={100} src={Pirate} alt="Pirate" />
      </div>

      <h1 className="text-[24px] leading-[32px] text-[#000000] font-semibold">Pirate Hunt</h1>
    </div>


  );
}