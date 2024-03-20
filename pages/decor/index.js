import DecorCard from "@/components/cards/DecorCard";
import DecorQuotation from "@/components/screens/DecorQuotation";
import PlanYourEvent from "@/components/screens/PlanYourEvent";
import { processMobileNumber } from "@/utils/phoneNumber";
import { toProperCase } from "@/utils/text";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaInfinity } from "react-icons/fa";
import styles from "@/styles/DecorPage.module.css";
import FAQAccordion from "@/components/accordion/FAQAccordion";
import DecorDisclaimer from "@/components/marquee/DecorDisclaimer";

function Decor({ bestSeller, popular, userLoggedIn, user, spotlightList }) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const spotlightRef = useRef(null);
  const spotlightHorizontalRef = useRef(null);
  const [spotlightSwipe, setSpotlightSwipe] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({
    phone: "",
    name: "",
    loading: false,
    success: false,
    otpSent: false,
    Otp: "",
    ReferenceId: "",
    message: "",
  });
  const [categoryList, setCategoryList] = useState([
    "Stage",
    "Pathway",
    "Entrance",
    "Photobooth",
    "Mandap",
    "Nameboard",
  ]);
  const [bestSellerIndex, setBestSellerIndex] = useState([0, 1]);
  const [popularIndex, setPopularIndex] = useState([0, 1]);
  const handleEnquiry = () => {
    setEnquiryForm({
      ...enquiryForm,
      loading: true,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: enquiryForm.name,
        phone: processMobileNumber(enquiryForm.phone),
        verified: true,
        source: "Decor Landing Page",
        Otp: enquiryForm.Otp,
        ReferenceId: enquiryForm.ReferenceId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (
          response.message === "Enquiry Added Successfully" &&
          response.token
        ) {
          setEnquiryForm({
            phone: "",
            name: "",
            loading: false,
            success: true,
            otpSent: false,
            Otp: "",
            ReferenceId: "",
            message: "",
          });
          localStorage.setItem("token", response.token);
        } else {
          setEnquiryForm({
            ...enquiryForm,
            loading: false,
            Otp: "",
            message: response.message,
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const SendOTP = async () => {
    if (await processMobileNumber(enquiryForm.phone)) {
      setEnquiryForm({
        ...enquiryForm,
        loading: true,
      });
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: processMobileNumber(enquiryForm.phone),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setEnquiryForm({
            ...enquiryForm,
            loading: false,
            otpSent: true,
            ReferenceId: response.ReferenceId,
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
    let intervalId;
    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        setSpotlightIndex(
          (prevSlide) => (prevSlide + 1) % spotlightList.length
        );
      }, 15000); // Change slide every 15 seconds
    };
    const resetAutoPlay = () => {
      clearInterval(intervalId);
      startAutoPlay();
    };
    startAutoPlay();
    const spotLightContainer = document.getElementById("spotlight");
    if (spotLightContainer) {
      spotLightContainer.addEventListener("mouseenter", resetAutoPlay);
      spotLightContainer.addEventListener("mouseleave", resetAutoPlay);
    }
    return () => {
      clearInterval(intervalId);
      if (spotLightContainer) {
        spotLightContainer.removeEventListener("mouseenter", resetAutoPlay);
        spotLightContainer.removeEventListener("mouseleave", resetAutoPlay);
      }
    };
  }, [spotlightIndex]);

  useEffect(() => {
    const handleTouchStart = (e) => {
      spotlightHorizontalRef.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e) => {
      if (!spotlightHorizontalRef.current) return;
      const deltaX = e.touches[0].clientX - spotlightHorizontalRef.current;
      let sensitivity = 100;
      let l = spotlightList.length;
      if (deltaX > sensitivity) {
        setSpotlightSwipe("right");
        if (spotlightSwipe) {
          setSpotlightIndex(spotlightIndex === 0 ? l - 1 : spotlightIndex - 1);
        }
      } else if (deltaX < -1 * sensitivity) {
        setSpotlightSwipe("left");
        if (spotlightSwipe === null) {
          setSpotlightIndex(spotlightIndex === l - 1 ? 0 : spotlightIndex + 1);
        }
      }
    };
    const handleTouchEnd = () => {
      setSpotlightSwipe(null);
      spotlightHorizontalRef.current = null;
    };
    const div = spotlightRef.current;
    div.addEventListener("touchstart", handleTouchStart);
    div.addEventListener("touchmove", handleTouchMove);
    div.addEventListener("touchend", handleTouchEnd);

    return () => {
      div.removeEventListener("touchstart", handleTouchStart);
      div.removeEventListener("touchmove", handleTouchMove);
      div.removeEventListener("touchend", handleTouchEnd);
    };
  }, [spotlightRef, spotlightList, spotlightIndex, spotlightSwipe]);

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="6NQH3LHjenBtdQYZzStAqCj51nFRb1P4Pb5jhIdugB0"
        />
        <title>
          Wedding & Hall Decoration | Flower Decorators in Bangalore | Wedsy
        </title>
        <meta
          name="description"
          content="Turn your dream wedding into reality with Wedsy's exquisite wedding decorations. From vibrant wedding flowers to elegant hall designs, our decorators in Bangalore craft unforgettable moments."
        />
        <meta
          name="keywords"
          content="wedding decorations,wedding flower decoration,wedding hall decoration,flower decorators in bangalore,decorators in bangalore,wedding decorators in bangalore"
        />
        <meta name="robots" content="index, follow" />
        <meta name="copyright" content="Wedsy" />
        <meta name="language" content="EN" />
      </Head>
      <DecorDisclaimer />
      <main className="relative" id="mainDiv">
        <Image
          src="/assets/images/decor-1.png"
          alt="Decor"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="hidden md:block"
        />
        <Image
          src="/assets/images/decor-1-mobile.png"
          alt="Decor"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="md:hidden"
        />
        {/* Enquiry Form */}
        <div className="hidden md:flex absolute top-2/3 left-2/3 w-1/4 flex-col gap-3 text-center">
          {enquiryForm.success ? (
            <p className="text-white">
              Your Wedsy Wedding Manager will contact you and assist you in
              choosing the best!
            </p>
          ) : (
            <>
              <input
                type="text"
                placeholder="NAME"
                value={enquiryForm.name}
                onChange={(e) =>
                  setEnquiryForm({ ...enquiryForm, name: e.target.value })
                }
                name="name"
                className="text-center text-white bg-transparent border-0 border-b-white/80 outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-white focus:ring-0  placeholder:text-white"
              />
              <input
                type="text"
                placeholder="PHONE NO."
                value={enquiryForm.phone}
                onChange={(e) =>
                  setEnquiryForm({
                    ...enquiryForm,
                    phone: e.target.value,
                  })
                }
                name="phone"
                disabled={enquiryForm.otpSent}
                className="text-center text-white bg-transparent border-0 border-b-white/80 outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-white focus:ring-0  placeholder:text-white"
              />
              {enquiryForm.otpSent && (
                <input
                  type="text"
                  placeholder="OTP"
                  value={enquiryForm.Otp}
                  onChange={(e) =>
                    setEnquiryForm({
                      ...enquiryForm,
                      Otp: e.target.value,
                    })
                  }
                  name="otp"
                  className="text-center text-white bg-transparent border-0 border-b-white/80 outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-white focus:ring-0  placeholder:text-white"
                />
              )}
              {enquiryForm.message && (
                <p className="text-red-500">{enquiryForm.message}</p>
              )}
              <button
                type="submit"
                className="rounded-full bg-white text-black py-2 disabled:bg-white/50"
                disabled={
                  !enquiryForm.name ||
                  !enquiryForm.phone ||
                  // !/^\d{10}$/.test(enquiryForm.phone) ||
                  // processMobileNumber(enquiryForm.phone) ||
                  enquiryForm.loading ||
                  (enquiryForm.otpSent ? !enquiryForm.Otp : false)
                }
                onClick={() => {
                  enquiryForm.otpSent ? handleEnquiry() : SendOTP();
                }}
              >
                {enquiryForm.loading ? (
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
        </div>
      </main>{" "}
      {/* Categories Grid*/}
      <section className="py-8 md:py-16 px-6 md:px-24">
        <p className="md:mt-6 text-2xl md:text-4xl mb-4 md:mb-8 font-semibold text-center text-rose-900 md:text-black">
          CATEGORIES
        </p>
        <div className="grid grid-cols-3 gap-6 md:gap-16">
          {categoryList.map((item, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <div key={index} className="relative overflow-hidden rounded-xl">
                <Link
                  href={`/decor/view?category=${item}`}
                  className="hover:z-40 transition-all overflow-hidden"
                >
                  <Image
                    src={`/assets/images/${item.toLowerCase()}-desktop-sq.png`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="hover:scale-125 transition-all duration-500 hidden md:inline"
                  />
                  <Image
                    src={`/assets/images/${item.toLowerCase()}-mobile-sq.png`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="hover:scale-125 transition-all duration-500 md:hidden"
                  />
                  <div className="hidden md:block absolute bottom-0 py-6 w-full">
                    <p className="text-center text-lg font-semibold">
                      {item.toUpperCase()}
                    </p>
                  </div>
                </Link>
              </div>
              <Link
                href={`/decor/view?category=${item}`}
                className="text-center text-sm font-medium md:hidden"
              >
                {item.toUpperCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* BestSellers */}
      <section className="px-4 md:px-24 py-8 md:mt-8">
        <div className="flex justify-between relative">
          <h2 className="font-medium text-2xl md:text-4xl">
            Our <span className="text-[#840032] font-medium">BESTSELLERS!</span>
          </h2>
          <Link
            href="/decor/view"
            className="px-12 py-2 bg-[#840032] text-white rounded-lg hidden md:inline mr-20 z-40"
          >
            View More
          </Link>
          <div className="hidden md:block absolute top-5 md:-top-12 right-0 md:-right-12 leading-[36px] md:leading-[120px] text-white text-opacity-0 text-[36px] md:text-[120px] font-normal font-['Maitree'] font-outline-1">
            DECORE
          </div>
        </div>
        {/* BestSeller Desktop */}
        <div className="hidden md:flex flex-row md:gap-12 justify-between items-center my-6">
          <BsArrowLeftShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = bestSeller.length;
              let prev = bestSellerIndex[0];
              let next = bestSellerIndex[1];
              next = prev;
              if (prev === 0) {
                prev = length - 1;
              } else {
                prev--;
              }
              setBestSellerIndex([prev, next]);
            }}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 md:gap-12 grow">
            {bestSeller[bestSellerIndex[0]] && (
              <DecorCard decor={bestSeller[bestSellerIndex[0]]} />
            )}
            {bestSeller[bestSellerIndex[1]] && (
              <DecorCard
                decor={bestSeller[bestSellerIndex[1]]}
                className="hidden md:inline"
              />
            )}
          </div>
          <BsArrowRightShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = bestSeller.length;
              let prev = bestSellerIndex[0];
              let next = bestSellerIndex[1];
              prev = next;
              if (next === length - 1) {
                next = 0;
              } else {
                next++;
              }
              setBestSellerIndex([prev, next]);
            }}
          />
        </div>
        {/* BestSeller Mobile */}
        <div className="hide-scrollbar flex md:hidden flex-row gap-8 flex-nowrap items-center my-6 overflow-x-auto">
          {bestSeller.map((item, index) => (
            <div className="min-w-[75vw] w-[80vw]" key={index}>
              <DecorCard decor={item} />
            </div>
          ))}
        </div>
      </section>
      {/* MARQUEE FOR CATEGORIES NAMES */}
      <section className="bg-[#840032] text-white font-semibold">
        <div className="relative flex overflow-x-hidden">
          <div className="py-4 animate-marquee whitespace-nowrap">
            <span className="mx-8 text-xl text-white">PATHWAY</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">ENTRANCE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">STAGE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">MANDAP</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">PHOTOBOOTH</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">NAMEBOARD</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">ENTRANCE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">PATHWAY</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">MANDAP</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">STAGE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">NAMEBOARD</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">PHOTOBOOTH</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
          </div>
          <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
            <span className="mx-8 text-xl text-white">PATHWAY</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">ENTRANCE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">STAGE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">MANDAP</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">PHOTOBOOTH</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">NAMEBOARD</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">ENTRANCE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">PATHWAY</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">MANDAP</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">STAGE</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-white">NAMEBOARD</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
            <span className="mx-8 text-xl text-black">PHOTOBOOTH</span>
            <span className="mx-0 text-xl text-white">&#x2022;</span>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-24 md:py-12" id="spotlight">
        <p className="text-black text-lg md:text-2xl font-normal font-light leading-normal uppercase text-center mt-6">
          {'"Decorating your love story, one beautiful detail at a time"'}
        </p>
        <div ref={spotlightRef}>
          {spotlightList.length > 0 && spotlightList[spotlightIndex]._id && (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 m-6 mt-10 md:gap-8 bg-[${spotlightList[spotlightIndex].spotlightColor}]`}
              style={{
                backgroundColor: spotlightList[spotlightIndex].spotlightColor,
              }}
            >
              <div className="relative h-72 md:hidden">
                <Image
                  src={spotlightList[spotlightIndex].thumbnail}
                  alt="Decor Image"
                  width={0}
                  height={0}
                  sizes="100%"
                  // fill="cover"
                  // layout={"fill"}
                  // objectFit="cover"
                  layout={"fill"}
                  objectFit="cover"
                  className="w-full"
                />
              </div>
              <div className=" flex flex-col p-6 justify-between md:py-8 order-last md:order-first gap-4 md:gap-4">
                <p className="text-xl md:text-3xl font-semibold">
                  {spotlightList[spotlightIndex].name}
                </p>
                <p className="hidden md:block">
                  {spotlightList[spotlightIndex].description}
                </p>
                <div className="flex flex-col">
                  <p className="font-medium text-lg md:text-2xl">
                    Can be used for
                  </p>
                  {spotlightList[
                    spotlightIndex
                  ].productVariation?.occassion?.map((item, index) => (
                    <p key={index} className="text-sm md:text-base">
                      {toProperCase(item)}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg md:text-2xl">Included</p>
                  {spotlightList[spotlightIndex].productInfo.included.map(
                    (item, index) => (
                      <p key={index} className="text-sm md:text-base">
                        {toProperCase(item)}
                      </p>
                    )
                  )}
                </div>
                <div className="flex flex-row justify-between mt-auto">
                  <p className="text-xl md:text-3xl font-semibold text-right md:text-left">
                    ₹{" "}
                    {spotlightList[spotlightIndex].productInfo.variant
                      .artificialFlowers.sellingPrice ||
                      spotlightList[spotlightIndex].productInfo.variant
                        .mixedFlowers.sellingPrice ||
                      spotlightList[spotlightIndex].productInfo.variant
                        .naturalFlowers.sellingPrice}
                  </p>
                  <Link
                    href={`/decor/view/${spotlightList[spotlightIndex]._id}`}
                  >
                    <button className="mt-0 bg-black text-white py-2 px-4 md:px-8 rounded-lg">
                      View More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative h-full hidden md:block w-full">
                <Image
                  src={spotlightList[spotlightIndex].thumbnail}
                  alt="Decor"
                  // width={0}
                  // height={0}
                  sizes="100%"
                  // fill="cover"
                  layout={"fill"}
                  objectFit="cover"
                  // style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          )}
        </div>
        {spotlightList.length > 0 && (
          <div className="flex flex-row gap-2 md:gap-4 items-center justify-center">
            {spotlightList.map((item, index) => (
              <span
                key={index}
                className={`cursor-pointer rounded-full h-2 md:h-4 w-2 md:w-4 ${
                  index === spotlightIndex ? "bg-black" : "bg-gray-400"
                }`}
                onClick={() => {
                  setSpotlightIndex(index);
                }}
              ></span>
            ))}
          </div>
        )}
      </section>
      <section className="px-6 md:px-24 py-8 md:mt-8">
        <div className="flex justify-between">
          <h2 className="font-light text-2xl md:text-4xl">
            <span className="font-medium">POPULAR</span> searches
          </h2>
          <Link
            href="/decor/view"
            className="hidden md:inline px-12 py-2 bg-[#840032] text-white rounded-lg mr-20"
          >
            View More
          </Link>
        </div>
        {/* Popular Desktop */}
        <div className="hidden md:flex flex-row md:gap-12 justify-between items-center my-6">
          <BsArrowLeftShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = popular.length;
              let prev = popularIndex[0];
              let next = popularIndex[1];
              next = prev;
              if (prev === 0) {
                prev = length - 1;
              } else {
                prev--;
              }
              setPopularIndex([prev, next]);
            }}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 grow">
            {popular[popularIndex[0]] && (
              <DecorCard decor={popular[popularIndex[0]]} />
            )}
            {popular[popularIndex[1]] && (
              <DecorCard
                decor={popular[popularIndex[1]]}
                className="hidden md:inline"
              />
            )}
          </div>
          <BsArrowRightShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = popular.length;
              let prev = popularIndex[0];
              let next = popularIndex[1];
              prev = next;
              if (next === length - 1) {
                next = 0;
              } else {
                next++;
              }
              setPopularIndex([prev, next]);
            }}
          />
        </div>
        {/* Popular Mobile */}
        <div className="hide-scrollbar flex md:hidden flex-row gap-8 flex-nowrap items-center my-6 overflow-x-auto">
          {popular.map((item, index) => (
            <div className="min-w-[75vw] w-[80vw]" key={index}>
              <DecorCard decor={item} />
            </div>
          ))}
        </div>
      </section>
      <div
        className="p-8 flex flex-row justify-around items-center md:px-48"
        style={{
          background:
            "linear-gradient(180deg, rgba(245, 211, 215, 0.00) 0%, #EDA4AC 25%, #EDA4AC 75%, rgba(245, 211, 215, 0.00) 100%)",
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-4xl font-bold">750+</span>
          <span className="font-semibold text-sm md:text-lg">DESIGNS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-4xl font-bold">1000+</span>
          <span className="font-semibold text-sm md:text-lg">WEDDINGS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-6xl font-bold">
            <FaInfinity />
          </span>
          <span className="font-semibold text-sm md:text-lg">
            <span className="md:hidden">{"😁"}</span>
            <span className="hidden md:inline">{"HAPPY"}</span> CUSTOMERS
          </span>
        </div>
      </div>{" "}
      {/* Categories Image Marquee */}
      {/* <div className="py-8">
        <p className="md:mt-6 text-2xl md:text-3xl mb-4 md:mb-8 font-semibold text-center">
          CATEGORIES
        </p>
        <div className="relative overflow-x-hidden flex flex-row flex-nowrap">
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
                    src={`/assets/images/${item.toLowerCase()}-mobile-text.png`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="hover:scale-125 transition-all duration-500 md:hidden"
                  />
                  <div className="hidden md:block origin-top-left bg-gradient-to-b to-white from-white/0 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
                    <p className="text-center">{item.toUpperCase()}</p>
                  </div>
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
                    src={`/assets/images/${item.toLowerCase()}-mobile-text.png`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="hover:scale-125 transition-all duration-500 md:hidden"
                  />
                  <div className="hidden md:block origin-top-left bg-gradient-to-b to-white from-white/0 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
                    <p className="text-center">{item.toUpperCase()}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <PlanYourEvent />
      <DecorQuotation userLoggedIn={userLoggedIn} user={user} />
      <div
        className={`py-6 md:py-20 px-4 md:px-24 text-center flex flex-col gap-6 ${styles.bg_main_section} mt-8`}
      >
        <h1 className="text-3xl uppercase font-semibold leading-relaxed">
          &#34;Transforming Wedding Dreams into Reality: The Art of Bespoke
          Decorations by Wedsy&#34;
        </h1>
        <p className="text-xl font-normal">
          Elevate your special day with Wedsy, renowned wedding decorators in
          Bangalore. Specializing in enchanting hall and flower decorations, our
          team creates bespoke experiences capturing the essence of your love
          story. From concept to the final touch, our flower decorators use only
          the freshest blooms for a stunning backdrop. Whether a lavish affair
          or intimate gathering, Wedsy&#39;s commitment to excellence brings
          your wedding visions to life with elegance. Trust us for unforgettable
          decorations as timeless as your wedding day.
        </p>
      </div>
      <div className="py-6 md:py-12 px-4 md:px-24 flex flex-col gap-6 bg-gradient-to-b from-white to-[#CEA15B]">
        <Image
          src="/assets/images/decor-faq-img.png"
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{
            width: "80vw",
            height: "auto",
            margin: "2em auto",
            marginBottom: "4em",
          }}
        />
        <h2 className="text-2xl uppercase font-semibold text-center mb-8">
          MOST FREQUENTLY ASKED QUESTIONS BY OUR CUSTOMERS
        </h2>
        <div className="divide-y-2 divide-black divide-dashed text-lg">
          <FAQAccordion
            question={"What is the event tool?"}
            answer={`The event tool is a specially designed organizational tool for your events. Simply create an event, such as "Rahul's wedding," and add multiple event days like haldi, sangeet, and the wedding ceremony. Once set up, easily add your selected decor to the respective event days. This tool ensures your event stays well-organized and hassle-free.`}
          />
          <FAQAccordion
            question={
              "What unique wedding decoration themes can Wedsy offer for my wedding in Bangalore?"
            }
            answer={`At Wedsy, we create a variety of stunning themes that range from traditional to contemporary for your wedding decoration needs. Our team specializes in customizing themes that resonate with your story, all the while incorporating the beauty of Bangalore's diverse culture.`}
          />
          <FAQAccordion
            question={`How can Wedsy enhance my wedding venue with exceptional wedding hall decoration?`}
            answer={`Our expert decorators at Wedsy are skilled in transforming any wedding hall in Bangalore into a magical setting. We carefully consider every element, from lighting to layout, ensuring that your wedding hall decoration is both breathtaking and memorable.`}
          />
          <FAQAccordion
            question={`Can I request specific types of flowers for my wedding flower decoration?`}
            answer={`Absolutely! We pride ourselves on personalizing each wedding flower decoration to your taste. Share your preferred flowers with us, and our talented flower decorators in Bangalore will incorporate them into your wedding's design palette with creativity and flair.`}
          />
          <FAQAccordion
            question={`Does Wedsy have packages for decorators in Bangalore?`}
            answer={`Yes, Wedsy offers a range of packages for wedding decorations that can be tailored to fit your specific needs and budget. Our packages include a variety of décor options curated by the best decorators in Bangalore to make your wedding truly exceptional.`}
          />
          <FAQAccordion
            question={`What makes Wedsy stand out from other wedding decorators in Bangalore?`}
            answer={`What sets Wedsy apart is our attention to detail and commitment to delivering personalized service. As leading wedding decorators in Bangalore, we pride ourselves on working closely with you to understand your vision and executing it beyond your expectations.`}
          />
          <FAQAccordion
            question={`How does Wedsy ensure the quality of wedding flower decoration?`}
            answer={`At Wedsy, quality is our top priority. Our flower decorators in Bangalore meticulously source the freshest, most vibrant flowers on the day of the event. Our designs are crafted to ensure the flowers maintain their beauty throughout your entire wedding day.`}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const bestSellerResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor?label=bestSeller`
    );
    const bestSellerData = await bestSellerResponse.json();
    const popularResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor?label=popular`
    );
    const popularData = await popularResponse.json();
    const spotlightListResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor?spotlight=true&random=false`
    );
    const spotlightListData = await spotlightListResponse.json();
    return {
      props: {
        bestSeller: bestSellerData.list.sort((a, b) => 0.5 - Math.random()),
        popular: popularData.list.sort((a, b) => 0.5 - Math.random()),

        spotlightList: spotlightListData.list,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        bestSeller: null,
        popular: null,

        spotlightList: null,
      },
    };
  }
}

export default Decor;
