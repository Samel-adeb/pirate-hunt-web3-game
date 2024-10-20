"use client";
import { createContext, useState, useContext } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {

    const [userId, setUserid] = useState(null);
    const [username, setUsername] = useState(null);
    const [isMusicOn, setIsMusicOn] = useState();
    const [userInfo, setUserInfo] = useState({});
    const [level, setLevel] = useState({});
    const [user_tap_rate_level, setUser_tap_rate_level] = useState<number>(1);
    const [userBalance, setUserBalance] = useState<number>(0);
    const [userRank, setUserRank] = useState({})
    const [userDailyRewardInfo, setUserDailyRewardInfo] = useState({});
    const [allRanks, setAllRanks] = useState([])
    const [userInvites, setUserInvites] = useState([]);
    const [inviteLink, setInviteLink] = useState('');
    const [allDailyBonues, setAllDailyBonues] = useState([]);
    const [claimedDailyBonuses, setClaimedDailyBonuses] = useState([]);
    const [claimedInvites, setClaimedInvites] = useState([]);
    const [task, setTask]= useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [nextClaimableReward, setNextClaimableReward] = useState({});
    const [tapTreasures, setTapTreasures] = useState([]);
    const [coinTreasures, setCoinTreasures] = useState([]);
    const [treasurePurchaseHistory, setTreasurePurchaseHistory] = useState([]);

    const countdownResetTapRate =(time:string) => {
        setTimeout(() => {
            setUser_tap_rate_level(1);
        }, parseInt(time)*1000);
    }


    return (
        <AppContext.Provider value={{
            userId,
            setUserid,
            username,
            setUsername,
            isMusicOn, 
            setIsMusicOn,
            userInfo,
            setUserInfo,
            level,
            setLevel,
            user_tap_rate_level,
            setUser_tap_rate_level,
            userBalance,
            setUserBalance,
            userRank,
            setUserRank,
            userDailyRewardInfo,
            setUserDailyRewardInfo,
            allRanks,
            setAllRanks,
            userInvites,
            setUserInvites,
            inviteLink,
            setInviteLink,
            allDailyBonues,
            setAllDailyBonues,
            claimedDailyBonuses,
            setClaimedDailyBonuses,
            claimedInvites,
            setClaimedInvites,
            task,
            setTask,
            doneTasks,
            setDoneTasks,
            nextClaimableReward,
            setNextClaimableReward,
            tapTreasures,
            setTapTreasures,
            coinTreasures,
            setCoinTreasures,
            countdownResetTapRate,
            treasurePurchaseHistory,
            setTreasurePurchaseHistory,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}