// pages/_app.js or pages/_app.tsx (if using TypeScript)
import { AppWrapper } from '@/context'
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <ToastContainer />
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default MyApp;
