// pages/_app.js
import { AppWrapper } from '@/context';
import { ToastContainer } from "react-toastify";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Redirect from '../app/components/Redirect';
import Sound from '../app/components/Sound';
import LogStatus from '../app/components/LogStatus';
import ErrorBoundary from '../app/components/ErrorBoundary'; // Import ErrorBoundary

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <ErrorBoundary> {/* Wrap components inside ErrorBoundary */}
                <LogStatus />
                <ToastContainer
                    position="top-center"
                    autoClose={700}
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
