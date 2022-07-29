import "../styles/globals.css";
import Wrapper from "../Components/Wrapper";
import { useAuth, AuthUserProvider } from "../Context/firebaseUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </AuthUserProvider>
  );
}

export default MyApp;
