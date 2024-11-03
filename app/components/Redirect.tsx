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
            } else {
                getId();
            }
        }

    }, [userId, router]);

    useEffect(() => {
        const showTelegramBackButton = () => {
            if (window.Telegram && window.Telegram.WebApp && router.pathname !== '/' && router.pathname !== '/gamehome') {
                window.Telegram.WebApp.BackButton.show();
                // Set an event handler for the back button
                window.Telegram.WebApp.BackButton.onClick(() => {
                    // Handle the navigation, e.g., go to previous page
                    router.back();
                });
            }
        };

        // Wait until the Telegram SDK is loaded
        const handleScriptLoad = () => {
            showTelegramBackButton();
        };

        if (window.Telegram && window.Telegram.WebApp) {

            showTelegramBackButton();
        } else {

            window.addEventListener('TelegramSdkLoaded', handleScriptLoad);
        }

        return () => {
            window.removeEventListener('TelegramSdkLoaded', handleScriptLoad);
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.BackButton.offClick();
            }
        };
    }, [router.pathname]);

    const load = async () => {
        if (userId && username) {

            await registerUser(userId, username);
            await getUserInfo(userId, setUsername, setUserInfo, setLevel, setUser_tap_rate_level, setUser_temp_tap_rate_level, setUserBalance, setUserRank, setUserDailyRewardInfo);
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
