import styles from "@/styles/Home.module.css";
import { Rating, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsFillBalloonHeartFill,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import pinkBgGif from "@/public/assets/gif/pink-bg.gif";
import heartGif from "@/public/assets/gif/heart.gif";
import tickGif from "@/public/assets/gif/tick.gif";
import { processMobileNumber } from "@/utils/phoneNumber";
import { FaHeart } from "react-icons/fa";
import PlanYourEvent from "@/components/screens/PlanYourEvent";

export default function Home() {
  const categoryList = [
    "Stage",
    "Pathway",
    "Entrance",
    "Photobooth",
    "Mandap",
    "Nameboard",
  ];
  const decorList = [
    {
      id: "Stage",
      text: "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day.",
      image: "/assets/images/stage.png",
    },
    {
      id: "Pathway",
      text: "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day.",
      image: "/assets/images/pathway.png",
    },
    {
      id: "Entrance",
      text: "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day.",
      image: "/assets/images/entrance.png",
    },
    {
      id: "Photobooth",
      text: "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day.",
      image: "/assets/images/photobooth.png",
    },
    {
      id: "Mandap",
      text: "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day.",
      image: "/assets/images/mandap.png",
    },
    {
      id: "Nameboard",
      text: "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day.",
      image: "/assets/images/nameboard.png",
    },
  ];
  const [tempDecorList, setTempDecorList] = useState([]);
  const [decorIndex, setDecorIndex] = useState(0);
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
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMainEnquiry = async () => {
    if (await processMobileNumber(data.main.phone)) {
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
          phone: processMobileNumber(data.main.phone),
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
    } else {
      alert("Please enter valid mobile number");
    }
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
        phone: processMobileNumber(data.secondary.phone),
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
  const SendOTP = async () => {
    if (await processMobileNumber(data.secondary.phone)) {
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
          phone: processMobileNumber(data.secondary.phone),
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
    } else {
      alert("Please enter valid mobile number");
    }
  };
  useEffect(() => {
    let length = decorList.length;
    let array = [1, 2, 3, 4, 5];
    let diff = decorIndex - array[2];
    array = array.map((i) => {
      let a1 = i + diff;
      if (a1 < 0) {
        a1 += length;
      } else if (a1 > length - 1) {
        a1 -= length;
      }
      return a1;
    });
    let list = array.map((i) => decorList[i]);
    setTempDecorList(list);
  }, [decorIndex]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovered) {
        let length = decorList.length;
        let item = decorIndex;
        if (item === length - 1) {
          item = 0;
        } else {
          item++;
        }
        setDecorIndex(item);
      }
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [decorIndex, isHovered]);
  return (
    <>
      <main
        className={`${styles.main__div} flex flex-col justify-around gap-6 md:gap-12 `}
        id="mainDiv"
      >
        <div className="strike mt-6 !hidden md:!block">
          <span className="text-white text-2xl md:text-4xl text-center font-normal">
            WEDDINGS MADE EASY
          </span>
        </div>
        <div className="p-6 md:px-16 hidden md:flex flex-row justify-between mt-6 mb-16 text-white">
          <div className="w-1/3 text-4xl md:text-7xl flex flex-col gap-2">
            <span className="mb-4">YOUR</span>{" "}
            <span className="mb-2">WEDDING</span>{" "}
            <span className="text-6xl md:text-9xl font-medium mb-2">MEGA</span>{" "}
            <span>STORE</span>
          </div>
          <div className="hidden md:flex flex-col w-1/3 text-center gap-6 justify-center">
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
                    // !/^\d{10}$/.test(data.main.phone) ||
                    // !processMobileNumber(data.main.phone) ||
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
        <Image
          src="/assets/images/landing-screen-mobile.png"
          alt="Decor"
          width={0}
          height={0}
          sizes="100vw"
          className="block md:hidden"
          style={{ height: "auto", width: "100vw" }}
        />
      </main>
      <main className={`${styles.main__div__2}`}>
        <div className="text-center flex flex-col h-full relative">
          <span className="text-[#622400] text-2xl md:text-6xl font-medium py-3 md:py-0 mt-auto">
            DISCOVER WEDSY&#39;S MAGIC
          </span>
          <span className="hidden md:block ">
            MEMORIES MADE EASY, NO HASSLES TO SEE
          </span>
          <Image
            src="/assets/images/discover.png"
            alt="Decor"
            width={0}
            height={0}
            sizes="60vh"
            className="mx-auto hidden md:block"
            style={{ height: "80vh", width: "auto" }}
          />
          <Image
            src="/assets/images/discover-mobile.png"
            alt="Decor"
            width={0}
            height={0}
            sizes="60vh"
            className="mx-auto block md:hidden"
            style={{ height: "80vh", width: "auto" }}
          />
        </div>
      </main>
      <section className="relative w-full mt-20 md:mt-20">
        <p className="text-[#840032] font-semibold text-3xl md:text-5xl text-center absolute w-full top-0 md:-top-8 z-40">
          THE WEDDING STORE
        </p>
        <div className="relative overflow-y-hidden">
          {/* <BsArrowLeftShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1] absolute top-1/2 -translate-y-1/2 z-40 rounded-full bg-white left-6"
            onClick={() => {
              let length = decorList.length;
              let item = decorIndex;
              if (item === 0) {
                item = length - 1;
              } else {
                item--;
              }
              setDecorIndex(item);
            }}
          />
          <BsArrowRightShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1] absolute top-1/2 -translate-y-1/2 z-40 rounded-full bg-white right-6"
            onClick={() => {
              let length = decorList.length;
              let item = decorIndex;
              if (item === length - 1) {
                item = 0;
              } else {
                item++;
              }
              setDecorIndex(item);
            }}
          /> */}
          <div className="overflow-hidden flex flex-row flex-nowrap absolute w-[33vw] md:w-[20vw] -translate-x-1/2 left-1/2 bottom-0 z-40">
            <div className="animate-marquee whitespace-nowrap flex flex-row gap-3">
              {[
                "Entrance",
                "Photobooth",
                "Mandap",
                "Nameboard",
                "Stage",
                "Pathway",
              ].map((item, index) => (
                <p
                  className="font-medium text-2xl text-center w-[33vw] md:w-[20vw]"
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex flex-row left-3 gap-3 ">
              {[
                "Entrance",
                "Photobooth",
                "Mandap",
                "Nameboard",
                "Stage",
                "Pathway",
              ].map((item, index) => (
                <p
                  className="font-medium text-2xl text-center w-[33vw] md:w-[20vw]"
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="absolute -top-14 bg-white z-10 h-28 w-full rounded-br-[25%] rounded-bl-[25%] md:rounded-br-[100%] md:rounded-bl-[100%]" />
          <div className="absolute -bottom-14 bg-white z-10 h-28 w-full rounded-tr-[25%] rounded-tl-[25%] md:rounded-tr-[100%] md:rounded-tl-[100%]" />
          <div className="relative overflow-hidden flex flex-row flex-nowrap">
            <div className="animate-marquee whitespace-nowrap flex flex-row gap-3">
              {categoryList.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg w-[33vw] md:w-[20vw] relative"
                >
                  <Link
                    href={`/decor/view?category=${item}`}
                    className="hover:z-40 transition-all"
                  >
                    <Image
                      src={`/assets/images/${item.toLowerCase()}.png`}
                      alt="Decor"
                      width={0}
                      height={0}
                      sizes="100%"
                      style={{ width: "100%", height: "auto" }}
                      className="hover:scale-125 transition-all duration-500 hidden md:inline"
                    />
                    <Image
                      src={`/assets/images/${item.toLowerCase()}-mobile.png`}
                      alt="Decor"
                      width={0}
                      height={0}
                      sizes="100%"
                      style={{ width: "100%", height: "auto" }}
                      className="hover:scale-125 transition-all duration-500 md:hidden"
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex flex-row left-3 gap-3">
              {categoryList.map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg w-[33vw] md:w-[20vw]"
                >
                  <Link
                    href={`/decor/view?category=${item}`}
                    className="rounded-lg hover:overflow-hidden hover:z-40 transition-all"
                  >
                    <Image
                      src={`/assets/images/${item.toLowerCase()}.png`}
                      alt="Decor"
                      width={0}
                      height={0}
                      sizes="100%"
                      style={{ width: "100%", height: "auto" }}
                      className="hover:scale-125 transition-all duration-500 hidden md:inline"
                    />
                    <Image
                      src={`/assets/images/${item.toLowerCase()}-mobile.png`}
                      alt="Decor"
                      width={0}
                      height={0}
                      sizes="100%"
                      style={{ width: "100%", height: "auto" }}
                      className="hover:scale-125 transition-all duration-500 md:hidden"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="z-20 flex flex-col md:flex-row gap-2 items-center justify-around p-6 md:px-12 md:py-8">
          <p className="text-rose-900 md:w-2/3">
            {
              "Your one-stop shop for affordable and elegant weddings. Simplify planning with fixed-price stage decor, creative entry ideas, stylish furniture rentals, and more. Where affordability meets creativity for your special day."
            }
          </p>
          <Link
            href={`/decor/`}
            className="bg-rose-900 rounded-full p-1 px-8 text-white w-max mt-2 md:mt-0 uppercase"
          >
            Explore Now
          </Link>
        </div>
      </section>
      <section className={`${styles.section__1} flex flex-col md:py-16 gap-6`}>
        <Image
          src="/assets/background/bg-section-1-mobile.png"
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "auto" }}
          className="md:hidden"
        />
        <span className="text-2xl md:text-4xl -mt-16 md:mt-0 bg-white md:bg-transparent relative">
          <span className="flex gap-2 mb-2 md:mb-0">
            Say <span className="text-[#D33467] flex">I DO </span>
            <Image
              src={tickGif}
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "1em", height: "auto" }}
            />
          </span>
          {/* <br /> */}
          To Expert Wedding Planning!
        </span>
        <p className="md:w-1/3 bg-white md:bg-transparent">
          Are you ready to say ‘I Do’ to a wedding that exceeds your wildest
          dreams? Our certified wedding planners are here to make it happen. Get
          a free consultation and say goodbye to wedding planning stress and
          hello to seamless perfection.{" "}
        </p>
        {data.secondary.success ? (
          <p className="md:w-1/3">
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
              className="md:w-1/4 text-black bg-transparent border-0 border-b-gray-500 outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0  placeholder:text-black"
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
              disabled={data.secondary.otpSent}
              className="md:w-1/4 text-black bg-transparent border-0 border-b-gray-500 outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0  placeholder:text-black"
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
                className="md:w-1/4 text-black bg-transparent border-0 border-b-gray-500 outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0  placeholder:text-black"
              />
            )}
            {data.secondary.message && (
              <p className="text-red-500 w-1/4">{data.secondary.message}</p>
            )}
            <button
              type="submit"
              className="md:w-1/4 rounded-full bg-black text-white py-2 disabled:bg-black/50"
              disabled={
                !data.secondary.name ||
                !data.secondary.phone ||
                // !/^\d{10}$/.test(data.secondary.phone) ||
                // processMobileNumber(data.secondary.phone) ||
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
      <section
        className={`${styles.section__2} flex flex-col gap-12 p-6 md:py-16 md:px-24`}
      >
        <p className="text-[#D33467] flex font-medium gap-2">
          <span className="text-4xl md:text-6xl">THE BEST</span>
          <span className="text-sm md:text-xl flex flex-col">
            <span>IN</span>

            <span>TOWN</span>
          </span>
          <span className="text-4xl md:text-6xl">!</span>
        </p>
        <p className="text-center text-2xl md:text-3xl">
          What Makes Wedsy Stand Out?
        </p>
        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-12 mx-auto">
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
      <PlanYourEvent />
      {/* Testimonial Desktop */}
      <section className="w-full relative hidden md:block">
        <Image
          src={pinkBgGif}
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "50%" }}
          className="absolute top-0 -z-10"
        />
        <div className="flex p-4 md:py-16 md:px-24 flex-row items-center">
          <div className="p-4 w-2/3 self-stretch flex flex-col gap-4">
            <p className="font-semibold md:text-4xl relative flex flex-row gap-2 relative">
              Customers{" "}
              {/* <Image
                src={heartGif}
                alt="Decor"
                width={0}
                height={0}
                sizes="100%"
                style={{ width: "1em", height: "auto" }}
              />{" "} */}
              <FaHeart />
              Wedsy
            </p>
            <Rating>
              <p className="ml-2 text-lg font-bold">4.8</p>
              <Rating size="md">
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={true} />
              </Rating>
              <FcGoogle size={24} className="ml-2" />
            </Rating>
            <p className="">
              Customers love Wedsy for its seamless wedding planning experience,
              offering a curated selection of wewdding exxentials and
              personalised services that simplfy the process and make their
              special day truly memorable
            </p>
            <div className="mt-auto mb-4 w-2/3 mx-auto">
              <p>
                {
                  "“Very reliable and systematic team that brings your vision to life and require no repeated follow up. so happy to have had them do the decor for my engagement. All the best to the team. “"
                }
              </p>
              <p className="text-right">-Anju alex</p>
            </div>
          </div>
          <div className="w-1/3 relative">
            <Image
              src="/assets/images/testimonial.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "80%", height: "auto" }}
              className="mx-auto"
            />
          </div>
        </div>
      </section>
      {/* Testimonial Mobile */}
      <section className="w-full relative md:hidden">
        <Image
          src={pinkBgGif}
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "100%" }}
          className="absolute top-0 -z-10"
        />
        <p className="font-medium text-2xl relative flex flex-row gap-2 relative py-6 items-center justify-center">
          Customers <FaHeart />
          Wedsy
        </p>
        <Rating className="justify-center">
          <p className="ml-2 text-lg font-bold">4.8</p>
          <Rating size="md">
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={true} />
          </Rating>
          <FcGoogle size={24} className="ml-2" />
        </Rating>
        <div className="flex p-4 md:py-16 md:px-24 flex-row items-center">
          <div className="w-2/3 relative">
            <Image
              src="/assets/images/testimonial.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "80%", height: "auto" }}
              className="mx-auto"
            />
          </div>
          <div className="p-4 w-1/3 self-stretch flex flex-col gap-4">
            <p className="text-sm text-justify">
              {
                "“Very reliable and systematic team that brings your vision to life and require no repeated follow up. so happy to have had them do the decor for my engagement. All the best to the team. “"
              }
            </p>
            <p className="text-right">-Anju alex</p>
          </div>
        </div>
      </section>
      <section className="mt-8 mb-8">
        <div className="w-full py-12 relative">
          <p className="mb-32 md:mb-0 text-center text-rose-900 text-xl font-semibold tracking-wider uppercase px-6 md:px-16 md:w-1/2 md:translate-y-full">
            {
              "“ A wedding is not just a day, it's a journey, a story, and a promise of a lifetime “"
            }
          </p>
          <Image
            src="/assets/images/couple.png"
            alt="flower"
            width={0}
            height={0}
            sizes="100%"
            className="absolute bottom-0 right-12 hidden md:inline"
            style={{ height: "20em", width: "auto" }}
          />
          <Image
            src="/assets/images/couple.png"
            alt="flower"
            width={0}
            height={0}
            sizes="100%"
            className="absolute bottom-0 right-6 inline md:hidden"
            style={{ height: "15em", width: "auto" }}
          />
          <div className="w-2/3 md:w-1/2 bg-gradient-to-t from-rose-900 to-transparent rounded-bl-3xl p-6 px-8 ml-auto md:ml-0 md:translate-x-full relative">
            <Image
              src="/assets/images/flowers-1.png"
              alt="flower"
              width={0}
              height={0}
              sizes="100%"
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:inline"
              style={{ height: "8em", width: "auto" }}
            />
            <div className="flex flex-col items-end max-w-max">
              <span className="font-medium text-2xl text-rose-900 md:tracking-[0.4em]">
                JOIN NOW
              </span>
              <Link href={"/login"}>
                <BsArrowRightShort
                  size={48}
                  className="cursor-pointer scale-[0.5] md:scale-[1] rounded-full bg-gradient-to-b from-rose-900/0 to-rose-900"
                  color="white"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
