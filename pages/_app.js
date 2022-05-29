import { useRouter } from "next/router";
import PrivateRoute from "../auth/PrivateRoute";
import AuthRoute from "../auth/AuthRoute";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

const publicPages = ["/", "/login", "/signup", "/reset-password"];
const authPages = ["/login", "/signup", "/reset-password"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthProvider>
      {publicPages.includes(router.pathname) ? (
        authPages.includes(router.pathname) ? (
          <AuthRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthRoute>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )
      ) : (
        <PrivateRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp;
