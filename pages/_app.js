import "../styles/globals.css";
import {NavBar,Footer} from "../Components";
import {DonationConnectionProvider} from "../Context/DonationConnection"
export default function App({ Component, pageProps }) {
  return (
   <>
    <DonationConnectionProvider>
    <NavBar></NavBar>
    <Component {...pageProps} />
    <Footer></Footer>
    </DonationConnectionProvider>
   </>
);
}
