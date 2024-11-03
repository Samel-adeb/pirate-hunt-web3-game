import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context'; // Adjust the path according to your context structure
import { getUserId, getUserInfo, getUsername, registerUser } from '@/scripts';

function Redirect() {
   
    const router = useRouter();
    const { userId, setUserId, username, setUsername, setUserInfo, setLevel, setUser_tap_rate_level, setUser_temp_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo } = useAppContext();


    useEffect(() => {
        if (router.pathname !== '/' && !userId) {              
                if (userId && username) {
                    load();
                }else{
                    getId();
                }
        }
         // Function to display the Telegram back button
         const showTelegramBackButton = () => {
            if (
                window.Telegram &&
                window.Telegram.WebApp &&
                router.pathname !== '/' &&
                router.pathname !== '/gamehome'
            ) {
                // Show back button if not on '/' or '/gamehome'
                window.Telegram.WebApp.BackButton.show();
                window.Telegram.WebApp.BackButton.onClick(() => router.back());
            } else {
                // Hide the back button if on '/' or '/gamehome'
                window.Telegram.WebApp.BackButton.hide();
            }
        };

        // Ensure that the back button is displayed based on current route
        showTelegramBackButton();
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
