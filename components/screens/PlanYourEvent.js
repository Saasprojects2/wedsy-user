import Image from "next/image";
import Link from "next/link";

export default function PlanYourEvent() {
  return (
    <>
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
