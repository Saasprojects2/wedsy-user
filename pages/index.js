import styles from "@/styles/Home.module.css";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    main: { phone: "", name: "", loading: false, success: false },
    secondary: {
      phone: "",
      name: "",
      loading: false,
      success: false,
      otpSent: false,
      Otp: "",
      ReferenceId: "",
      message: "",
    },
  });
  const handleMainEnquiry = () => {
    setData({
      ...data,
      main: { ...data.main, loading: true },
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.main.name,
        phone: `+91${data.main.phone}`,
        verified: false,
        source: "Landing Screen",
      }),
    })
      .then((response) => {
        if (response.ok) {
          setData({
            ...data,
            main: { phone: "", name: "", loading: false, success: true },
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const handleSecondaryEnquiry = () => {
    setData({
      ...data,
      secondary: { ...data.secondary, loading: true },
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.secondary.name,
        phone: `+91${data.secondary.phone}`,
        verified: true,
        source: "Landing Page | Speak to Expert",
        Otp: data.secondary.Otp,
        ReferenceId: data.secondary.ReferenceId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (
          response.message === "Enquiry Added Successfully" &&
          response.token
        ) {
          setData({
            ...data,
            secondary: {
              phone: "",
              name: "",
              loading: false,
              success: true,
              otpSent: false,
              Otp: "",
              ReferenceId: "",
              message: "",
            },
          });
          localStorage.setItem("token", response.token);
        } else {
          setData({
            ...data,
            secondary: {
              ...data.secondary,
              loading: false,
              Otp: "",
              message: response.message,
            },
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const SendOTP = () => {
    setData({
      ...data,
      secondary: { ...data.secondary, loading: true },
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: `+91${data.secondary.phone}`,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setData({
          ...data,
          secondary: {
            ...data.secondary,
            loading: false,
            otpSent: true,
            ReferenceId: response.ReferenceId,
          },
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  return (
    <>
      <main
        className={`${styles.main__div} flex flex-col py-8 md:p-0justify-around gap-6 md:gap-12`}
        id="mainDiv"
      >
        <div className="strike">
          <span className="text-white text-2xl md:text-6xl text-center font-normal">
            WEDDINGS MADE EASY
          </span>
        </div>
        <div className="px-16 flex flex-row justify-between mb-16 text-white">
          <div className="w-1/3 text-4xl md:text-6xl ">
            YOUR WEDDING{" "}
            <span className="text-6xl md:text-8xl font-medium">MEGA</span> STORE
          </div>
          <div className="hidden md:flex flex-col w-1/3 text-center gap-6">
            <span className="text-3xl">YOUR WEDDING VISION, OUR EXPERTISE</span>
            {data.main.success ? (
              <p>
                Your Wedsy Wedding Manager will contact you and assist you in
                choosing the best!
              </p>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="NAME"
                  value={data.main.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      main: { ...data.main, name: e.target.value },
                    })
                  }
                  name="name"
                  className="text-white text-center bg-transparent border-0 border-b-white outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-white focus:ring-0 placeholder:text-white"
                />
                <input
                  type="text"
                  placeholder="PHONE NO. (10 Digits Only)"
                  value={data.main.phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      main: { ...data.main, phone: e.target.value },
                    })
                  }
                  name="phone"
                  className="text-white text-center bg-transparent border-0 border-b-white outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-white focus:ring-0 placeholder:text-white"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white disabled:bg-white/50 text-black py-2"
                  disabled={
                    !data.main.name ||
                    !data.main.phone ||
                    !/^\d{10}$/.test(data.main.phone) ||
                    data.main.loading
                  }
                  onClick={handleMainEnquiry}
                >
                  {data.main.loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    <>ENTER WITH WEDSY</>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <main className={`${styles.main__div__2}`}>
        <img
          src="/assets/images/flowers-1.png"
          className="hidden md:inline float-left"
        />
        <img
          src="/assets/images/flowers-2.png"
          className="hidden md:inline float-right"
        />
        <div className="text-center flex flex-col h-full">
          <span className="text-[#622400] text-2xl md:text-4xl py-6 md:py-0 md:mt-[15%]">
            DISCOVER WEDSY&#39;S MAGIC
          </span>
          <span className="hidden md:block text-[#622400] md:text-8xl">
            MAGIC
          </span>
          <span className="hidden md:block ">
            MEMORIES MADE EASY, NO HASSLES TO SEE
          </span>
          <span className="hidden md:block mt-16 text-left ml-8">
            Share Your Desires - Where wedding dreams catch fire.
          </span>
          <span className="hidden md:block text-sm mt-auto mb-4 ml-auto">
            Let us bring your wedding vision to life. Your dream wedding, along
            with a free consultation, is just a click away! 🌟
          </span>
        </div>
      </main>
      <section className={`${styles.section__2} flex flex-col py-16 gap-6`}>
        <span className="text-4xl">
          Say <span className="text-[#D33467]">I DO</span>
          <br />
          To Expert Wedding Planning!
        </span>
        <p className="w-1/3">
          Are you ready to say ‘I Do’ to a wedding that exceeds your wildest
          dreams? Our certified wedding planners are here to make it happen. Get
          a free consultation and say goodbye to wedding planning stress and
          hello to seamless perfection.{" "}
        </p>
        {data.secondary.success ? (
          <p className="w-1/3">
            Your Wedsy Wedding Manager will contact you and assist you in
            choosing the best!
          </p>
        ) : (
          <>
            <input
              type="text"
              placeholder="NAME"
              value={data.secondary.name}
              onChange={(e) =>
                setData({
                  ...data,
                  secondary: { ...data.secondary, name: e.target.value },
                })
              }
              name="name"
              className="w-1/4 text-black bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0  placeholder:text-black"
            />
            <input
              type="text"
              placeholder="PHONE NO."
              value={data.secondary.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  secondary: { ...data.secondary, phone: e.target.value },
                })
              }
              name="phone"
              className="w-1/4 text-black bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0  placeholder:text-black"
            />
            {data.secondary.otpSent && (
              <input
                type="text"
                placeholder="OTP"
                value={data.secondary.Otp}
                onChange={(e) =>
                  setData({
                    ...data,
                    secondary: { ...data.secondary, Otp: e.target.value },
                  })
                }
                name="otp"
                className="w-1/4 text-black bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0  placeholder:text-black"
              />
            )}
            {data.secondary.message && (
              <p className="text-red-500 w-1/4">{data.secondary.message}</p>
            )}
            <button
              type="submit"
              className="w-1/4 rounded-full bg-black text-white py-2 disabled:bg-black/50"
              disabled={
                !data.secondary.name ||
                !data.secondary.phone ||
                !/^\d{10}$/.test(data.secondary.phone) ||
                data.secondary.loading ||
                (data.secondary.otpSent ? !data.secondary.Otp : false)
              }
              onClick={() => {
                data.secondary.otpSent ? handleSecondaryEnquiry() : SendOTP();
              }}
            >
              {data.secondary.loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                <>SUBMIT</>
              )}
            </button>
          </>
        )}
      </section>
      <section className="flex flex-col gap-12 py-16 px-24">
        <p className="text-[#D33467] flex font-medium gap-2">
          <span className="text-6xl">THE BEST</span>
          <span className="text-xl flex flex-col">
            <span>IN</span>

            <span>TOWN</span>
          </span>
          <span className="text-6xl">!</span>
        </p>
        <p className="text-center text-3xl">What Makes Wedsy Stand Out?</p>
        <div className="flex flex-col md:flex-row gap-12 mx-auto">
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#FFB8C0] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/easy.png" />
            </div>
            <span>Easy</span>
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#D6FF79] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/price.png" />
            </div>
            <span>Unbeatable Pricing</span>
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#F19A3E] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/quality.png" />
            </div>
            <span>Superior Quality</span>
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#70D6FF] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/solutions.png" />
            </div>
            <span>Innovative Solutions</span>
          </div>
        </div>
      </section>
      <section className="w-screen mt-12">
        <div className="relative overflow-y-hidden">
          <p className="text-[#840032] font-semibold text-4xl text-center absolute w-full top-0 z-50">
            WEDDING STORE
          </p>
          <p className="font-medium text-2xl text-center absolute w-full bottom-0 z-50">
            Stage
          </p>
          <div className="absolute -top-14 bg-white z-10 h-28 w-full rounded-br-[100%] rounded-bl-[100%]" />
          <div className="absolute -bottom-14 bg-white z-10 h-28 w-full rounded-tr-[100%] rounded-tl-[100%]" />
          <div className="flex overflow-x-hidden overflow-y-hidden gap-3 flex-row relative items-center flex-nowrap">
            {/* <div className="relative w-1/5">
              <Image
                src="/assets/images/pathway.png"
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
              />
            </div> */}
            <div className="relative w-1/5">
              <Image
                src="/assets/images/entrance.png"
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="relative w-1/5">
              <Image
                src="/assets/images/stage.png"
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="relative w-1/5">
              <Image
                src="/assets/images/mandap.png"
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="relative w-1/5">
              <Image
                src="/assets/images/photobooth.png"
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="relative w-1/5">
              <Image
                src="/assets/images/nameboard.png"
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="z-20 flex flex-row items-center justify-around px-12 py-8">
          <p className="text-rose-900 w-2/3">
            Your one-stop shop for affordable and elegant weddings. Simplify
            planning with fixed-price stage decor, creative entry ideas, stylish
            furniture rentals, and more. Where affordability meets creativity
            for your special day.
          </p>
          <Link
            href={"/decor"}
            className="bg-rose-900 rounded-full p-1 px-8 text-white w-max"
          >
            Explore Now
          </Link>
        </div>
      </section>
    </>
  );
}
