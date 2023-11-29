import DecorCard from "@/components/cards/DecorCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaInfinity } from "react-icons/fa";

function Decor({ bestSeller, popular }) {
  const [bestSellerIndex, setBestSellerIndex] = useState([0, 1]);
  const [popularIndex, setPopularIndex] = useState([0, 1]);
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
        />
      </main>
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
        <div className="flex flex-row md:gap-12 justify-between items-center my-6">
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
            <DecorCard decor={bestSeller[bestSellerIndex[0]]} />
            <DecorCard
              decor={bestSeller[bestSellerIndex[1]]}
              className="hidden md:inline"
            />
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
      </section>
      <section className="bg-[#840032] text-white font-semibold">
        <div className="relative flex overflow-x-hidden">
          <div className="py-4 animate-marquee whitespace-nowrap">
            <span className="mx-4 text-xl text-white">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-black">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-white">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-black">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-white">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-black">WEDDINGS MADE EASY</span>
          </div>
          <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
            <span className="mx-4 text-xl text-white">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-black">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-white">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-black">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-white">WEDDINGS MADE EASY</span>
            <span className="mx-4 text-xl text-black">WEDDINGS MADE EASY</span>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-24 md:py-12">
        <p className="text-black text-lg md:text-2xl font-normal font-light leading-normal uppercase text-center mt-6">
          {'"Decorating your love story, one beautiful detail at a time"'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 m-6 mt-10 md:gap-8 bg-[#FBE2C8]">
          <div className=" flex flex-col p-6 justify-between md:py-8 order-last md:order-first gap-4 md:gap-0">
            <p className="text-2xl md:text-3xl font-semibold">
              String Lights Photobooth
            </p>
            <p>
              A backdrop of string lights will not only bathe everyone in a
              flattering radiance but will also add a whimsical aspect to the
              scene.
            </p>
            <div className="flex flex-col">
              <p className="font-medium text-lg md:text-2xl">Can be used for</p>
              <p>Engagement</p>
              <p>Wedding</p>
              <p>Sangeet</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-2xl">Props used</p>
              <p>Halogen bulb</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-2xl">Colour Theme</p>
              <p>
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <span className="flex w-2.5 h-2.5 bg-black rounded-full mr-1.5 flex-shrink-0" />
                  Black
                </span>
              </p>
              <p>
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <span className="flex w-2.5 h-2.5 bg-yellow-500 rounded-full mr-1.5 flex-shrink-0" />
                  Gold
                </span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p className="text-3xl font-semibold">₹40000</p>
              <button className="mt-6 md:mt-0 bg-black text-white py-2 px-8 rounded-lg">
                Add to Event
              </button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/assets/temp/d3.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
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
        <div className="flex flex-row md:gap-12 justify-between items-center my-6">
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
            <DecorCard decor={popular[popularIndex[0]]} />
            <DecorCard
              decor={popular[popularIndex[1]]}
              className="hidden md:inline"
            />
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
      <div className="py-8">
        <p className="md:mt-6 text-2xl md:text-3xl font-semibold text-center">
          CATEGORIES
        </p>
        <div className=" overflow-x-hidden overflow-y-hidden mt-8 md:gap-3 flex flex-row relative">
          <Link
            href={`/decor/view?category=Pathway`}
            className="relative rounded-lg hover:scale-[1.05] hover:z-40 grow"
          >
            <Image
              src="/assets/images/pathway.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="hidden md:inline origin-top-left bg-gradient-to-b to-white from-white/40 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
              <p className="text-center">PATHWAY</p>
            </div>
          </Link>
          <Link
            href={`/decor/view?category=Entrance`}
            className="relative rounded-lg hover:scale-[1.05] hover:z-40 grow"
          >
            <Image
              src="/assets/images/entrance.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="hidden md:inline origin-top-left bg-gradient-to-b to-white from-white/40 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
              <p className="text-center">ENTRANCE</p>
            </div>
          </Link>
          <Link
            href={`/decor/view?category=Stage`}
            className="relative rounded-lg hover:scale-[1.05] hover:z-40 grow"
          >
            <Image
              src="/assets/images/stage.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="hidden md:inline origin-top-left bg-gradient-to-b to-white from-white/40 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
              <p className="text-center">STAGE</p>
            </div>
          </Link>
          <Link
            href={`/decor/view?category=Mandap`}
            className="relative rounded-lg hover:scale-[1.05] hover:z-40 grow"
          >
            <Image
              src="/assets/images/mandap.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="hidden md:inline origin-top-left bg-gradient-to-b to-white from-white/40 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
              <p className="text-center">MANDAP</p>
            </div>
          </Link>
          <Link
            href={`/decor/view?category=Photobooth`}
            className="relative rounded-lg hover:scale-[1.05] hover:z-40 grow"
          >
            <Image
              src="/assets/images/photobooth.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="hidden md:inline origin-top-left bg-gradient-to-b to-white from-white/40 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
              <p className="text-center">PHOTOBOOTH</p>
            </div>
          </Link>
          <Link
            href={`/decor/view?category=Nameboard`}
            className="relative rounded-lg hover:scale-[1.05] hover:z-40 grow"
          >
            <Image
              src="/assets/images/nameboard.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="hidden md:inline origin-top-left bg-gradient-to-b to-white from-white/40 via-white/60 via-30% absolute bottom-0 pb-4 pt-6 w-full">
              <p className="text-center">NAMEBOARD</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="py-16 px-24 bg-gradient-to-b from-amber-100/0 via-amber-100/100 to-amber-100/100">
        <p className="md:mt-6 text-2xl md:text-3xl font-semibold mb-8">
          PACKAGES
        </p>
        <div className="relative">
          <Image
            src="/assets/temp/package.png"
            alt="Decor"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="flex flex-row justify-center gap-16 mt-6 items-center">
          <BsArrowLeftShort
            size={24}
            className="cursor-pointer rounded-full bg-white"
          />
          <div className="flex flex-col text-center">
            <p className="font-medium">ALL FOR</p>
            <p className="font-semibold text-xl">₹2,00,000</p>
          </div>
          <BsArrowRightShort
            size={24}
            className="cursor-pointer rounded-full bg-white"
          />
        </div>
        <p className="md:mt-24 text-2xl md:text-3xl font-medium mb-8">
          Have a decor in mind? Get an instant quote!
        </p>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <p className="w-2/3 text-lg">
              {
                "Have a decor picture with you but you still don’t know how much it’s gonna cost? Upload your decor picture and Wedsy will revert back to you in 24 hours with a quote"
              }
            </p>
            <div className="mt-8 flex flex-row gap-8 justify-center w-2/3">
              <input
                type="text"
                placeholder="CITY"
                name="city"
                className="flex-grow pb-0 text-center bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0 placeholder:text-gray-500 placeholder:font-medium"
              />
              <input
                type="text"
                placeholder="ADDITIONAL COMMENTS"
                name="comments"
                className="flex-grow pb-0 text-center bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0 placeholder:text-gray-500 placeholder:font-medium"
              />
            </div>
          </div>
          <div className="bg-[#57575799] mx-4 rounded-xl flex flex-col items-center justify-center gap-4">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
            />
            <label for="fileInput" className="bg-white p-2 rounded-full ">
              <AiOutlinePlus size={24} />
            </label>
            <span id="fileName" className="text-sm">
              UPLOAD HERE
            </span>
          </div>
        </div>
      </div>
      <section className="w-full px-16 py-12 ">
        <p className="font-semibold text-4xl mb-12">
          PLAN YOUR EVENT NOW WITH OUR NEW EVENT TOOL!
        </p>
        <div className="flex gap-6 relative">
          <div className="flex flex-col gap-8 ">
            <p className="text-xl w-2/3">
              Explore the ease of planning with our event tool at Wedsy.
            </p>
            <p className="text-xl w-2/3">
              Utilize the tool to shortlist and choose your decorations
              effortlessly - all in one place, at Wedsy.
            </p>
            <Link
              href={`/event`}
              className="bg-rose-900 rounded-full p-1 px-16 text-white w-max mx-auto mt-auto mb-12"
            >
              Try Now!
            </Link>
          </div>
          <Image
            src="/assets/images/event-tool.png"
            alt="Decor"
            width={0}
            height={0}
            sizes="20%"
            style={{ width: "20%", height: "auto", marginLeft: "auto" }}
          />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/decor`);
    const data = await response.json();
    return {
      props: {
        bestSeller: data.list,
        popular: data.list,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        bestSeller: null,
        popular: null,
      },
    };
  }
}

export default Decor;
