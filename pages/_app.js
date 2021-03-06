import { useRouter } from "next/router";
import PrivateRoute from "../auth/PrivateRoute";
import AuthRoute from "../auth/AuthRoute";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";
import { HabitProvider } from "../contexts/HabitContext";

const authPages = ["/login", "/signup", "/reset-password"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthProvider>
      {authPages.includes(router.pathname) ? (
        <AuthRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthRoute>
      ) : (
        <PrivateRoute>
          <HabitProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </HabitProvider>
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp;
