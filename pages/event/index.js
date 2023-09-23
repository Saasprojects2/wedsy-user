import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";

export default function EventTool() {
  return (
    <div className="">
      <div className="flex flex-row relative gap-12">
        <div className="pl-32 flex flex-col gap-8 pt-24">
          <div className="text-black text-6xl font-medium">EVENT TOOL</div>
          <div className="text-xl">
            Explore the ease of planning with our event tool at Wedsy.
          </div>
          <div className="text-xl">
            Utilize the tool to shortlist and choose your decorations
            effortlessly - all in one place, at Wedsy.
          </div>
        </div>
        <Image
          src={`/assets/images/event-1.png`}
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "60%", height: "auto" }}
        />
        <Image
          src={`/assets/images/event-2.png`}
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "30%", height: "auto" }}
          className="absolute bottom-0 translate-y-1/2 left-[50%] -translate-x-1/2"
        />
      </div>
      <div className="flex flex-row mt-48 justify-between px-24 mb-12">
        <div className="flex flex-col gap-8">
          <div className="text-3xl font-medium border-b-2 border-b-black h-max pb-4 flex flex-row items-end gap-4">
            <span>
              Start making <br />
              your event now
            </span>
            <BsArrowRight sizes={24} />
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row justify-between">
              <span>1. Sangeet</span>
              <BiSolidEditAlt size={24} />
            </div>
            <div className="flex flex-row justify-between text-black/50">
              <span>2. ADD ONE MORE DAY</span>
            </div>
          </div>
          <button className="bg-neutral-700 rounded-full p-2 px-16 text-white w-max">
            Next
          </button>
        </div>
        <div className="relative bg-red-200 bg-opacity-40 rounded-3xl flex flex-col gap-6 p-8 py-12">
          <div className="text-center text-3xl">TELL US ABOUT YOUR EVENT</div>
          <input
            className="rounded-full p-2 text-center"
            placeholder="NAME YOUR EVENT (eg: Rahul x Kiara)"
          />
          <input
            className="rounded-full p-2 text-center"
            placeholder="EVENT DAY (eg: Reception)"
          />
          <input
            className="rounded-full p-2 text-center"
            placeholder="COMMUNITY"
          />
          <div className="flex gap-8">
            <input
              className="rounded-full p-2 text-center"
              placeholder="DATE"
            />
            <input
              className="rounded-full p-2 text-center"
              placeholder="START TIME"
            />
          </div>
          <input className="rounded-full p-2 text-center" placeholder="VENUE" />
          <button className="bg-neutral-700 rounded-full p-2 px-12 text-white w-max mx-auto">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
