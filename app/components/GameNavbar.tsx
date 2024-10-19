import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';
export const GameNavbar = () => {
    const { userInfo } = useAppContext(); // Access userId from context
    const router = useRouter();
    const [showNoConnection, setShowNoConnection] = useState<boolean>(false);

    useEffect(() => {
        // alert(JSON.stringify(userInfo));
        if (isObjectEmpty(userInfo) && router.pathname !== '/') {

            setShowNoConnection(true);
        } else {
            setShowNoConnection(false);
        }
    }, [userInfo, router]);

    const isObjectEmpty = (objectName:{}) => {
    
        return JSON.stringify(objectName) === "{}";
    };
    return (
        showNoConnection ? (
            <div className='absolute h-screen w-full flex align-center justify-center items-center bg-black text-[#FFFFFF]' style={{zIndex:100}}>
                Check your internet connection!
            </div>) : (<></>)
    )
}

export default GameNavbar