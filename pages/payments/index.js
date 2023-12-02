import UserSidebar from "@/components/layout/UserSidebar";
import { useEffect, useState } from "react";

export default function Payments({ user }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPayments = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setPayments(response);
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
          fetchPayments();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchPayments();
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <UserSidebar display={"my-payments"} />
        <div className="flex flex-col gap-3 p-12 flex-grow">
          <p className="text-2xl font-medium">Payments</p>
          <div className="grid grid-cols-3 gap-4 divide-x-2 mt-8 py-2 border-b-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-4xl font-light">
                {(
                  payments.reduce(
                    (accumulator, currentObject) =>
                      accumulator + currentObject.amount,
                    0
                  ) / 100
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p className="text-lg font-medium">Total Bills</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-green-500">
              <p className="text-4xl font-light ">
                {(
                  payments.reduce(
                    (accumulator, currentObject) =>
                      accumulator + currentObject.amountPaid,
                    0
                  ) / 100
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p className="text-lg font-medium">Amount Paid</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-red-500">
              <p className="text-4xl font-light ">
                {(
                  payments.reduce(
                    (accumulator, currentObject) =>
                      accumulator + currentObject.amountDue,
                    0
                  ) / 100
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p className="text-lg font-medium">Amount Due</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 mt-6">
            {payments.map((item, index) => {
              const day = item.event.eventDays.find(
                (rec) => rec._id === item.eventDay
              );
              return (
                <div className="border-2 rounded-2xl p-4 relative" key={index}>
                  <p className="text-xl">
                    {item.event.name}
                    {" | "}
                    {day.name}
                    <span className="float-right">{day.date}</span>
                  </p>
                  <p className="mt-2">
                    Total Amount:{" "}
                    {item.amount.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <p className="mt-2 text-green-500">
                    Amount Paid:{" "}
                    {item.amountPaid.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <p className="mt-2 text-red-500">
                    Amount Due:{" "}
                    {item.amountDue.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                  <button
                    onClick={() => {
                      makePayment({
                        order_id: item.razporPayId,
                        amount: item.amount,
                      });
                    }}
                    className="bg-neutral-700 rounded-full p-2 px-16 text-white w-max float-right absolute bottom-0 right-8 translate-y-1/2"
                  >
                    Proceed with Payment
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
