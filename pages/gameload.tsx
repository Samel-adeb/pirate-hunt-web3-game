import Link from 'next/link';
import "../app/globals.css";
import Image from "next/image";

import BlueSail from "../public/assets/BlueSail.png";
import Cap from "../public/assets/Cap.png";
import telegramSvg from "../public/assets/telegramSvg.svg";
import TwitterSvg from "../public/assets/TwitterSvg.svg";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Using App Router's useRouter
import { GameNavbar } from '@/app/components/GameNavbar';

export default function GameLoad() {

    const [isLoading, setIsLoading] = useState(true); // State for loader
    const router = useRouter();
  
    useEffect(() => {
      // Set a timeout to simulate loading and redirect
      const timer = setTimeout(() => {
        setIsLoading(false);
        router.push('/gamehome'); // Redirect to gamehome page
      }, 3000); // 3 seconds timeout
  
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [router]);

    
    return (
  
        <div className="relative h-screen">
            <GameNavbar />
            <div className="flex flex-col items-center justify-center">
                <div className="w-full bg-cover">
                    <Image width={393} height={460} src={BlueSail} alt="BlueSail" />
                </div>

                <div className="bg-[#000000] pb-[10px] w-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items justify-center text-center">
                        <h1 className="text-[32px] leading-[32px] font-medium text-white">Pirate hunt</h1>
                        <p className="pt-[20px] font-medium text-white text-[12px] leading-[16px] max-w-[344px]">Ahoy, matey! Welcome to Pirate Hunt, a Telegram clicker mini-game that's a treasure trove of fun and excitement on<br /> the Ton Network</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h2 className="pt-16 text-center text-white text-[14px] leading-[24px] font-bold tracking-[0.15%]">Connect with us</h2>
                      
                        <div className="flex items-center gap-[10px]">
                            <div className="flex items-center gap-[2px] text-white text-[8.78px] leading-[13.9px] font-medium">
                                <Image src={telegramSvg} alt="telegramSvg" />
                                Telegram:<Link href="/" className="underline">t.me/piratequest</Link>
                            </div>
                            <div className="flex items-center gap-[2px] text-white text-[8.78px] leading-[13.9px] font-medium">
                                <Image src={TwitterSvg} alt="TwitterSvg" />
                                Twitter:<Link href="/" className="underline">x.com/piratequest</Link>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
              {/* Loader overlay */}
            {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-75 z-50">
                {/* Loading Image */}
                <Image width={100} height={100} src={Cap} alt="Cap" />

                {/* Loading Text with Circular Dots */}
                <p className="text-white text-[20px] font-semibold mt-4">
                Loading<span className="dot-anim"></span>
                </p>

                <style jsx>{`
                .dot-anim {
                    display: inline-flex;
                    margin-left: 8px;
                }

                .dot-anim::after {
                    content: '';
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin: 0 3px;
                    background-color: white;
                    border-radius: 50%;
                    animation: dot-blink 1.5s infinite step-start;
                }

                .dot-anim::before {
                    content: '';
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin: 0 3px;
                    background-color: white;
                    border-radius: 50%;
                    animation: dot-blink 1.5s infinite 0.5s step-start;
                }

                .dot-anim span {
                    content: '';
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin: 0 3px;
                    background-color: white;
                    border-radius: 50%;
                    animation: dot-blink 1.5s infinite 1s step-start;
                }

                @keyframes dot-blink {
                    0%, 50%, 100% {
                    opacity: 0;
                    }
                    25% {
                    opacity: 1;
                    }
                }
                `}</style>
            </div>
            )}
        </div>
        
    );
}