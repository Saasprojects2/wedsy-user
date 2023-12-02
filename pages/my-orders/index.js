import UserSidebar from "@/components/layout/UserSidebar";
import { Table } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiAirplaneTilt } from "react-icons/pi";

export default function Payments({ user }) {
  const [events, setEvents] = useState([]);
  const [displayInfo, setDisplayInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEvents = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setEvents(response);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <UserSidebar display={"my-orders"} />
        <div className="flex flex-col gap-3 p-12 flex-grow">
          <p className="text-2xl font-medium">My Orders</p>
          <div className="flex flex-col gap-8 mt-6">
            {events.map((item, index) => (
              <div
                className="border-2 rounded-3xl relative flex flex-row h-auto overflow-hidden items-center"
                key={index}
              >
                <div
                  className="self-stretch font-mono flex flex-col items-center p-6 bg-rose-900 text-white font-semibold text-2xl transform tracking-widest rotate-180"
                  style={{ writingMode: "vertical-rl" }}
                >
                  <div className="flex gap-2">
                    <PiAirplaneTilt className="rotate-90" size={36} />
                    {item.name.toUpperCase()}
                  </div>
                  <span className="text-sm">BOARDING PASS</span>
                </div>
                <div className="flex flex-col flex-grow divide-y-2 px-4 font-mono py-2">
                  {item.eventDays
                    .filter((rec) => rec.status.paymentDone)
                    .map((rec, recIndex) => (
                      <div key={recIndex} className="py-2">
                        <div className="flex flex-row justify-around items-center">
                          <div className="flex flex-col items-center">
                            <p className="text-gray-500 text-sm">EVENT NAME</p>
                            <p className="text-xl font-medium">
                              {rec.name.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-gray-500 text-sm">EVENT DATE</p>
                            <p className="text-xl font-medium">
                              {rec.date.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-gray-500 text-sm">EVENT TIME</p>
                            <p className="text-xl font-medium">
                              {rec.time.toUpperCase()}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p
                              className="underline cursor-pointer"
                              onClick={() => {
                                if (
                                  displayInfo.includes(`${item._id}/${rec._id}`)
                                ) {
                                  setDisplayInfo(
                                    displayInfo.filter(
                                      (i) => i !== `${item._id}/${rec._id}`
                                    )
                                  );
                                } else {
                                  setDisplayInfo([
                                    ...displayInfo,
                                    `${item._id}/${rec._id}`,
                                  ]);
                                }
                              }}
                            >
                              {displayInfo.includes(`${item._id}/${rec._id}`)
                                ? "Hide details"
                                : "View details"}
                            </p>
                          </div>
                        </div>
                        {displayInfo.includes(`${item._id}/${rec._id}`) && (
                          <Table className="border mt-2 rounded-2xl">
                            <Table.Head>
                              <Table.HeadCell>
                                <span className="sr-only">#</span>
                              </Table.HeadCell>
                              <Table.HeadCell>Decor</Table.HeadCell>
                              <Table.HeadCell>Quantity</Table.HeadCell>
                              <Table.HeadCell>Price</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                              {rec?.decorItems.map((decorItem, index) => (
                                <Table.Row
                                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                  key={index}
                                >
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {decorItem.category}
                                  </Table.Cell>
                                  <Table.Cell>{decorItem.quantity}</Table.Cell>
                                  <Table.Cell>₹{decorItem.price}</Table.Cell>
                                </Table.Row>
                              ))}
                              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell className="text-right whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                  Total
                                </Table.Cell>
                                <Table.Cell>
                                  ₹
                                  {rec?.decorItems.reduce(
                                    (accumulator, currentValue) => {
                                      return accumulator + currentValue.price;
                                    },
                                    0
                                  )}
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
