import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [user, setUser] = useState({});
  const restrictedPaths = ["/wishlist", "/profile", "/event"];
  const isPathRestricted = () => {
    return (
      restrictedPaths.includes(router.pathname) ||
      restrictedPaths.filter((item) => router.pathname.startsWith(item))
        .length > 0
    );
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
  return loading ? (
    <div className="grid place-content-center h-screen ">
      <Spinner size="xl" />
    </div>
  ) : (
    <>
      <Header userLoggedIn={!logIn} user={user} Logout={Logout} />
      <Component {...pageProps} userLoggedIn={!logIn} user={user} />
      <Footer />
    </>
  );
}

export default App;
