import { toProperCase } from "@/utils/text";
import { Button, Modal, Table, Textarea, Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";
import { BiEditAlt, BiMap } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight, BsInfoCircle } from "react-icons/bs";
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
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async ({ order_id, amount }) => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Wedsy",
      currency: "INR",
      amount: amount,
      order_id: order_id,
      description: "Your Event Payment",
      // image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // console.log(response);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        UpdatePayment({ order_id, response });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  // TODO: Update the create payment api router body.
  const CreatePayment = ({ eventDay }) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        eventId: event_id,
        eventDayId: eventDay,
        paymentMethod: "razporpay",
      }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          makePayment({ order_id: response.order_id, amount: response.amount });
          // fetchEvent();
          // alert("Finalized the event!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const UpdatePayment = ({ response, order_id }) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/${order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ response }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          // makePayment({ order_id: response.order_id, amount: response.amount });
          // fetchEvent();
          // alert("Finalized the event!");
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
        console.log("Hello123");
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
      {/* Notes Modal */}
      <Modal
        show={notes?.open || false}
        size="lg"
        popup
        onClose={() =>
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
          })
        }
      >
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white px-4">
            Notes
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-6">
            <Textarea
              rows={4}
              value={notes?.user_notes}
              onChange={(e) => {
                setNotes({ ...notes, user_notes: e.target.value });
              }}
              readOnly={!notes?.edit}
            />
            <button
              className={`text-white bg-rose-900  border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
              onClick={() => {
                if (!notes?.edit) {
                  setNotes({ ...notes, edit: true });
                } else {
                  UpdateNotes();
                }
              }}
            >
              {notes?.edit ? "Save Notes" : "Edit Notes"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex flex-col overflow-hidden hide-scrollbar">
        {/* Event Planner Header */}
        <div className="bg-[#DBB9BD] px-8 flex-wrap flex flex-row gap-4 items-center justify-center font-medium text-center text-lg text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <div className="text-black font-medium pr-8 text-left">
            {event.name}
          </div>
          {event?.eventDays?.map((item, index) => (
            <div
              key={item._id}
              className={`px-3 mx-1 py-2 my-2 grow cursor-pointer ${
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
          <Link href={`/event/${event_id}`}>
            <AiOutlinePlusSquare size={24} />
          </Link>
        </div>
        <div
          className="grid md:grid-cols-4 gap-6 py-4 overflow-hidden hide-scrollbar grow"
          ref={divRef}
          style={{ height: divSize.height ?? "100vh" }}
        >
          <div className="overflow-y-auto hide-scrollbar hidden border-r md:flex flex-col gap-6 py-4 pl-8">
            {event.eventDays
              ?.filter((i) => i._id === eventDay)
              ?.map((tempEventDay, tempIndex) => (
                <>
                  {tempEventDay?.decorItems.length > 0 && (
                    <div className="flex flex-col gap-3 pl-6">
                      <p className="flex flex-row justify-between pb-2 font-semibold text-xl">
                        Decor
                      </p>
                      <div className="flex flex-col gap-2">
                        {tempEventDay?.decorItems.map((item, index) =>
                          displayKey === `decor-${item.decor._id}` ? (
                            <div
                              className="font-medium text-lg flex flex-row gap-2 items-center pl-2"
                              key={index}
                            >
                              {item.category}
                              <span className="h-px flex-grow bg-black"></span>
                            </div>
                          ) : (
                            <div
                              className="text-gray-700 cursor-pointer"
                              key={index}
                              onClick={() =>
                                handlePlannerClick(`decor-${item.decor._id}`)
                              }
                            >
                              {item.category}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {tempEventDay?.packages.length > 0 && (
                    <div className="flex flex-col gap-3 pl-6">
                      <p className="flex flex-row justify-between pb-2 font-semibold text-xl">
                        Decor Packages
                      </p>
                      <div className="flex flex-col gap-2">
                        {tempEventDay?.packages.map((item, index) =>
                          displayKey === `package-${item.package._id}` ? (
                            <div
                              className="font-medium text-lg flex flex-row gap-2 items-center pl-2"
                              key={index}
                            >
                              {item.package.name}
                              <span className="h-px flex-grow bg-black"></span>
                            </div>
                          ) : (
                            <div
                              className="text-gray-700 cursor-pointer"
                              key={index}
                              onClick={() =>
                                handlePlannerClick(
                                  `package-${item.package._id}`
                                )
                              }
                            >
                              {item.package.name}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
          <div
            className="overflow-y-auto hide-scrollbar col-span-3 flex flex-col"
            ref={plannerRef}
            onScroll={handlePlannerScroll}
          >
            {event.eventDays
              ?.filter((i) => i._id === eventDay)
              ?.map((tempEventDay, tempIndex) => (
                <>
                  <div className="flex flex-row justify-between pr-8 mb-4 text-md">
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
                            <div className="grid grid-cols-5 gap-6 items-center px-4 w-4/5">
                              <div className="relative col-span-3">
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
                                <div className="flex flex-row items-center gap-6 col-span-2">
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
                            <div className="flex flex-row">
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
                              <div className="flex flex-col w-1/2 ml-auto">
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
                                <div className="grid grid-cols-5 gap-6 items-center px-4 w-4/5">
                                  <div className="relative col-span-3">
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
                                    <div className="flex flex-row items-center gap-6 col-span-2">
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
                                <div className="flex flex-row">
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
                          <div className="flex flex-row">
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
                            <div className="flex flex-col w-1/2 ml-auto">
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
                  {tempEventDay?.customItems.length > 0 && (
                    <>
                      <p className="text-xl font-semibold flex flex-row items-center gap-2">
                        {tempEventDay.customItemsTitle || "ADD ONS"}
                      </p>
                      <div className=" block mx-auto">
                        <Table className="border my-3">
                          <Table.Head>
                            <Table.HeadCell>Item Name</Table.HeadCell>
                            <Table.HeadCell>Qty.</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                          </Table.Head>
                          <Table.Body className="divide-y">
                            {tempEventDay?.customItems.map((item, index) => (
                              <Table.Row
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                key={index}
                              >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </Table.Cell>
                                <Table.Cell>{item.quantity}</Table.Cell>
                                <Table.Cell>₹{item.price}</Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                      </div>
                      <div className="flex flex-row border-b border-b-black">
                        <div className="flex flex-col w-1/2 ml-auto">
                          <div className="mt-auto flex flex-row items-center justify-end gap-2 text-lg text-white font-medium bg-gradient-to-l from-rose-900 to-white py-2 px-10">
                            ₹{" "}
                            {tempEventDay?.customItems.reduce(
                              (accumulator, currentValue) => {
                                return accumulator + currentValue.price;
                              },
                              0
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {tempEventDay?.mandatoryItems.filter((i) => i.itemRequired)
                    .length > 0 && (
                    <div className="grid grid-cols-2 divide-x divide-y divide-black">
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
                      <div className="w-4/5 block mx-auto pb-6 mb-6 border-b border-b-black">
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
                                  {tempEventDay?.decorItems.length + index + 1}
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
                      <p className="mt-8 text-xl font-semibold flex flex-row justify-center items-center gap-2">
                        TOTAL SUMMARY
                      </p>
                      <div className="w-4/5 block mx-auto pb-6 mb-6 border-b border-b-black">
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
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    ) +
                                    item?.customItems.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
                                      },
                                      0
                                    ) +
                                    item?.mandatoryItems.reduce(
                                      (accumulator, currentValue) => {
                                        return accumulator + currentValue.price;
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
                      {event?.status?.approved && (
                        <>
                          <div className="w-2/3 mx-auto flex flex-col gap-3 mb-6">
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
