import CustomItemsTable from "@/components/event-tool/CustomItemsTable";
import DecorItemsList from "@/components/event-tool/DecorItemsList";
import DecorPackagesList from "@/components/event-tool/DecorPackagesList";
import EventDayInfo from "@/components/event-tool/EventDayInfo";
import EventToolShareButton from "@/components/event-tool/EventToolShareButton";
import EventToolSidebar from "@/components/event-tool/EventToolSidebar";
import MandatoryItemsList from "@/components/event-tool/MandatoryItemsList";
import NotesModal from "@/components/event-tool/NotesModal";
import { Modal, Table, Textarea, Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeft, BsInfoCircle } from "react-icons/bs";

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
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}?populate=true&display=true`,
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
          if (response.userAccess) {
            router.push(`/event/${event_id}/planner`);
            return;
          } else if (response.eventDays?.length > 0) {
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
  useEffect(() => {
    if (event_id) {
      fetchEvent();
    }
  }, [router, event_id]);
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
  return (
    <>
      <NotesModal notes={notes} setNotes={setNotes} allowEdit={false} />
      <div className="flex flex-col overflow-hidden hide-scrollbar">
        {/* Event Planner Header */}
        <div className="md:bg-[#DBB9BD] md:px-8 flex-wrap flex flex-col md:flex-row gap-0 md:gap-4 items-center justify-center font-medium text-center text-lg text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <div className="text-black font-medium px-8 md:px-0 py-4 md:py-0 md:pr-8 text-left flex flex-row justify-between w-full md:w-auto items-center">
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
                  <EventDayInfo tempEventDay={tempEventDay} />
                  <DecorItemsList
                    decorItems={tempEventDay?.decorItems}
                    status={tempEventDay?.status}
                    setNotes={setNotes}
                    event_id={event_id}
                    eventDay={eventDay}
                    allowEdit={false}
                  />
                  <DecorPackagesList
                    packages={tempEventDay?.packages}
                    status={tempEventDay?.status}
                    setNotes={setNotes}
                    event_id={event_id}
                    eventDay={eventDay}
                    allowEdit={false}
                  />
                  <CustomItemsTable
                    customItems={tempEventDay?.customItems || []}
                    customItemsTitle={tempEventDay?.customItemsTitle || ""}
                  />
                  <MandatoryItemsList
                    mandatoryItems={tempEventDay?.mandatoryItems.filter(
                      (i) => i.itemRequired
                    )}
                  />
                  {tempEventDay?.decorItems.length <= 0 &&
                  tempEventDay?.packages.length <= 0 ? (
                    <p className="text-center py-8">
                      No decor selected.{" "}
                      <Link href={"/decor"} className="underline">
                        Click here
                      </Link>{" "}
                      to browse
                    </p>
                  ) : (
                    <>
                      <p className="mt-8 text-xl font-semibold flex flex-row justify-center items-center gap-2">
                        EVENT SUMMARY
                      </p>
                      <div>
                        <div className="overflow-x-auto md:w-4/5 block mx-auto pb-6 mb-6 border-b border-b-black">
                          <Table className="border my-3">
                            <Table.Head>
                              <Table.HeadCell>
                                <span className="sr-only">#</span>
                              </Table.HeadCell>
                              <Table.HeadCell>Item</Table.HeadCell>
                              <Table.HeadCell>Price</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                              {tempEventDay?.decorItems.map((item, index) => (
                                <Table.Row
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                  key={index}
                                >
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    [{item.decor.category}] {item.decor.name}
                                  </Table.Cell>
                                  <Table.Cell>₹{item.price}</Table.Cell>
                                </Table.Row>
                              ))}
                              {tempEventDay?.packages.map((item, index) => (
                                <Table.Row
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                  key={index}
                                >
                                  <Table.Cell>
                                    {tempEventDay?.decorItems.length +
                                      index +
                                      1}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    [Package] {item.package.name}
                                  </Table.Cell>
                                  <Table.Cell>₹{item.price}</Table.Cell>
                                </Table.Row>
                              ))}
                              {tempEventDay.customItems.length > 0 && (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                  <Table.Cell>
                                    {tempEventDay?.decorItems.length +
                                      tempEventDay?.packages.length +
                                      1}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {tempEventDay.customItemsTitle || "ADD ONS"}
                                  </Table.Cell>
                                  <Table.Cell>
                                    ₹
                                    {tempEventDay?.customItems.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    )}
                                  </Table.Cell>
                                </Table.Row>
                              )}
                              {tempEventDay?.mandatoryItems
                                .filter((i) => i.itemRequired)
                                ?.map((item, index) => (
                                  <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={index}
                                  >
                                    <Table.Cell>
                                      {tempEventDay?.decorItems.length +
                                        tempEventDay?.packages.length +
                                        (tempEventDay.customItems.length
                                          ? 1
                                          : 0) +
                                        index +
                                        1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                      {item.description}
                                    </Table.Cell>
                                    <Table.Cell>₹{item.price}</Table.Cell>
                                  </Table.Row>
                                ))}
                              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell />
                                <Table.Cell className="text-right whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                  Total
                                </Table.Cell>
                                <Table.Cell>
                                  ₹
                                  {tempEventDay?.decorItems.reduce(
                                    (accumulator, currentValue) => {
                                      return accumulator + currentValue.price;
                                    },
                                    0
                                  ) +
                                    tempEventDay?.packages.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    ) +
                                    tempEventDay?.customItems.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    ) +
                                    tempEventDay?.mandatoryItems.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    )}
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        </div>
                      </div>
                      <p className="mt-8 text-xl font-semibold flex flex-row justify-center items-center gap-2">
                        TOTAL SUMMARY
                      </p>
                      <div>
                        <div className="overflow-x-auto md:w-4/5 block mx-auto pb-6 mb-6 border-b border-b-black">
                          <Table className="border my-3">
                            <Table.Head>
                              <Table.HeadCell>
                                <span className="sr-only">#</span>
                              </Table.HeadCell>
                              <Table.HeadCell>Event Day</Table.HeadCell>
                              <Table.HeadCell>Price</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                              {event.eventDays?.map((item, index) => (
                                <Table.Row
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                  key={index}
                                >
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </Table.Cell>
                                  <Table.Cell>
                                    ₹
                                    {item?.decorItems.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    ) +
                                      item?.packages.reduce(
                                        (accumulator, currentValue) => {
                                          return (
                                            accumulator + currentValue.price
                                          );
                                        },
                                        0
                                      ) +
                                      item?.customItems.reduce(
                                        (accumulator, currentValue) => {
                                          return (
                                            accumulator + currentValue.price
                                          );
                                        },
                                        0
                                      ) +
                                      item?.mandatoryItems.reduce(
                                        (accumulator, currentValue) => {
                                          return (
                                            accumulator + currentValue.price
                                          );
                                        },
                                        0
                                      )}
                                  </Table.Cell>
                                </Table.Row>
                              ))}

                              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell />
                                <Table.Cell className="text-right whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                  Total
                                </Table.Cell>
                                <Table.Cell>
                                  ₹
                                  {event.eventDays?.reduce(
                                    (masterAccumulator, masterCurrentValue) => {
                                      return (
                                        masterAccumulator +
                                        masterCurrentValue.decorItems.reduce(
                                          (accumulator, currentValue) => {
                                            return (
                                              accumulator + currentValue.price
                                            );
                                          },
                                          0
                                        ) +
                                        masterCurrentValue?.packages.reduce(
                                          (accumulator, currentValue) => {
                                            return (
                                              accumulator + currentValue.price
                                            );
                                          },
                                          0
                                        ) +
                                        masterCurrentValue?.customItems.reduce(
                                          (accumulator, currentValue) => {
                                            return (
                                              accumulator + currentValue.price
                                            );
                                          },
                                          0
                                        ) +
                                        masterCurrentValue?.mandatoryItems.reduce(
                                          (accumulator, currentValue) => {
                                            return (
                                              accumulator + currentValue.price
                                            );
                                          },
                                          0
                                        )
                                      );
                                    },
                                    0
                                  )}
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        </div>
                      </div>
                      {event?.status?.approved && (
                        <>
                          <div className="md:w-2/3 mx-auto flex flex-col gap-3 mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-right">Item Bill</div>
                              <div className="text-rose-900">
                                {event.amount.preTotal}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-b-black border-b pb-3">
                              <div className="text-right">
                                Coupon code discount
                              </div>
                              <div className="text-rose-900">
                                {event.amount.discount}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 font-medium">
                              <div className="text-right">Amount Payable</div>
                              <div className="text-rose-900">
                                {event.amount.total} INR
                              </div>
                            </div>
                          </div>
                        </>
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
