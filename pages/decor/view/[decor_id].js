import { LiaSearchSolid } from "react-icons/lia";
import { AiFillHeart } from "react-icons/ai";
import {
  Button,
  Checkbox,
  Dropdown,
  Label,
  Rating,
  TextInput,
} from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";
import Image from "next/image";
import SearchBar from "@/components/searchBar/SearchBar";

export default function DecorListing() {
  return (
    <>
      <div className="md:p-8 grid grid-cols-1 md:grid-cols-4 md:gap-8">
        <div className="order-last md:order-first border-t md:border-t-0 md:border-r border-black flex flex-col md:divide-y gap-4 md:divide-black md:pr-6">
          <p className="text-xl font-medium hidden md:block">Description</p>
          <div className="flex flex-col pt-4 px-4 md:px-0">
            <p className="text-lg flex flex-row justify-between">
              Can be used for
            </p>
            {[
              "Reception",
              "Engagement",
              "Wedding",
              "Sangeet",
              "Anniversaries",
            ].map((item, index) => (
              <p className="" key={index}>
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col pt-4 px-4 md:px-0">
            <p className="text-lg flex flex-row justify-between">
              Flowers used
            </p>
          </div>
          <div className="flex flex-col pt-4 px-4 md:px-0">
            <p className="text-lg flex flex-row justify-between">
              Colour Theme
            </p>
          </div>
          <div className="flex flex-col pt-4 md:border-b md:border-black px-4 md:px-0">
            <p className="text-lg flex flex-row justify-between">Placement</p>
          </div>
        </div>
        <div className="md:col-span-3 py-3 px-4 md:px-0 md:py-6">
          <div className="md:px-10 relative">
            <div className="w-full md:w-1/2 mb-4">
              <SearchBar />
            </div>
            <div className="flex flex-row justify-between mb-6">
              <p className="font-semibold text-2xl">Classic White</p>
              <Rating size={"md"}>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
            </div>
            <Image
              src={`/assets/temp/d1.png`}
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
              className="rounded-xl"
            />
            <div className="flex flex-row flex-wrap gap-4 items-center mt-3">
              <p className="mr-auto font-semibold text-xl ">₹ 40000</p>
              <Dropdown
                inline
                arrowIcon={false}
                label={
                  <button
                    type="button"
                    className="text-white bg-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Add to Event
                  </button>
                }
                className="border border-black rounded-lg bg-black"
              >
                <Dropdown.Item className="text-white">Event List</Dropdown.Item>
                <Dropdown.Divider className="bg-black" />
                <Dropdown.Item
                  className="bg-white flex flex-row gap-4"
                  onClick={() => {
                    alert("Dashboard!");
                  }}
                >
                  <Checkbox defaultChecked />
                  <Label className="flex">Engagement</Label>
                </Dropdown.Item>
                <Dropdown.Item
                  className="bg-white flex flex-row gap-4"
                  onClick={() => {}}
                >
                  <Checkbox />
                  <Label className="flex">Reception</Label>
                </Dropdown.Item>
                <Dropdown.Item className="bg-white flex flex-row gap-4">
                  <Checkbox />
                  <Label className="flex">Muharattam</Label>
                </Dropdown.Item>
              </Dropdown>
              <Button className="bg-[#C84047] text-white">
                <AiFillHeart size={20} />
              </Button>
            </div>
            <p className="mt-3">
              A well decorated elegant stage that is perfect for a night event
              with soothened candle lamps all throughout the decor.
            </p>
          </div>
        </div>
      </div>
      <div className="border-y border-y-black p-8">
        <p className="text-2xl font-semibold px-12">Similar Stages</p>
        <div className="grid grid-cols-3 gap-8 px-12 mt-8">
          {/* <DecorCard
            image={Math.random() > 0.5 ? "d1.png" : "d2.jpg"}
            title={Math.random() > 0.5 ? "Classic White" : "Golden Lights"}
            price={Math.random() > 0.5 ? "35000" : "40000"}
          />
          <DecorCard
            image={Math.random() > 0.5 ? "d1.png" : "d2.jpg"}
            title={Math.random() > 0.5 ? "Classic White" : "Golden Lights"}
            price={Math.random() > 0.5 ? "35000" : "40000"}
          />
          <DecorCard
            image={Math.random() > 0.5 ? "d1.png" : "d2.jpg"}
            title={Math.random() > 0.5 ? "Classic White" : "Golden Lights"}
            price={Math.random() > 0.5 ? "35000" : "40000"}
          /> */}
        </div>
      </div>
      <div className="p-8 px-20">
        <p className="text-2xl font-semibold">Cutomer Reviews</p>
        <div className="mt-4">
          <Rating size={"md"}>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              4.95 out of 5
            </p>
          </Rating>
        </div>
      </div>
    </>
  );
}
