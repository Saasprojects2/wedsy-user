import CustomItemsTable from "@/components/event-tool/CustomItemsTable";
import EventSummaryTable from "@/components/event-tool/EventSummaryTable";
import EventToolShareButton from "@/components/event-tool/EventToolShareButton";
import EventToolSidebar from "@/components/event-tool/EventToolSidebar";
import NotesModal from "@/components/event-tool/NotesModal";
import TotalSummaryTable from "@/components/event-tool/TotalSummaryTable";
import { toPriceString } from "@/utils/text";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";
import { BsArrowLeft, BsInfoCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function EventTool({ user }) {
  const divRef = useRef(null);
  const plannerRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const [displayKey, setDisplayKey] = useState("");
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [eventDay, setEventDay] = useState();
  const { event_id } = router.query;
  const [notes, setNotes] = useState({
    open: false,
    edit: false,
    loading: false,
    event_id: "",
    eventDay: "",
    decor_id: "",
    package_id: "",
    admin_notes: "",
    user_notes: "",
  });
  const fetchEvent = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}?populate=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.message !== "error") {
          if (response.eventDays.length > 0) {
            setEvent(response);
            if (router.query.eventDay) {
              setEventDay(router.query.eventDay);
            } else {
              setEventDay(response.eventDays[0]._id);
            }
          } else {
            router.push(`/event/${event_id}`);
          }
        } else {
          router.push("/event");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        router.push("/event");
      });
  };
  const finalizeEvent = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}/finalize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          fetchEvent();
          alert("Finalized the event!");
        } else {
          alert("Error, finalizing the event. Try Again.");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const UpdateNotes = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}/eventDay/${eventDay}/notes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          decor_id: notes.decor_id,
          package_id: notes.package_id,
          admin_notes: notes.admin_notes,
          user_notes: notes.user_notes,
        }),
      }
    )
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          setNotes({
            open: false,
            edit: false,
            loading: false,
            event_id: "",
            eventDay: "",
            decor_id: "",
            package_id: "",
            admin_notes: "",
            user_notes: "",
          });
          fetchEvent();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchEvent();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        const { top } = divRef.current.getBoundingClientRect();
        const totalHeight = window.innerHeight;
        setDivSize({ width, height: totalHeight - top });
      }
    };
    // Call handleResize initially to set the initial size
    handleResize();
    // Attach the event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handlePlannerScroll = () => {
    if (plannerRef.current) {
      console.log("Hello");
      const plannerElements = Array.from(plannerRef.current.children);
      for (let i = plannerElements.length - 1; i >= 0; i--) {
        if (plannerElements[i].getAttribute("data-key")) {
          const rect = plannerElements[i].getBoundingClientRect();
          if (rect.top <= plannerRef.current.offsetTop + 5) {
            setDisplayKey(plannerElements[i].getAttribute("data-key"));
            break;
          }
        }
      }
    }
  };
  const handlePlannerClick = (key) => {
    if (plannerRef.current) {
      const plannerElement = plannerRef.current.querySelector(
        `[data-key="${key}"]`
      );
      if (plannerElement) {
        const offsetTop = plannerElement.offsetTop - divRef.current.offsetTop;
        plannerRef.current.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };
  const RemoveDecorFromEvent = ({ decor_id }) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}/decor/${eventDay}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          decor: decor_id,
        }),
      }
    )
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          fetchEvent();
          alert("Item removed from event!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const RemovePackageFromEvent = ({ package_id }) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}/decor-package/${eventDay}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          package: package_id,
        }),
      }
    )
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          fetchEvent();
          alert("Item removed from event!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  return (
    <>
      <NotesModal
        notes={notes}
        setNotes={setNotes}
        UpdateNotes={UpdateNotes}
        allowEdit={true}
      />
      <div className="flex flex-col overflow-hidden hide-scrollbar">
        {/* Event Planner Header */}
        <div className="md:bg-[#DBB9BD] md:px-8 flex-wrap flex flex-col md:flex-row gap-0 md:gap-4 items-center justify-center font-medium text-center text-lg text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <div className="text-black font-medium px-8 md:px-0 py-4 md:py-0 md:pr-8 text-left flex flex-row justify-between  items-center w-full md:w-auto">
            <Link href={`/event/${event_id}`} className="md:hidden mr-auto">
              <BsArrowLeft size={24} />
            </Link>
            <span className="mr-auto md:mr-0">{event.name}</span>
            <EventToolShareButton
              eventName={event?.name}
              eventId={event?._id}
            />
          </div>
          {event?.eventDays?.map((item, index) => (
            <div
              key={item._id}
              className={`hidden md:block px-3 mx-1 py-2 my-2 grow cursor-pointer ${
                eventDay === item._id
                  ? " font-semibold bg-white rounded-2xl text-rose-900"
                  : "font-normal text-black"
              }`}
              onClick={() => {
                setEventDay(item._id);
              }}
            >
              {item.name}
            </div>
          ))}
          <div className="overflow-hidden md:hidden w-full">
            <div className="flex md:hidden flex-row gap-3 w-full overflow-x-auto mb-3">
              {event?.eventDays?.map((item, index) => (
                <div
                  key={item._id}
                  className={`md:hidden px-6 mx-1 py-2 cursor-pointer rounded-full font-semibold ${
                    eventDay === item._id
                      ? "bg-rose-900 text-white"
                      : "text-black bg-gray-300"
                  }`}
                  onClick={() => {
                    setEventDay(item._id);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <Link href={`/event/${event_id}`} className="hidden md:block">
            <AiOutlinePlusSquare size={24} />
          </Link>
        </div>
        <div
          className="grid md:grid-cols-4 gap-6 py-4 overflow-hidden hide-scrollbar grow"
          ref={divRef}
          style={{ height: divSize.height ?? "100vh" }}
        >
          <EventToolSidebar
            tempEventDay={event.eventDays?.filter((i) => i._id === eventDay)[0]}
            displayKey={displayKey}
            handlePlannerClick={handlePlannerClick}
          />
          <div
            className="overflow-y-auto hide-scrollbar col-span-3 flex flex-col px-6 md:px-0"
            ref={plannerRef}
            onScroll={handlePlannerScroll}
          >
            {event.eventDays
              ?.filter((i) => i._id === eventDay)
              ?.map((tempEventDay, tempIndex) => (
                <>
                  <div className="flex flex-col md:flex-row justify-between pr-8 mb-4 text-md">
                    <div className="flex flex-col justify-between">
                      <span>{new Date(tempEventDay.date).toDateString()}</span>
                      <span>{tempEventDay.time} Onwards</span>
                      <span>{tempEventDay.venue}</span>
                    </div>
                    <span className="">
                      Designated Planner :
                      <span className="text-rose-900 font-semibold">
                        Rohaan Saleem
                      </span>
                    </span>
                  </div>
                  {tempEventDay?.decorItems.length > 0 && (
                    <>
                      <p className="text-xl font-semibold flex flex-row items-center gap-2">
                        Decor
                      </p>
                      {tempEventDay?.decorItems
                        ?.sort(
                          (a, b) =>
                            [
                              "Nameboard",
                              "Entrance",
                              "Pathway",
                              "Photobooth",
                              "Stage",
                              "Mandap",
                            ].indexOf(a.category) -
                            [
                              "Nameboard",
                              "Entrance",
                              "Pathway",
                              "Photobooth",
                              "Stage",
                              "Mandap",
                            ].indexOf(b.category)
                        )
                        ?.map((item) => (
                          <div
                            className="flex flex-col gap-4 pt-8 border-b border-b-black"
                            key={item._id}
                            data-key={`decor-${item.decor._id}`}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center px-4 md:w-4/5">
                              <div className="relative md:col-span-3">
                                <p className="text-xl font-semibold flex flex-row items-center gap-2 mb-2">
                                  <span>{item.decor?.name}</span>
                                  {!tempEventDay.status.finalized && (
                                    <MdDelete
                                      size={24}
                                      className="cursor-pointer ml-auto"
                                      onClick={() => {
                                        RemoveDecorFromEvent({
                                          decor_id: item.decor._id,
                                        });
                                      }}
                                    />
                                  )}
                                </p>
                                <Image
                                  src={item.decor?.image}
                                  alt="Decor"
                                  width={0}
                                  height={0}
                                  sizes="100%"
                                  style={{ width: "100%", height: "auto" }}
                                  className="rounded-xl"
                                />
                              </div>
                              {item.platform && item.flooring && (
                                <div className="flex flex-row items-center gap-6 md:col-span-2">
                                  <AiOutlinePlus size={24} />
                                  <div className="flex flex-col gap-3">
                                    <Image
                                      src={"/assets/images/platform.png"}
                                      alt="Platform"
                                      width={0}
                                      height={0}
                                      sizes="100%"
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                    <p className="font-medium text-center mb-2">
                                      Platform (
                                      {`${item.dimensions.length} x ${item.dimensions.breadth} x ${item.dimensions.height}`}
                                      )
                                    </p>
                                    <Image
                                      src={
                                        item.flooring === "Carpet"
                                          ? "/assets/images/carpet.png"
                                          : item.flooring === "Flex"
                                          ? "/assets/images/flex.png"
                                          : item.flooring === "PrintedFlex"
                                          ? "/assets/images/printedFlex.png"
                                          : "/assets/images/carpet.png"
                                      }
                                      alt="Platform"
                                      width={0}
                                      height={0}
                                      sizes="100%"
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                    <p className="font-medium text-center mb-2">
                                      Flooring:
                                      {` ${
                                        item.flooring !== "PrintedFlex"
                                          ? item.flooring
                                          : "Printed Flex"
                                      }`}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col md:flex-row">
                              <div className="flex flex-col px-4 pb-1">
                                <p className="text-lg font-medium">
                                  Inclusive of:
                                </p>
                                {item.decor.productInfo?.included.map(
                                  (rec, recIndex) => (
                                    <p key={recIndex}>{rec}</p>
                                  )
                                )}
                                <button
                                  onClick={() => {
                                    setNotes({
                                      open: true,
                                      edit: false,
                                      loading: false,
                                      event_id: event_id,
                                      eventDay: eventDay,
                                      decor_id: item.decor._id,
                                      package_id: "",
                                      admin_notes: item.admin_notes,
                                      user_notes: item.user_notes,
                                    });
                                  }}
                                  className="text-rose-900 bg-white hover:bg-rose-900 hover:text-white cursor-pointer px-2 py-1.5 text-sm focus:outline-none rounded-lg border-rose-900 border"
                                >
                                  View Notes
                                </button>
                              </div>
                              <div className="flex flex-col md:w-1/2 md:ml-auto">
                                <p className="font-medium text-lg mt-auto text-right px-10">
                                  Price for{" "}
                                  <span className="text-rose-900">
                                    {item.variant === "artificialFlowers"
                                      ? "Artificial"
                                      : item.variant === "naturalFlowers"
                                      ? "Natural"
                                      : item.variant === "mixedFlowers"
                                      ? "Mixed"
                                      : ""}{" "}
                                    Flowers.
                                  </span>
                                </p>
                                <div className="mt-auto flex flex-row items-center justify-end gap-2 text-lg text-white font-medium bg-gradient-to-l from-rose-900 to-white py-2 px-10">
                                  ₹ {item.price}{" "}
                                  <Tooltip
                                    content={
                                      <div className="flex flex-col gap-1">
                                        <div className="flex flex-row justify-between gap-2">
                                          <span>{item.category}:</span>
                                          <span>
                                            ₹
                                            {
                                              item.decor.productInfo.variant[
                                                item.variant
                                              ].sellingPrice
                                            }
                                          </span>
                                        </div>
                                        {item.platform && (
                                          <div className="flex flex-row justify-between gap-2">
                                            <span>Platform:</span>
                                            <span>
                                              ₹
                                              {item.dimensions.length *
                                                item.dimensions.breadth *
                                                25}
                                            </span>
                                          </div>
                                        )}
                                        {item.flooring && (
                                          <div className="flex flex-row justify-between gap-2">
                                            <span>Flooring:</span>
                                            <span>
                                              ₹
                                              {(item.dimensions.length +
                                                item.dimensions.height) *
                                                (item.dimensions.breadth +
                                                  item.dimensions.height) *
                                                (item.flooring === "Carpet"
                                                  ? 8
                                                  : item.flooring === "Flex"
                                                  ? 10
                                                  : item.flooring ===
                                                    "PrintedFlex"
                                                  ? 15
                                                  : 0)}
                                            </span>
                                          </div>
                                        )}
                                        {item.addOns?.map((rec, recIndex) => (
                                          <div
                                            className="flex flex-row justify-between gap-2"
                                            key={recIndex}
                                          >
                                            <span>{rec.name}:</span>
                                            <span>₹{rec.price}</span>
                                          </div>
                                        ))}
                                      </div>
                                    }
                                    trigger="hover"
                                    style="light"
                                  >
                                    <BsInfoCircle size={12} />
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                  {tempEventDay?.packages.length > 0 && (
                    <>
                      <p className="text-xl font-semibold flex flex-row items-center gap-2">
                        Decor Packages
                      </p>
                      {tempEventDay?.packages.map((item) => (
                        <div
                          className="flex flex-col gap-3 pt-4 border-b border-b-black"
                          key={item._id}
                          data-key={`package-${item.package._id}`}
                        >
                          <p className="text-xl font-semibold flex flex-row items-center gap-2 mb-2">
                            <span>{item.package?.name}</span>
                            {!tempEventDay.status.finalized && (
                              <MdDelete
                                size={24}
                                className="cursor-pointer ml-auto"
                                onClick={() => {
                                  RemovePackageFromEvent({
                                    package_id: item.package._id,
                                  });
                                }}
                              />
                            )}
                          </p>
                          {item.decorItems.map((rec, recIndex) => (
                            <>
                              <div
                                className="flex flex-col gap-4"
                                key={rec._id}
                              >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center px-4 md:w-4/5">
                                  <div className="relative md:col-span-3">
                                    <p className="text-xl font-semibold flex flex-row items-center gap-2 mb-2">
                                      <span>{rec.decor?.name}</span>
                                    </p>
                                    <Image
                                      src={rec.decor?.image}
                                      alt="Decor"
                                      width={0}
                                      height={0}
                                      sizes="100%"
                                      style={{ width: "100%", height: "auto" }}
                                      className="rounded-xl"
                                    />
                                  </div>
                                  {rec.platform && rec.flooring && (
                                    <div className="flex flex-row items-center gap-6 md:col-span-2">
                                      <AiOutlinePlus size={24} />
                                      <div className="flex flex-col gap-3">
                                        <Image
                                          src={"/assets/images/platform.png"}
                                          alt="Platform"
                                          width={0}
                                          height={0}
                                          sizes="100%"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                          }}
                                        />
                                        <p className="font-medium text-center mb-2">
                                          Platform (
                                          {`${rec.dimensions.length} x ${rec.dimensions.breadth} x ${rec.dimensions.height}`}
                                          )
                                        </p>
                                        <Image
                                          src={
                                            rec.flooring === "Carpet"
                                              ? "/assets/images/carpet.png"
                                              : rec.flooring === "Flex"
                                              ? "/assets/images/flex.png"
                                              : rec.flooring === "PrintedFlex"
                                              ? "/assets/images/printedFlex.png"
                                              : "/assets/images/carpet.png"
                                          }
                                          alt="Platform"
                                          width={0}
                                          height={0}
                                          sizes="100%"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                          }}
                                        />
                                        <p className="font-medium text-center mb-2">
                                          Flooring:
                                          {` ${
                                            rec.flooring !== "PrintedFlex"
                                              ? rec.flooring
                                              : "Printed Flex"
                                          }`}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col md:flex-row">
                                  <div className="flex flex-col px-4 pb-1">
                                    <p className="text-lg font-medium">
                                      Inclusive of:
                                    </p>
                                    {rec.decor.productInfo?.included.map(
                                      (temp, tIndex) => (
                                        <p key={tIndex}>{temp}</p>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                          <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col px-4  pt-auto pb-1">
                              <button
                                onClick={() => {
                                  setNotes({
                                    open: true,
                                    edit: false,
                                    loading: false,
                                    event_id: event_id,
                                    eventDay: eventDay,
                                    decor_id: "",
                                    package_id: item.package._id,
                                    admin_notes: item.admin_notes,
                                    user_notes: item.user_notes,
                                  });
                                }}
                                className="mt-auto text-rose-900 bg-white hover:bg-rose-900 hover:text-white cursor-pointer px-2 py-1.5 text-sm focus:outline-none rounded-lg border-rose-900 border"
                              >
                                View Notes
                              </button>
                            </div>
                            <div className="flex flex-col md:w-1/2 md:ml-auto">
                              <p className="font-medium text-lg mt-auto text-right px-10">
                                Price for{" "}
                                <span className="text-rose-900">
                                  {item.variant === "artificialFlowers"
                                    ? "Artificial"
                                    : item.variant === "naturalFlowers"
                                    ? "Natural"
                                    : item.variant === "mixedFlowers"
                                    ? "Mixed"
                                    : ""}{" "}
                                  Flowers.
                                </span>
                              </p>
                              <div className="mt-auto flex flex-row items-center justify-end gap-2 text-lg text-white font-medium bg-gradient-to-l from-rose-900 to-white py-2 px-10">
                                ₹ {item.price}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <CustomItemsTable
                    customItems={tempEventDay?.customItems || []}
                    customItemsTitle={tempEventDay?.customItemsTitle || ""}
                  />
                  {tempEventDay?.mandatoryItems.filter((i) => i.itemRequired)
                    .length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-black">
                      {tempEventDay?.mandatoryItems
                        .filter((i) => i.itemRequired)
                        ?.map((item, index) => (
                          <div
                            className="grid grid-cols-4 gap-2 px-2"
                            key={index}
                          >
                            <div>
                              <Image
                                src={item?.image}
                                alt="Decor"
                                width={0}
                                height={0}
                                sizes="100%"
                                style={{ width: "100%", height: "auto" }}
                                className="rounded-xl"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <p>{item.description}</p>
                              <p>Price: {item.price}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  {tempEventDay?.decorItems.length <= 0 &&
                  tempEventDay?.packages.length <= 0 &&
                  tempEventDay?.customItems.length <= 0 &&
                  tempEventDay?.mandatoryItems.length <= 0 ? (
                    <p className="text-center py-8">
                      No decor selected.{" "}
                      <Link href={"/decor"} className="underline">
                        Click here
                      </Link>{" "}
                      to browse
                    </p>
                  ) : (
                    <>
                      <EventSummaryTable tempEventDay={tempEventDay} />
                      <TotalSummaryTable event={event} />
                      {event?.status?.approved && (
                        <>
                          <div className="md:w-2/3 mx-auto flex flex-col gap-3 mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-right">Item Bill</div>
                              <div className="text-rose-900">
                                {toPriceString(event.amount.preTotal)}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-b-black border-b pb-3">
                              <div className="text-right">
                                Coupon code discount
                              </div>
                              <div className="text-rose-900">
                                {toPriceString(event.amount.discount)}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 font-medium">
                              <div className="text-right">Amount Payable</div>
                              <div className="text-rose-900">
                                {toPriceString(event.amount.total)}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {event?.status.finalized ? (
                        event?.status.approved ? (
                          <div className="text-center py-8 flex flex-col gap-2">
                            <div className="p-6 bg-black text-white text-center">
                              Your event has been verified and approved! You can
                              now proceed to payment
                            </div>
                            {event?.status.paymentDone ? (
                              <p className="text-lg font-medium">
                                Your payment is done!
                              </p>
                            ) : (
                              <Link href={`/event/${event._id}/payment`}>
                                <button className="font-semibold bg-rose-900 rounded-full p-2 px-16 text-white w-max mx-auto my-6">
                                  Proceed with Payment
                                </button>
                              </Link>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8 flex flex-col gap-2">
                            <p className="text-lg font-medium">Thank you!</p>
                            <p>
                              Your design has been sent for approval. You can
                              proceed to payment once approved by your
                              designated planner!
                            </p>
                            <p className="text-sm">
                              {
                                "(You'll be notified on your email and phone number)"
                              }
                            </p>
                          </div>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            finalizeEvent();
                          }}
                          className="font-semibold bg-rose-900 rounded-full p-2 px-16 text-white w-max mx-auto my-6"
                        >
                          Finalize
                        </button>
                      )}
                    </>
                  )}
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
