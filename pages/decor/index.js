import DecorCard from "@/components/cards/DecorCard";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaInfinity } from "react-icons/fa";

export default function Decor() {
  return (
    <>
      <main className="relative" id="mainDiv">
        <Image
          src="/assets/images/decor-1.png"
          alt="Decor"
          //   fill={true}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          //   className="mx-auto my-8"
        />
      </main>
      <section className="px-24 py-8 mt-8">
        <div className="flex justify-between relative">
          <h2 className="font-medium text-4xl">
            Our <span className="text-[#840032] font-medium">BESTSELLERS!</span>
          </h2>
          <Link
            href="/decor/view"
            className="px-12 py-2 bg-[#840032] text-white rounded-lg mr-20"
          >
            View More
          </Link>
          <div className="absolute -top-24 -right-24 leading-[200px] text-white text-opacity-0 text-[200px] font-normal font-['Maitree'] font-outline-1">
            DECORE
          </div>
        </div>
        <div className="flex flex-row gap-12 justify-center items-center my-6">
          <BsArrowLeftShort size={48} />
          <div className="grid grid-cols-2 gap-12 ">
            <DecorCard
              image={"d1.png"}
              title={"Classic White"}
              price={"35000"}
            />
            <DecorCard
              image={"d2.jpg"}
              title={"Golden Lights"}
              price={"40000"}
            />
          </div>
          <BsArrowRightShort size={48} />
        </div>
      </section>
      <section className="bg-[#840032] text-white font-semibold">
        <div className="relative flex overflow-x-hidden">
          <div className="py-4 animate-marquee whitespace-nowrap">
            <span className="mx-4 text-xl">Marquee Item 1</span>
            <span className="mx-4 text-xl">Marquee Item 2</span>
            <span className="mx-4 text-xl">Marquee Item 3</span>
            <span className="mx-4 text-xl">Marquee Item 4</span>
            <span className="mx-4 text-xl">Marquee Item 5</span>
          </div>
          <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
            <span className="mx-4 text-xl">Marquee Item 1</span>
            <span className="mx-4 text-xl">Marquee Item 2</span>
            <span className="mx-4 text-xl">Marquee Item 3</span>
            <span className="mx-4 text-xl">Marquee Item 4</span>
            <span className="mx-4 text-xl">Marquee Item 5</span>
          </div>
        </div>
      </section>
      <section className="px-24 py-12">
        <p className="text-black text-2xl font-normal font-light leading-normal uppercase text-center mt-6">
          {'"Decorating your love story, one beautiful detail at a time"'}
        </p>
        <div className="grid grid-cols-2 m-6 mt-10 gap-8 bg-[#FBE2C8]">
          <div className=" flex flex-col p-6 justify-between py-8">
            <p className="text-3xl font-semibold">String Lights Photobooth</p>
            <p>
              A backdrop of string lights will not only bathe everyone in a
              flattering radiance but will also add a whimsical aspect to the
              scene.
            </p>
            <div className="flex flex-col">
              <p className="font-medium text-2xl">Can be used for</p>
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
                <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <span class="flex w-2.5 h-2.5 bg-black rounded-full mr-1.5 flex-shrink-0" />
                  Black
                </span>
              </p>
              <p>
                <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <span class="flex w-2.5 h-2.5 bg-yellow-500 rounded-full mr-1.5 flex-shrink-0" />
                  Gold
                </span>
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-3xl font-semibold">₹40000</p>
              <button className="bg-black text-white py-2 px-8 rounded-lg">
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
      <section className="px-24 py-8 mt-8">
        <div className="flex justify-between">
          <h2 className="font-light text-4xl">
            <span className="font-medium">POPULAR</span> searches
          </h2>
          <Link
            href="/decor/view"
            className="px-12 py-2 bg-[#840032] text-white rounded-lg mr-20"
          >
            View More
          </Link>
        </div>
        <div className="flex flex-row gap-12 justify-center items-center my-6">
          <BsArrowLeftShort size={48} />
          <div className="grid grid-cols-2 gap-12 ">
            <DecorCard
              image={"d1.png"}
              title={"Classic White"}
              price={"35000"}
            />
            <DecorCard
              image={"d2.jpg"}
              title={"Golden Lights"}
              price={"40000"}
            />
          </div>
          <BsArrowRightShort size={48} />
        </div>
      </section>
      <div
        className="p-8 flex flex-row justify-around items-center px-48"
        style={{
          background:
            "linear-gradient(180deg, rgba(245, 211, 215, 0.00) 0%, #EDA4AC 25%, #EDA4AC 75%, rgba(245, 211, 215, 0.00) 100%);",
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">750+</span>
          <span className="font-semibold">DESIGNS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">1000+</span>
          <span className="font-semibold">WEDDINGS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-6xl font-bold">
            <FaInfinity />
          </span>
          <span className="font-semibold">HAPPY CUSTOMERS</span>
        </div>
      </div>
      <div className="py-8">
        <p className="mt-6 text-3xl font-semibold text-center">CATEGORIES</p>
        <div className="flex overflow-x-hidden overflow-y-hidden mt-8 gap-3 flex-row relative">
          <div className="relative w-1/5 rounded-lg hover:scale-[1.05] hover:z-50">
            <Image
              src="/assets/images/pathway.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="origin-top-left bg-gradient-to-b to-white from-transparent via-white/60 via-50% absolute bottom-0 py-6 w-full">
              <p className="text-center">PATHWAY</p>
            </div>
          </div>
          <div className="relative w-1/5 rounded-lg hover:scale-[1.05] hover:z-50">
            <Image
              src="/assets/images/entrance.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="origin-top-left bg-gradient-to-b to-white from-transparent via-white/60 via-50% absolute bottom-0 py-6 w-full">
              <p className="text-center">ENTRANCE</p>
            </div>
          </div>
          <div className="relative w-1/5 rounded-lg hover:scale-[1.05] hover:z-50">
            <Image
              src="/assets/images/stage.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="origin-top-left bg-gradient-to-b to-white from-transparent via-white/60 via-50% absolute bottom-0 py-6 w-full">
              <p className="text-center">STAGE</p>
            </div>
          </div>
          <div className="relative w-1/5 rounded-lg hover:scale-[1.05] hover:z-50">
            <Image
              src="/assets/images/mandap.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="origin-top-left bg-gradient-to-b to-white from-transparent via-white/60 via-50% absolute bottom-0 py-6 w-full">
              <p className="text-center">MANDAP</p>
            </div>
          </div>
          <div className="relative w-1/5 rounded-lg hover:scale-[1.05] hover:z-50">
            <Image
              src="/assets/images/photobooth.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="origin-top-left bg-gradient-to-b to-white from-transparent via-white/60 via-50% absolute bottom-0 py-6 w-full">
              <p className="text-center">PHOTOBOOTH</p>
            </div>
          </div>
          <div className="relative w-1/5 rounded-lg hover:scale-[1.05] hover:z-50">
            <Image
              src="/assets/images/nameboard.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="origin-top-left bg-gradient-to-b to-white from-transparent via-white/60 via-50% absolute bottom-0 py-6 w-full">
              <p className="text-center">NAMEBOARD</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
