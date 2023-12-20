import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Script from "next/script";
import LoginModal from "@/components/layout/LoginModal";
import Head from "next/head";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [user, setUser] = useState({});
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const restrictedPaths = [
    "/wishlist",
    "/my-account",
    "/event",
    "/payments",
    "/my-orders",
  ];
  const isPathRestricted = () => {
    return router.pathname === "/event"
      ? false
      : restrictedPaths.includes(router.pathname) ||
          restrictedPaths.filter((item) => router.pathname.startsWith(item))
            .length > 0;
  };
  const Logout = () => {
    setLogIn(true);
    setUser({});
    localStorage.removeItem("token");
    router.push("/login");
  };
  const CheckLogin = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (isPathRestricted()) {
            router.push("/login");
          }
          localStorage.removeItem("token");
          setLogIn(true);
          return;
        } else {
          return response.json();
        }
      })
      .then((response) => {
        if (response) {
          setLogIn(false);
          setUser(response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      if (isPathRestricted()) {
        router.push("/login");
      }
      setLogIn(true);
      setLoading(false);
    } else if (localStorage.getItem("token")) {
      setLoading(true);
      CheckLogin();
    }
  }, []);
  return (
    <>
      {/* Metatags(SEO) */}
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Title Tag */}
        <title>Wedsy</title>
        {/* Meta Description Tag */}
        <meta name="description" content="Wedsy" />
        {/* Canonical Tag */}
        <link rel="canonical" href="https://www.wedsy.in/" />
        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Wedsy" />
        <meta property="og:description" content="Wedsy" />
        <meta property="og:image" content="/logo-black.png" />
        <meta property="og:url" content="https://www.wedsy.in/" />
        <meta property="og:type" content="website" />
        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
        {/* Language Meta Tag */}
        <meta httpEquiv="content-language" content="en" />
      </Head>
      {loading ? (
        <div className="grid place-content-center h-screen ">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {/* Whatsapp Chatbot Script */}
          <Script
            type="text/javascript"
            src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
            id="aisensy-wa-widget"
            widget-id="I7ZLEV"
          />
          <Header userLoggedIn={!logIn} user={user} Logout={Logout} />
          <LoginModal
            openLoginModal={openLoginModal}
            setOpenLoginModal={setOpenLoginModal}
            user={user}
            logIn={logIn}
            setLogIn={setLogIn}
            CheckLogin={CheckLogin}
          />
          <Component
            {...pageProps}
            userLoggedIn={!logIn}
            user={user}
            setOpenLoginModal={setOpenLoginModal}
          />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
