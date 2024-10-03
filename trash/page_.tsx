<<<<<<< HEAD:trash/page_.tsx
'use client';



// import { GameStartPage } from "./components/GameStartPage";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter();
 

  const handleStartGame = async () => {
    // Navigate to the gameintro page
    
    
    router.push('/gameintro');
  };
  useEffect(() =>{
    handleStartGame();
  },[]);

  return (
    <div className="lg:hidden md:hidden flex flex-col items-center justify-center h-screen">
      <h1 className="text-[20px]">Welcome to My Telegram Game</h1>
      <button
        onClick={handleStartGame}
        className="text-[16px] text-[#1A314E] underline bg-transparent border-none cursor-pointer"
      >
        Start Game
      </button>
    </div>
  );
=======


import { redirect } from "next/navigation";


export default function Home() {
  redirect("/gameload");
  
  return null; 
>>>>>>> 86463b98833a248da053514a0a44c3a5c343ac15:app/page.tsx
}
