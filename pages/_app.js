// pages/_app.js or pages/_app.tsx (if using TypeScript)
import { AppWrapper } from '@/context'
import { ToastContainer } from "react-toastify";

import Redirect from '../app/components/Redirect'

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <ToastContainer />
            <Redirect/>
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default MyApp;
