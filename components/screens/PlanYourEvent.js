import Image from "next/image";
import Link from "next/link";
import styles from "./PlanYourEvent.module.css";

export default function PlanYourEvent() {
  return (
    <>
      <div className="hidden md:block mb-12">
        <div
          className={`${styles.bg_div_top} flex pb-8 flex-col justify-end px-24 `}
        >
          <p className="font-medium text-xl text-white uppercase">
            Explore the ease of planning
          </p>
          <p className="font-semibold text-3xl text-white">
            PLAN YOUR EVENT NOW WITH OUR NEW
          </p>
        </div>
        <div
          className={`${styles.bg_div_bottom} lex pt-8 flex-col justify-start px-24`}
        >
          <p className="font-bold text-6xl text-[#A00000]">EVENT TOOL!</p>
          <div className="flex flex-row justify-between items-center">
            <p className="font-medium text-xl text-[#A00000] w-1/2">
              Utilize the tool to shortlist and choose your decorations
              effortlessly - all in one place, at Wedsy.
            </p>
            <Link
              href={`/event`}
              className="bg-[#A00000] rounded-xl p-2 px-16 text-white w-max"
            >
              Try Now!
            </Link>
          </div>
        </div>
      </div>
      <section className="w-full p-6 md:px-16 py-12 md:hidden">
        <p className="font-semibold text-2xl md:text-4xl mb-12">
          PLAN YOUR EVENT NOW WITH OUR NEW EVENT TOOL!
        </p>
        <div className="flex gap-6 relative">
          <div className="flex flex-col gap-2 md:gap-8 text-sm md:text-lg">
            <p className="text-xl w-3/4">
              Explore the ease of planning with our event tool at Wedsy.
            </p>
            <p className="text-xl w-3/4">
              Utilize the tool to shortlist and choose your decorations
              effortlessly - all in one place, at Wedsy.
            </p>
            <Link
              href={`/event`}
              className="hidden md:inline bg-rose-900 rounded-full p-1 px-16 text-white w-max mx-auto mt-auto mb-12"
            >
              Try Now!
            </Link>
          </div>
          <Image
            src="/assets/images/event-tool.png"
            alt="Decor"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "20%", height: "auto", marginLeft: "auto" }}
            className="hidden md:inline"
          />
          <div className="inline md:hidden">
            <Image
              src="/assets/images/event-tool.png"
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%" }}
              className=""
            />
          </div>
        </div>
        <Link
          href={`/event`}
          className="block md:hidden bg-rose-900 rounded-full p-1 px-16 text-white w-max mx-auto mt-4 md:mt-auto mb-4 md:mb-12"
        >
          Try Now!
        </Link>
      </section>
    </>
  );
}
