import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EventTool() {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [data, setData] = useState({
    name: "",
    time: "",
    date: "",
    venue: "",
  });
  const { event_id } = router.query;
  const fetchEvent = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message !== "error") {
          setEvent(response);
        } else {
          router.push("/event");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        router.push("/event");
      });
  };
  const handleCreateEventDay = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        fetchEvent();
        setData({ name: "", time: "", date: "", venue: "" });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchEvent();
  }, []);
  return (
    <div className="">
      <div className="flex flex-row relative gap-12">
        <div className="pl-32 flex flex-col gap-8 pt-24">
          <div className="text-black text-6xl font-medium">{event.name}</div>
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
          style={{ width: "40%", height: "auto" }}
          className="absolute bottom-0 translate-y-1/2 left-[50%] -translate-x-1/2"
        />
      </div>
      <div className="grid grid-cols-2 gap-24 mt-64 justify-between px-24 mb-12">
        <div className="flex flex-col gap-8 max-w-max">
          <div className="text-3xl font-medium border-b-2 border-b-black h-max pb-4 flex flex-row items-end gap-4 max-w-max">
            <span>
              Start making <br />
              your event now
            </span>
            <BsArrowRight sizes={24} />
          </div>
          <div className="flex flex-col gap-2 ">
            {event?.eventDays?.map((item, index) => (
              <div className="flex flex-row justify-between" key={index}>
                <Link href={`/event/${item._id}`}>
                  {index + 1}. {item.name}
                </Link>
                <BiSolidEditAlt size={24} />
              </div>
            ))}
            <div className="flex flex-row justify-between text-black/50">
              <span>{event?.eventDays?.length + 1}. ADD ONE MORE DAY</span>
            </div>
          </div>
          <Link
            href={`/event/${event_id}/planner`}
            className="bg-neutral-700 rounded-full p-2 px-16 text-white w-max"
          >
            Next
          </Link>
        </div>
        <div className="relative bg-red-200 bg-opacity-40 rounded-3xl flex flex-col gap-6 p-8 py-12">
          <div className="text-center text-3xl">TELL US ABOUT YOUR EVENT</div>
          <input
            type="text"
            className="rounded-full p-2 text-center"
            placeholder="EVENT DAY (eg: Reception)"
            name="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-8 w-full">
            <input
              type="date"
              className="rounded-full p-2 text-center"
              placeholder="DATE"
              name="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
            <input
              type="time"
              className="rounded-full p-2 text-center"
              placeholder="START TIME"
              name="time"
              value={data.time}
              onChange={(e) => setData({ ...data, time: e.target.value })}
            />
          </div>
          <input
            type="text"
            className="rounded-full p-2 text-center"
            placeholder="VENUE"
            name="venue"
            value={data.venue}
            onChange={(e) => setData({ ...data, venue: e.target.value })}
          />
          <button
            className="bg-black disabled:bg-neutral-700 rounded-full p-2 px-12 text-white w-max mx-auto"
            disabled={!data.name || !data.time || !data.date || !data.venue}
            onClick={handleCreateEventDay}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
