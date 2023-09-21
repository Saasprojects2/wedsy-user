import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LiaSearchSolid } from "react-icons/lia";
import { Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";

export default function DecorListing() {
  return (
    <>
      <div className="p-8 grid grid-cols-4 gap-8">
        <div className="border-r border-black flex flex-col divide-y gap-4 divide-black pr-6">
          <p className="text-xl font-medium">Filter by</p>
          <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Occasion <AiOutlinePlus size={24} />
            </p>
            {[
              "Reception",
              "Engagement",
              "Wedding",
              "Muhurtham",
              "Haldi",
              "Mehendi",
              "Sangeet",
              "Anniversaries",
            ].map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Checkbox id={`ocassion-${item}`} />
                <Label className="flex" htmlFor={`ocassion-${item}`}>
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Flowers <AiOutlineMinus size={24} />
            </p>
          </div>
          <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Fabric <AiOutlineMinus size={24} />
            </p>
          </div>
          <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Colour <AiOutlineMinus size={24} />
            </p>
          </div>
          <div className="flex flex-col pt-4 border-b border-black">
            <p className="text-lg flex flex-row justify-between">
              Price Range <AiOutlineMinus size={24} />
            </p>
          </div>
        </div>
        <div className="col-span-3 py-6">
          <div className="flex flex-row justify-between px-10 mb-8 items-center">
            <TextInput
              id="search"
              placeholder="I am looking for..."
              rightIcon={() => (
                <div className="bg-[#C84047] text-white h-full w-full p-4">
                  <LiaSearchSolid />
                </div>
              )}
              type="text"
              className="w-1/2"
            />
            <div>
              <Dropdown inline label="Sort" className="max-w-max">
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Item>Item 2</Dropdown.Item>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Item>Item out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 px-10">
            {[
              "Reception",
              "Engagement",
              "Wedding",
              "Muhurtham",
              "Haldi",
              "Mehendi",
              "Sangeet",
              "Anniversaries",
            ].map((item, index) => (
              <DecorCard
                key={index}
                image={Math.random() > 0.5 ? "d1.png" : "d2.jpg"}
                title={Math.random() > 0.5 ? "Classic White" : "Golden Lights"}
                price={Math.random() > 0.5 ? "35000" : "40000"}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
