import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BiMap, BiSolidEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import EventHowItWorks from "@/components/screens/EventHowItWorks";

export default function EventTool({ userLoggedIn, setOpenLoginModal }) {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [data, setData] = useState({
    name: "",
    community: "",
    eventDay: "",
    time: "",
    date: "",
    venue: "",
  });
  const fetchEvents = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) {
          router.push(`/event/${response[0]._id}/planner`);
        } else {
          setEvents(response);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const handleCreateEvent = () => {
    if (!userLoggedIn) {
      setOpenLoginModal(true);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          router.push(`/event/${response._id}`);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  };
  useEffect(() => {
    if (userLoggedIn) {
      fetchEvents();
    }
  }, []);
  useEffect(() => {
    if (userLoggedIn) {
      fetchEvents();
    }
  }, [userLoggedIn]);
  return (
    <>
      <div className="hidden md:block bg-gradient-to-b from-[#948A72] to-white">
        <div className="grid grid-cols-3 relative gap-12 pb-24">
          <div className="pl-32 flex flex-col gap-8 pt-24 col-span-2">
            <div className="text-black text-6xl font-semibold">MY EVENTS</div>
            <div className="text-xl font-light">
              Explore the ease of planning with our event tool at Wedsy.
            </div>
            <div className="text-xl font-light">
              Utilize the tool to shortlist and choose your decorations
              effortlessly - all in one place, at Wedsy.
            </div>
          </div>
          <div>
            <Image
              src={`/assets/images/event-1.png`}
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "auto", height: "80vh" }}
              className="absolute top-0 right-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-24 justify-between px-24 mb-12">
          <div className="flex flex-col gap-8 max-w-max">
            <div className="text-3xl font-medium border-b-2 border-b-black h-max pb-4 flex flex-row items-end gap-4 max-w-max">
              <span>
                Start making <br />
                your event now
              </span>
              <BsArrowRight sizes={24} />
            </div>
            <div className="flex flex-col gap-2 ">
              {events?.map((item, index) => (
                <div className="flex flex-row justify-between" key={index}>
                  <Link href={`/event/${item._id}`}>
                    {index + 1}. {item.name}
                  </Link>
                  {/* <BiSolidEditAlt size={24} /> */}
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-red-200 bg-opacity-40 rounded-3xl flex flex-col gap-6 p-8 py-12">
            <div className="text-center text-2xl">TELL US ABOUT YOUR EVENT</div>
            <input
              type="text"
              className="rounded-full p-2 text-center border-0"
              placeholder="NAME YOUR EVENT (eg: Rahul x Kiara)"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              type="text"
              className="rounded-full p-2 text-center border-0"
              placeholder="EVENT DAY (eg: Reception)"
              name="eventDay"
              value={data.eventDay}
              onChange={(e) => setData({ ...data, eventDay: e.target.value })}
            />
            <input
              type="text"
              className="rounded-full p-2 text-center border-0"
              placeholder="COMMUNITY"
              name="community"
              value={data.community}
              onChange={(e) => setData({ ...data, community: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-8 w-full">
              <input
                type="date"
                className="rounded-full p-2 text-center border-0"
                placeholder="DATE"
                name="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
              <input
                type="time"
                className="rounded-full p-2 text-center border-0"
                placeholder="START TIME"
                name="time"
                value={data.time}
                onChange={(e) => setData({ ...data, time: e.target.value })}
              />
            </div>
            <input
              type="text"
              className="rounded-full p-2 text-center border-0"
              placeholder="VENUE"
              name="venue"
              value={data.venue}
              onChange={(e) => setData({ ...data, venue: e.target.value })}
            />
            <button
              className="bg-black disabled:bg-neutral-700 rounded-full p-2 px-12 text-white w-max mx-auto"
              disabled={
                !data.name ||
                !data.community ||
                !data.eventDay ||
                !data.time ||
                !data.date ||
                !data.venue
              }
              onClick={handleCreateEvent}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden events-mobile-bg-image flex flex-col gap-4 px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-1 col-span-2">
            <p className="text-xl font-semibold">EVENT TOOL</p>
            <p className="text-sm font-light">
              Explore the ease of planning with our event tool at Wedsy.
            </p>
            <p className="text-sm font-light">
              Utilize the tool to shortlist and choose your decorations
              effortlessly - all in one place, at Wedsy.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={`/assets/images/event-mobile.png`}
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "80%", height: "auto" }}
            />
            <button className="bg-white border border-black rounded-xl p-1 text-xs">
              Click here to add another event day!
            </button>
          </div>
        </div>
        {events?.map((item, index) => (
          <Link
            href={`/event/${item._id}`}
            className="bg-white rounded-md border-2 border-black p-4 pb-8 relative"
            key={index}
          >
            <p className="font-medium">
              {index + 1}. {item.name}
            </p>
            <div className="bg-black rounded-tl-full py-2 pl-8 pr-6 absolute bottom-0 right-0">
              <BsArrowRight size={20} color="white" />
            </div>
          </Link>
        ))}
        <div className="bg-white border border-black rounded-lg flex flex-col gap-4 px-6 md:px-16 py-3 text-center">
          <p>Name your Event</p>
          <input
            className="border-0 border-b border-black placeholder:text-black text-center"
            placeholder="EVENT NAME"
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <input
            type="text"
            className="border-0 border-b border-black placeholder:text-black text-center"
            placeholder="EVENT DAY (eg: Reception)"
            name="eventDay"
            value={data.eventDay}
            onChange={(e) => setData({ ...data, eventDay: e.target.value })}
          />
          <input
            type="text"
            className="border-0 border-b border-black placeholder:text-black text-center"
            placeholder="COMMUNITY"
            name="community"
            value={data.community}
            onChange={(e) => setData({ ...data, community: e.target.value })}
          />
          <input
            type="date"
            className="border-0 border-b border-black placeholder:text-black text-center"
            placeholder="DATE"
            name="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          <input
            type="time"
            className="border-0 border-b border-black placeholder:text-black text-center"
            placeholder="START TIME"
            name="time"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
          <input
            type="text"
            className="border-0 border-b border-black placeholder:text-black text-center"
            placeholder="VENUE"
            name="venue"
            value={data.venue}
            onChange={(e) => setData({ ...data, venue: e.target.value })}
          />
          <button
            className="bg-black text-white rounded-full w-full py-2"
            disabled={
              !data.name ||
              !data.community ||
              !data.eventDay ||
              !data.time ||
              !data.date ||
              !data.venue
            }
            onClick={handleCreateEvent}
          >
            SUBMIT
          </button>
        </div>
      </div>
      <EventHowItWorks />
    </>
  );
}
