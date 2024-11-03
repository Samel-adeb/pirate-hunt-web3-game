import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context'; // Adjust the path according to your context structure
import { getUserId, getUserInfo, getUsername, registerUser } from '@/scripts';

function Redirect() {
   
    const router = useRouter();
    const { userId, setUserId, username, setUsername, setUserInfo, setLevel, setUser_tap_rate_level, setUser_temp_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo } = useAppContext();


    useEffect(() => {
        if (router.pathname === '/gamehome') {              
                if (userId && username) {
                    load();
                }else{
                    getId();
                }
        }
    }, [userId, router]); 

    const load = async () => {
        if (userId && username) {
           
            await registerUser(userId, username);
            await getUserInfo(userId, setUsername, setUserInfo, setLevel, setUser_tap_rate_level,setUser_temp_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo);
        }
    };


    const getId = async () => {
        //alert('getId loading...');
        const muserId = await getUserId();
        const musername = await getUsername();

        setUserId(muserId);
        setUsername(musername);
    };
    return <></> 
}

export default Redirect;
