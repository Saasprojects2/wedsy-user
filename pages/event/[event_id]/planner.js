import { Table, Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function EventTool({ user }) {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [eventDay, setEventDay] = useState("");
  const { event_id } = router.query;
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
            setEventDay(response.eventDays[0]._id);
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
  const finalizeEventDay = ({ eventDay }) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event_id}/finalize/${eventDay}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
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
  const CreatePayment = ({ eventDay }) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ eventId: event_id, eventDayId: eventDay }),
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
  useEffect(() => {
    fetchEvent();
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="px-8 flex-wrap flex flex-row items-center justify-center font-medium text-center text-lg text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {event?.eventDays?.map((item, index) => (
            <div
              key={item._id}
              className={`p-4 grow cursor-pointer ${
                eventDay === item._id && "text-black font-semibold"
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
        <div className="grid md:grid-cols-4 gap-6 py-4">
          <div className="hidden border-r md:flex flex-col gap-6 py-8 pl-8">
            <div className="flex flex-col gap-3 pl-6">
              <p className="flex flex-row justify-between pb-2 font-semibold text-xl">
                Decor
              </p>
              <div className="flex flex-col gap-2">
                <div className="text-gray-700">Entrance</div>
                <div className="text-gray-700">Pathway</div>
                <div className="font-medium text-lg flex flex-row gap-2 items-center pl-2">
                  Stage<span className="h-px flex-grow bg-black"></span>
                </div>
                <div className="text-gray-700">Mandap</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="flex flex-row justify-between pr-8">
              <div className="flex flex-col justify-between">
                <span>14 November 2023</span>
                <span>7.00PM Onwards</span>
                <span>Laleet Place Banglore</span>
              </div>
              <span className="">
                Designated Planner :
                <span className="text-rose-900 font-semibold">
                  Rohaan Saleem
                </span>
              </span>
            </div>
            {event.eventDays?.filter((item) => item._id === eventDay)[0]
              ?.decorItems.length > 0 ? (
              <>
                {event.eventDays
                  ?.filter((item) => item._id === eventDay)[0]
                  ?.decorItems.map((item) => (
                    <div
                      className="flex flex-col gap-4 pt-8 border-b border-b-black"
                      key={item._id}
                    >
                      <div className="grid grid-cols-5 gap-6 items-center px-4">
                        <div className="relative col-span-3">
                          <p className="text-xl font-semibold flex flex-row items-center gap-2 mb-2">
                            <span>{item.decor?.name}</span>
                            {/* <BiEditAlt
                              size={24}
                              className="ml-auto cursor-pointer"
                            />
                            <MdDelete size={24} className="cursor-pointer" /> */}
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
                          <p className="text-lg font-medium">Inclusive of:</p>
                          {item.decor.productInfo?.included.map(
                            (rec, recIndex) => (
                              <p key={recIndex}>{rec}</p>
                            )
                          )}
                        </div>
                        <p className="mt-auto flex flex-row items-center justify-end gap-2 text-lg text-white font-medium w-1/2 ml-auto bg-gradient-to-l from-rose-900 to-white py-2 px-10">
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
                                          : item.flooring === "PrintedFlex"
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
                        </p>
                      </div>
                    </div>
                  ))}
                <div className="overflow-x-auto mt-6 px-6">
                  <Table className="border">
                    <Table.Head>
                      <Table.HeadCell>
                        <span className="sr-only">#</span>
                      </Table.HeadCell>
                      <Table.HeadCell>Decor</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {event.eventDays
                        ?.filter((item) => item._id === eventDay)[0]
                        ?.decorItems.map((item, index) => (
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
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell></Table.Cell>
                        <Table.Cell className="text-right whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Total
                        </Table.Cell>
                        <Table.Cell>
                          ₹
                          {event.eventDays
                            ?.filter((item) => item._id === eventDay)[0]
                            ?.decorItems.reduce((accumulator, currentValue) => {
                              return accumulator + currentValue.price;
                            }, 0)}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
                {event.eventDays?.filter((item) => item._id === eventDay)[0]
                  ?.status.finalized ? (
                  event.eventDays?.filter((item) => item._id === eventDay)[0]
                    ?.status.approved ? (
                    <div className="text-center py-8 flex flex-col gap-2">
                      <p className="text-lg font-medium">
                        Your design has been approved!
                      </p>
                      {event.eventDays?.filter(
                        (item) => item._id === eventDay
                      )[0]?.status.paymentDone ? (
                        <p className="text-lg font-medium">
                          Your payment is done!
                        </p>
                      ) : (
                        <button
                          onClick={() => {
                            CreatePayment({ eventDay });
                          }}
                          className="bg-neutral-700 rounded-full p-2 px-16 text-white w-max mx-auto mt-12"
                        >
                          Proceed with Payment
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 flex flex-col gap-2">
                      <p className="text-lg font-medium">Thank you!</p>
                      <p>
                        Your design has been sent for approval. You can proceed
                        to payment once approved by your designated planner!
                      </p>
                      <p className="text-sm">
                        {"(You'll be notified on your email and phone number)"}
                      </p>
                    </div>
                  )
                ) : (
                  <button
                    onClick={() => {
                      finalizeEventDay({ eventDay });
                    }}
                    className="bg-neutral-700 rounded-full p-2 px-16 text-white w-max mx-auto mt-12"
                  >
                    Finalize
                  </button>
                )}
              </>
            ) : (
              <p className="text-center py-8">
                No decor selected.{" "}
                <Link href={"/decor"} className="underline">
                  Click here
                </Link>{" "}
                to browse
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
