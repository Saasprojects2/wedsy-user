import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function EventTool() {
  return (
    <div className="flex flex-col gap-8">
      <div className=" px-12 py-6">
        Your Designated wedding planner : Rohaan Saleem
      </div>
      <div className="flex flex-col px-8">
        <div className="flex-wrap flex flex-row items-center justify-center font-medium text-center text-lg text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <div className="p-4 grow">Haldi</div>
          <div className="p-4 text-black font-semibold grow">Sangeeth</div>
          <div className="p-4 grow">Haldi</div>
          <div className="p-4 grow">Haldi</div>
          <AiOutlinePlusSquare size={24} />
        </div>
        <div className="grid grid-cols-4 gap-6 py-4">
          <div className="border-r flex flex-col gap-6 py-8">
            <div className="flex flex-col gap-3 px-6">
              <div className="flex flex-row justify-between border-b pb-2">
                <span>DECOR</span>
                <AiOutlinePlusSquare size={24} />
              </div>
            </div>
            <div className="flex flex-col gap-3 px-6">
              <div className="flex flex-row justify-between border-b pb-2">
                <span>DECOR</span>
              </div>
              <div className="flex flex-col gap-2 px-8">
                <div className="text-gray-700">Entrance</div>
                <div className="text-gray-700">Pathway</div>
                <div className="text-right font-medium">Stage</div>
                <div className="text-gray-700">Mandap</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <span>14 November 2023</span>
                <span>7.00PM Onwards</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Laleet Place Banglore</span>
              </div>
            </div>
            <p className="text-center py-8">
              No decor selected.{" "}
              <Link href={"/decor"} className="underline">
                Click here
              </Link>{" "}
              to browse
            </p>
            <div className="px-8 flex flex-col gap-4">
              <p className="text-2xl font-semibold">Golden Lights</p>
              <div className="grid grid-cols-4 gap-6 items-end pb-8 border-b border-b-black">
                <div className="relative col-span-3">
                  <Image
                    src={`/assets/temp/d2.jpg`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="rounded-xl"
                  />
                </div>
                <p className="text-red-600 font-medium">₹ 40000</p>
              </div>
              <p className="text-xl font-medium">Platform</p>
              <div className="grid grid-cols-4 gap-6 items-end">
                <div className="relative col-span-3 flex">
                  <Image
                    src={`/assets/temp/s1.png`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="rounded-xl"
                  />
                  <Image
                    src={`/assets/temp/c1.png`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 items-center pb-8 border-b border-b-black">
                <div className="relative col-span-3 flex border p-3 flex-col gap-3">
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                </div>
                <div className="flex p-3 flex-col gap-3">
                  <p className="text-red-600 font-medium">₹ 40000</p>
                  <p className="text-red-600 font-medium">₹ 40000</p>
                  <p className="text-red-600 font-medium">₹ 40000</p>
                  <p className="text-red-600 font-medium">₹ 40000</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 pb-4 border-b border-b-black text-xl">
                <p className="col-span-3 text-right font-semibold">TOTAL</p>
                <p className="text-red-600 font-semibold">₹ 40000</p>
              </div>
            </div>
            <div className="mt-24 px-8 flex flex-col gap-4">
              <p className="text-2xl font-semibold">Golden Lights</p>
              <div className="grid grid-cols-4 gap-6 items-end pb-8 border-b border-b-black">
                <div className="relative col-span-3">
                  <Image
                    src={`/assets/temp/d2.jpg`}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="rounded-xl"
                  />
                </div>
                <p className="text-red-600 font-medium">₹ 40000</p>
              </div>
              <p className="text-xl font-medium">Product Changes</p>
              <div className="grid grid-cols-4 gap-6 items-center pb-8 border-b border-b-black">
                <div className="relative col-span-3 flex border p-3 flex-col gap-3">
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                  <p>1. Platform(16x10x1.5) with red carpet</p>
                </div>
                <div className="flex p-3 flex-col gap-3">
                  <p className="text-red-600 font-medium">₹ 40000</p>
                  <p className="text-red-600 font-medium">₹ 40000</p>
                  <p className="text-red-600 font-medium">₹ 40000</p>
                  <p className="text-red-600 font-medium">₹ 40000</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 pb-4 border-b border-b-black text-xl">
                <p className="col-span-3 text-right font-semibold">TOTAL</p>
                <p className="text-red-600 font-semibold">₹ 40000</p>
              </div>
            </div>
            <button className="bg-neutral-700 rounded-full p-2 px-16 text-white w-max mx-auto mt-12">
              Finalize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
