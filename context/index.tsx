"use client";
import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [isMusicOn, setIsMusicOn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [level, setLevel] = useState({});
    const [user_tap_rate_level, setUser_tap_rate_level] = useState<number>(1);
    const [user_temp_tap_rate_level, setUser_temp_tap_rate_level] = useState<number>(1);
    const [userBalance, setUserBalance] = useState<number>(0);
    const [userRank, setUserRank] = useState({});
    const [userDailyRewardInfo, setUserDailyRewardInfo] = useState({});
    const [allRanks, setAllRanks] = useState([]);
    const [userInvites, setUserInvites] = useState([]);
    const [inviteLink, setInviteLink] = useState('');
    const [allDailyBonues, setAllDailyBonues] = useState([]);
    const [claimedDailyBonuses, setClaimedDailyBonuses] = useState([]);
    const [claimedInvites, setClaimedInvites] = useState([]);
    const [task, setTask] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [nextClaimableReward, setNextClaimableReward] = useState({});
    const [tapTreasures, setTapTreasures] = useState([]);
    const [coinTreasures, setCoinTreasures] = useState([]);
    const [treasurePurchaseHistory, setTreasurePurchaseHistory] = useState([]);

    // Load state from cookies on client side only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserId(Cookies.get('userId'));
            setUsername(Cookies.get('username'));
            setIsMusicOn(Cookies.get('isMusicOn') === 'true');
            setUserInfo(JSON.parse(Cookies.get('userInfo') || '{}'));
            setLevel(JSON.parse(Cookies.get('level') || '{}'));
            setUser_tap_rate_level(Number(Cookies.get('user_tap_rate_level') || 1));
            setUser_temp_tap_rate_level(Number(Cookies.get('user_temp_tap_rate_level') || 1));
            setUserBalance(Number(Cookies.get('userBalance') || 0));
            setUserRank(JSON.parse(Cookies.get('userRank') || '{}'));
            setUserDailyRewardInfo(JSON.parse(Cookies.get('userDailyRewardInfo') || '{}'));
            setAllRanks(JSON.parse(Cookies.get('allRanks') || '[]'));
            setUserInvites(JSON.parse(Cookies.get('userInvites') || '[]'));
            setInviteLink(Cookies.get('inviteLink') || '');
            setAllDailyBonues(JSON.parse(Cookies.get('allDailyBonues') || '[]'));
            setClaimedDailyBonuses(JSON.parse(Cookies.get('claimedDailyBonuses') || '[]'));
            setClaimedInvites(JSON.parse(Cookies.get('claimedInvites') || '[]'));
            setTask(JSON.parse(Cookies.get('task') || '[]'));
            setDoneTasks(JSON.parse(Cookies.get('doneTasks') || '[]'));
            setNextClaimableReward(JSON.parse(Cookies.get('nextClaimableReward') || '{}'));
            setTapTreasures(JSON.parse(Cookies.get('tapTreasures') || '[]'));
            setCoinTreasures(JSON.parse(Cookies.get('coinTreasures') || '[]'));
            setTreasurePurchaseHistory(JSON.parse(Cookies.get('treasurePurchaseHistory') || '[]'));
        }
    }, []);

    // Save to cookies whenever state changes
    useEffect(() => {
        Cookies.set('userId', userId || '');
        Cookies.set('username', username || '');
        Cookies.set('isMusicOn', String(isMusicOn));
        Cookies.set('userInfo', JSON.stringify(userInfo));
        Cookies.set('level', JSON.stringify(level));
        Cookies.set('user_tap_rate_level', String(user_tap_rate_level));
        Cookies.set('user_temp_tap_rate_level', String(user_temp_tap_rate_level));
        Cookies.set('userBalance', String(userBalance));
        Cookies.set('userRank', JSON.stringify(userRank));
        Cookies.set('userDailyRewardInfo', JSON.stringify(userDailyRewardInfo));
        Cookies.set('allRanks', JSON.stringify(allRanks));
        Cookies.set('userInvites', JSON.stringify(userInvites));
        Cookies.set('inviteLink', inviteLink);
        Cookies.set('allDailyBonues', JSON.stringify(allDailyBonues));
        Cookies.set('claimedDailyBonuses', JSON.stringify(claimedDailyBonuses));
        Cookies.set('claimedInvites', JSON.stringify(claimedInvites));
        Cookies.set('task', JSON.stringify(task));
        Cookies.set('doneTasks', JSON.stringify(doneTasks));
        Cookies.set('nextClaimableReward', JSON.stringify(nextClaimableReward));
        Cookies.set('tapTreasures', JSON.stringify(tapTreasures));
        Cookies.set('coinTreasures', JSON.stringify(coinTreasures));
        Cookies.set('treasurePurchaseHistory', JSON.stringify(treasurePurchaseHistory));
    }, [
        userId,
        username,
        isMusicOn,
        userInfo,
        level,
        user_tap_rate_level,
        user_temp_tap_rate_level,
        userBalance,
        userRank,
        userDailyRewardInfo,
        allRanks,
        userInvites,
        inviteLink,
        allDailyBonues,
        claimedDailyBonuses,
        claimedInvites,
        task,
        doneTasks,
        nextClaimableReward,
        tapTreasures,
        coinTreasures,
        treasurePurchaseHistory,
    ]);

    const countdownResetTapRate = (time: string) => {
        setTimeout(() => {
            setUser_tap_rate_level(user_temp_tap_rate_level);
        }, parseInt(time) * 1000);
    };

    return (
        <AppContext.Provider value={{
            userId,
            setUserId,
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
            user_temp_tap_rate_level,
            setUser_temp_tap_rate_level,
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
