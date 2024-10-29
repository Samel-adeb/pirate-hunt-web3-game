import { logUserInOut } from '@/scripts';
import { useEffect } from 'react';
import { useAppContext } from '@/context';

const LogStatus = () => {
    const { userId } = useAppContext();

    useEffect(() => {
        if (userId) {
            // Log the user in when the app is opened
            logUserInOut(userId, true);
        }


        // Define a function to log the user out
        const handleLogOut = () => {
            logUserInOut(userId, false);
        };

        // Log out when the page is closed or refreshed
        window.addEventListener('beforeunload', handleLogOut);

        // Log out when the tab or window is hidden (optional if you want to log them out on tab switch)
        // document.addEventListener('visibilitychange', () => {
        //     if (document.visibilityState === 'hidden') {
        //         handleLogOut();
        //     }
        // });

        // Cleanup event listeners when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleLogOut);
            document.removeEventListener('visibilitychange', handleLogOut);
        };
    }, [userId]);

    return null; // This component doesn't need to render anything
};

export default LogStatus;
