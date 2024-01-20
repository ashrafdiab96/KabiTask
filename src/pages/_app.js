import ReduxProvider from "@/providers/ReduxProvider";
import "@/pages/globals.scss";
import AddJobModal from "@/components/AddJobModal/AddJobModal.jsx";

export default function App({ Component, pageProps }) {
    return (
        <ReduxProvider>
            <Component {...pageProps} />
            <AddJobModal />
        </ReduxProvider>
    );
}
