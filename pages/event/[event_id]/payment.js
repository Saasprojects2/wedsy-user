import { toProperCase } from "@/utils/text";
import {
  Button,
  Label,
  Modal,
  Radio,
  Table,
  Textarea,
  Tooltip,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";
import { BiEditAlt, BiMap } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight, BsInfoCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function EventTool({ user }) {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentOption, setPaymentOption] = useState("advance-payment");
  const [eventInfo, setEventInfo] = useState({
    allowAdvancePayment: true,
    earliestDate: "",
  });
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
          if (response.status.approved && !response.status.paymentDone) {
            let tempEventDays = response.eventDays.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
            const earliestDate = tempEventDays[0].date;
            const today = new Date();
            const earliestEventDate = new Date(earliestDate);
            const timeDifference =
              earliestEventDate.getTime() - today.getTime();
            const daysDifference = Math.ceil(
              timeDifference / (1000 * 3600 * 24)
            );
            setEventInfo({
              allowAdvancePayment: daysDifference > 10,
              earliestDate: earliestDate,
            });
            if (daysDifference < 10) {
              setPaymentAmount(response.amount.total);
              setPaymentOption("full-payment");
            } else {
              setPaymentAmount(Math.ceil(response?.amount.total * 0.2));
            }
            setEvent(response);
          } else {
            router.push(`/event/${event_id}/planner`);
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
      handler: function (response) {
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
  const CreatePayment = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        event: event_id,
        paymentFor: "event",
        paymentMethod: "razporpay",
        amount: paymentAmount,
      }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          makePayment({ order_id: response.order_id, amount: response.amount });
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
    <>
      <div className="flex flex-col gap-8 px-6 md:px-24 py-6 md:py-12">
        <div className="flex flex-row justify-between">
          <Image
            src={"/assets/images/buyer_protection.png"}
            alt="Decor"
            width={0}
            height={0}
            sizes="100%"
            className="h-20 w-auto"
          />
          <Image
            src={"/logo-black.png"}
            alt="Decor"
            width={0}
            height={0}
            sizes="100%"
            className="h-12 w-auto"
          />
        </div>
        <p className="flex flex-row justify-between pb-2 font-semibold text-2xl">
          Payment page
        </p>
        <p className="flex flex-row justify-between pb-2 font-medium text-xl">
          Choose payment method style
        </p>
        <div className="flex flex-col gap-6 border-b border-b-black pb-4">
          <div>
            <div className="flex items-center gap-2 text-lg">
              <Radio
                id="advance-payment"
                name="advance-payment"
                value="advance-payment"
                checked={paymentOption === "advance-payment"}
                onChange={(e) => {
                  setPaymentOption(e.target.value);
                  setPaymentAmount(Math.ceil(event?.amount?.total * 0.2));
                }}
                disabled={!eventInfo.allowAdvancePayment}
              />
              <Label htmlFor="advance-payment">
                Booking amount ( 20% of Total Bill ){" "}
                {!eventInfo.allowAdvancePayment && (
                  <span className="text-rose-900">
                    Not Allowed as event date is near.
                  </span>
                )}
                <br />
                <span>
                  <span className="text-rose-900">
                    ₹{Math.ceil(event?.amount?.total * 0.2)}
                  </span>{" "}
                  to be paid
                </span>
              </Label>
              <Label className="ml-auto">
                Remaining amount payable:{" "}
                <span className="text-rose-900">
                  ₹
                  {event?.amount?.total - Math.ceil(event?.amount?.total * 0.2)}
                </span>
              </Label>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg">
              <Radio
                id="full-payment"
                name="full-payment"
                value="full-payment"
                checked={paymentOption === "full-payment"}
                onChange={(e) => {
                  setPaymentOption(e.target.value);
                  setPaymentAmount(event?.amount.total);
                }}
              />
              <Label htmlFor="full-payment">Full payment</Label>
            </div>
          </div>
        </div>
        <button
          className="font-semibold bg-rose-900 rounded-full p-2 px-16 text-white w-max mx-auto"
          onClick={() => {
            CreatePayment();
          }}
        >
          Pay Now
        </button>
        <p className="text-center">
          Please do not close the window or refresh the page till the trsaction
          is complete
        </p>
      </div>
    </>
  );
}
