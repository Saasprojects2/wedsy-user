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
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

function DecorListing({ similarDecor, decor }) {
  const [similarIndex, setSimilarIndex] = useState([0, 1, 2]);
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
              <p className="font-semibold text-2xl">{decor.name}</p>
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
              <p className="mr-auto font-semibold text-xl ">
                ₹ {decor.productInfo.costPrice}
              </p>
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
            <p className="mt-3">{decor.description}</p>
          </div>
        </div>
      </div>
      <div className="border-y border-y-black p-8">
        <p className="text-2xl font-semibold px-12">Similar Stages</p>
        <div className="flex flex-row md:gap-12 justify-between items-center my-6">
          <BsArrowLeftShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = similarDecor.length;
              let prev = similarIndex[0];
              let mid = similarIndex[1];
              let next = similarIndex[2];
              next = mid;
              mid = prev;
              if (prev === 0) {
                prev = length - 1;
              } else {
                prev--;
              }
              setSimilarIndex([prev, mid, next]);
            }}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-12 grow">
            <DecorCard decor={similarDecor[similarIndex[0]]} />
            <DecorCard
              decor={similarDecor[similarIndex[1]]}
              className="hidden md:inline"
            />
            <DecorCard
              decor={similarDecor[similarIndex[2]]}
              className="hidden md:inline"
            />
          </div>
          <BsArrowRightShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = similarDecor.length;
              let prev = similarIndex[0];
              let mid = similarIndex[1];
              let next = similarIndex[2];
              prev = mid;
              mid = next;
              if (next === length - 1) {
                next = 0;
              } else {
                next++;
              }
              setSimilarIndex([prev, mid, next]);
            }}
          />
        </div>
      </div>
      <div className="p-8 px-20">
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-semibold">Cutomer Reviews</p>
          <div className="">
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
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { decor_id } = context.params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/decor`);
    const similarDecor = await response.json();
    const decorResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor/${decor_id}`
    );
    const decor = await decorResponse.json();
    if (!decor || decorResponse.status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/decor/view",
        },
      };
    }
    return {
      props: {
        similarDecor,
        decor,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        similarDecor: [],
      },
    };
  }
}

export default DecorListing;
