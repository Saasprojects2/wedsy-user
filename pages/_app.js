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
    return router.pathname === "/event" ||
      router.pathname === "/event/[event_id]/view"
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
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("367919122511166");
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);
  return (
    <>
      {/* Metatags(SEO) */}
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Title Tag */}
        <title>Wedsy | Weddings Made Easy</title>
        {/* Meta Description Tag */}
        <meta
          name="description"
          content="Elevate your wedding experience with Wedsy - your affordable Wedtech partner. Explore stunning flower decor, captivating stage setups, and budget-friendly planning. Discover the best-in-town service, making your dream wedding a seamless and affordable reality."
        />
        {/* Meta Keywords Tag */}
        <meta
          name="keywords"
          content="Wedding planner, wedding decor, stage decorations, flower decor, reception decor, engagement decor, mandap decoration, decorators, wedding planner, Haldi decor, Mehendi decor, nikah decor, valima decor, best wedding planners, best decorators"
        />
        {/* Canonical Tag */}
        <link rel="canonical" href="https://www.wedsy.in/" />
        {/* Viewport & Other Important Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="content-language" content="en-us" />
        <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
        <meta name="revisit-after" content="7 days" />
        {/* Open Graph Tags */}
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content="Wedsy | Weddings Made Easy" />
        <meta
          property="og:description"
          content="Elevate your wedding experience with Wedsy - your affordable Wedtech partner. Explore stunning flower decor, captivating stage setups, and budget-friendly planning. Discover the best-in-town service, making your dream wedding a seamless and affordable reality."
        />
        <meta
          property="og:image"
          content="https://wedsy.vercel.app/wedsy-logo.jpg"
        />
        <meta property="og:url" content="https://www.wedsy.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wedsy | Weddings Made Easy" />
        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />
        {/* Language Meta Tag */}
        <meta httpEquiv="content-language" content="en" />
        {/* Geo Tags */}
        <meta name="geo.position" content="Wedsy" />
        <meta name="geo.placename" content="Banglore" />
        {/* <meta name="geo.region" content="411025" /> */}
        {/* Google */}
        {(router.pathname === "/decor" ||
          router.pathname === "/decor/view") && (
          <meta
            name="google-site-verification"
            content="6NQH3LHjenBtdQYZzStAqCj51nFRb1P4Pb5jhIdugB0"
          />
        )}
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZL6YG37MF0`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZL6YG37MF0', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      {loading ? (
        <div className="grid place-content-center h-screen ">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {/* Whatsapp Chatbot Script */}
          {/* <Script
            type="text/javascript"
            src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
            id="aisensy-wa-widget"
            widget-id="I7ZLEV"
          /> */}
          {/* Updated Script for Whastapp Chatbot Integration */}
          <Script
            strategy="afterInteractive"
            src="https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js"
            onLoad={() => {
              // Initialize Kiwi SDK after script is loaded
              kiwi.init("", "YSNtpXF4Dmqafpa8XeSZzWfcawpPm4QP", {});
            }}
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
            CheckLogin={CheckLogin}
          />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
