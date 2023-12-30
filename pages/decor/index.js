import DecorCard from "@/components/cards/DecorCard";
import DecorQuotation from "@/components/screens/DecorQuotation";
import PlanYourEvent from "@/components/screens/PlanYourEvent";
import { processMobileNumber } from "@/utils/phoneNumber";
import { toProperCase } from "@/utils/text";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaInfinity } from "react-icons/fa";

function Decor({ bestSeller, popular, userLoggedIn, user, spotlight }) {
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
  return (
    <>
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
                <p className="text-red-500 w-1/4">{enquiryForm.message}</p>
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
      {/* Categories */}
      <div className="py-8">
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
                    src={`/assets/images/${item.toLowerCase()}-mobile.png`}
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
                    src={`/assets/images/${item.toLowerCase()}-mobile.png`}
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
      </div>
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
      {/* MARQUEE FOR CATEGORIES */}
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
      <section className="px-6 md:px-24 md:py-12">
        <p className="text-black text-lg md:text-2xl font-normal font-light leading-normal uppercase text-center mt-6">
          {'"Decorating your love story, one beautiful detail at a time"'}
        </p>
        {spotlight._id && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 m-6 mt-10 md:gap-8 bg-[${spotlight.spotlightColor}]`}
            style={{ backgroundColor: spotlight.spotlightColor }}
          >
            <div className=" flex flex-col p-6 justify-between md:py-8 order-last md:order-first gap-4 md:gap-4">
              <p className="text-2xl md:text-3xl font-semibold">
                {spotlight.name}
              </p>
              <p>{spotlight.description}</p>
              <div className="flex flex-col">
                <p className="font-medium text-lg md:text-2xl">
                  Can be used for
                </p>
                {spotlight.productVariation?.occassion?.map((item, index) => (
                  <p key={index}>{toProperCase(item)}</p>
                ))}
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-2xl">Included</p>
                {spotlight.productInfo.included.map((item, index) => (
                  <p key={index}>{toProperCase(item)}</p>
                ))}
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-auto">
                <p className="text-3xl font-semibold">
                  ₹{" "}
                  {spotlight.productInfo.variant.artificialFlowers
                    .sellingPrice ||
                    spotlight.productInfo.variant.mixedFlowers.sellingPrice ||
                    spotlight.productInfo.variant.naturalFlowers.sellingPrice}
                </p>
                <Link href={`/decor/view/${spotlight._id}`}>
                  <button className="mt-6 md:mt-0 bg-black text-white py-2 px-8 rounded-lg">
                    View More
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative h-full">
              <Image
                src={spotlight.thumbnail}
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
      </div>
      <DecorQuotation userLoggedIn={userLoggedIn} user={user} />
      <PlanYourEvent />
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
    const spotlightResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor?spotlight=true&random=true`
    );
    const spotlightData = await spotlightResponse.json();
    return {
      props: {
        bestSeller: bestSellerData.list.sort((a, b) => 0.5 - Math.random()),
        popular: popularData.list.sort((a, b) => 0.5 - Math.random()),
        spotlight: spotlightData.decor,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        bestSeller: null,
        popular: null,
        spotlight: null,
      },
    };
  }
}

export default Decor;
