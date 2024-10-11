// pages/_app.js or pages/_app.tsx (if using TypeScript)
import { AppWrapper } from '@/context'
import { ToastContainer } from "react-toastify";
import { TonConnectUIProvider } from "@tonconnect/ui-react";


import Redirect from '../app/components/Redirect'

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <ToastContainer />
            <Redirect />
            <TonConnectUIProvider manifestUrl={`${process.env.NEXT_PUBLIC_MANIFEST_URL}`}>
                <Component {...pageProps} />
            </TonConnectUIProvider>
        </AppWrapper>
    );
}

export default MyApp;
