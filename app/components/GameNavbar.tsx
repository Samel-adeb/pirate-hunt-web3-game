import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';
export const GameNavbar = () => {
    const { userInfo } = useAppContext(); // Access userId from context
    const router = useRouter();
    const [showIsBlocked, setShowIsBlocked] = useState<boolean>(false);
    const [message, setMessage] = useState("Check your internet connection!");
    useEffect(() => {
        // alert(JSON.stringify(userInfo));
        if (!isObjectEmpty(userInfo) && router.pathname !== '/' && 'message' in userInfo) {
            setMessage(userInfo.message);
            setShowIsBlocked(true);
        } else {
            setShowIsBlocked(false);
        }
    }, [userInfo, router]);

    const isObjectEmpty = (objectName: object) => {

        return JSON.stringify(objectName) === "{}";
    };
    return (
        showIsBlocked ? (
            <div className='absolute h-screen w-full flex align-center justify-center items-center bg-black text-[#FFFFFF]' style={{ zIndex: 100 }}>
                {message}
            </div>) : (<></>)
    )
}

export default GameNavbar