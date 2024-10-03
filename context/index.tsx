"use client";
import { createContext, useState, useContext } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {

    const [userId, setUserid] = useState(null);
    const [username, setUsername] = useState(null);
    const [level, setLevel] = useState({});
    const [user_tap_rate_level, setUser_tap_rate_level] = useState(1);
    const [userBalance, setUserBalance] = useState(0);
    const [userRank, setUserRank] = useState({})


    return (
        <AppContext.Provider value={{
            userId,
            setUserid,
            username,
            setUsername,
            level,
            setLevel,
            user_tap_rate_level,
            setUser_tap_rate_level,
            userBalance,
            setUserBalance,
            userRank,
            setUserRank,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}