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
        <div className="flex justify-between">
          <h2 className="font-medium text-4xl">
            Our <span className="text-[#840032] font-medium">BESTSELLERS!</span>
          </h2>
          <Link
            href="/decor-listing"
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
      <section className="bg-[#840032] text-white font-semibold">
        <div class="relative flex overflow-x-hidden">
          <div class="py-4 animate-marquee whitespace-nowrap">
            <span class="mx-4 text-xl">Marquee Item 1</span>
            <span class="mx-4 text-xl">Marquee Item 2</span>
            <span class="mx-4 text-xl">Marquee Item 3</span>
            <span class="mx-4 text-xl">Marquee Item 4</span>
            <span class="mx-4 text-xl">Marquee Item 5</span>
          </div>
          <div class="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
            <span class="mx-4 text-xl">Marquee Item 1</span>
            <span class="mx-4 text-xl">Marquee Item 2</span>
            <span class="mx-4 text-xl">Marquee Item 3</span>
            <span class="mx-4 text-xl">Marquee Item 4</span>
            <span class="mx-4 text-xl">Marquee Item 5</span>
          </div>
        </div>
      </section>
      <section className="px-24 py-12">
        <p class="text-black text-2xl font-normal font-light leading-normal uppercase text-center mt-6">
          {'"Decorating your love story, one beautiful detail at a time"'}
        </p>
      </section>
      <section className="px-24 py-8 mt-8">
        <div className="flex justify-between">
          <h2 className="font-light text-4xl">
            <span className="font-medium">POPULAR</span> searches
          </h2>
          <Link
            href="/"
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
    </>
  );
}
