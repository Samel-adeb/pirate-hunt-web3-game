// pages/_app.js
import { AppWrapper } from '@/context';
import { ToastContainer } from "react-toastify";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Redirect from '../app/components/Redirect';
import Sound from '../app/components/Sound';
import { useEffect } from 'react';
import ErrorBoundary from '../app/components/ErrorBoundary'; // Import ErrorBoundary

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;  // Load asynchronously
        script.onload = () => {
            console.log("Telegram Web App SDK loaded");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <AppWrapper>
            <ErrorBoundary> {/* Wrap components inside ErrorBoundary */}
                
                <ToastContainer
                    position="top-center"
                    autoClose={7000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                />
                <Redirect />
                <Sound />
                <TonConnectUIProvider manifestUrl={`${process.env.NEXT_PUBLIC_MANIFEST_URL}`}>
                    <Component {...pageProps} />
                </TonConnectUIProvider>
            </ErrorBoundary>
        </AppWrapper>
    );
}

export default MyApp;
