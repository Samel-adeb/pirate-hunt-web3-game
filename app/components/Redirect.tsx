import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context'; // Adjust the path according to your context structure

function Redirect() {
    const { userId } = useAppContext(); // Access userId from context
    const router = useRouter();

    useEffect(() => {
        // Check if userId is not defined
        if (!userId && router.pathname !== '/') {
            // Redirect to the desired page, e.g., login page or home page
            //router.push('/'); // Adjust the route based on your application
        }
    }, [userId, router]); // Run effect when userId or router changes

    return <></> 
}

export default Redirect;
