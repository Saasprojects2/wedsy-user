import UserProfileHeader from "@/components/layout/UserProfileHeader";
import { toPriceString } from "@/utils/text";
import { Button, Label } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MdChevronRight,
  MdClear,
  MdEdit,
  MdExpandLess,
  MdExpandMore,
  MdOutlineChevronRight,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineLocationOn,
  MdPersonOutline,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export default function Orders({ user }) {
  const router = useRouter();
  const { biddingId } = router.query;
  const [bidding, setBidding] = useState({});
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("");
  const [expand, setExpand] = useState(false);
  const fetchBidding = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bidding/${biddingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response?._id) {
          setBidding(response);
        } else {
          router.push("/my-bids");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const ViewBid = (_id) => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bidding/${biddingId}/view/${_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.message === "success") {
          fetchBidding();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const AcceptBid = (_id) => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bidding/${biddingId}/accept/${_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.message === "success") {
          // fetchBidding();\
          router.push(`/chats/${response?.chat}`);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const RejectBid = (_id) => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bidding/${biddingId}/reject/${_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.message === "success") {
          fetchBidding();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    if (!document.body.classList.contains("relative")) {
      document.body.classList.add("relative");
    }
    if (biddingId) {
      fetchBidding();
    }
  }, [biddingId]);

  return (
    <>
      <div className="fixed grid grid-cols-4 md:hidden bottom-0 p-4 h-16 w-full items-center bg-white z-50">
        <img src="/assets/icons/icon-category.png" className="mx-auto" />
        <img src="/assets/icons/icon-makeup.png" className="mx-auto" />
        <img src="/assets/icons/icon-event.png" className="mx-auto" />
        <img src="/assets/icons/icon-user.png" className="mx-auto" />
      </div>
      {view && (
        <div className="md:hidden bg-white fixed left-0 bottom-12 px-4 py-3 pb-8 w-full z-50 flex flex-col gap-4 rounded-t-[2em]">
          {view &&
            bidding?.bids
              ?.filter((item) => item._id === view)
              ?.map((item, index) => (
                <>
                  <p className="text-2xl text-center relative pt-6">
                    {item?.vendor?.name}{" "}
                    <MdClear
                      className="absolute right-0 top-0"
                      cursor={"pointer"}
                      onClick={() => {
                        setView("");
                      }}
                    />
                  </p>
                  <div className="flex flex-row gap-4 p-6 pt-0 space-y-4">
                    <div className="relative">
                      <div className="bg-gray-300 w-40 h-40 rounded-md pt-[100%] relative">
                        <img
                          src={item?.vendor?.gallery?.coverPhoto}
                          className="absolute top-0 w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <button
                        onClick={() => {
                          router.push(
                            `/makeup-and-beauty/artists/${item?.vendor?._id}`
                          );
                        }}
                        className="w-max absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-white text-rose-900 font-medium py-1.5 px-6 rounded-md shadow-sm text-sm"
                      >
                        View
                      </button>
                      {item?.vendor?.tag && (
                        <div className="absolute top-0 right-4 translate-x-full bg-pink-500 text-white text-xs font-bold py-1 px-3 rounded-tr-md rounded-bl-md">
                          {item?.vendor?.tag}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 pt-6">
                      <p className="text-gray-700 text-sm">
                        4+ years of experience
                      </p>
                      <p className="text-gray-700 text-sm">20+ orders done</p>
                      <p className="text-gray-700 text-sm">50+ reviews</p>
                      <p className="text-gray-700 text-sm flex items-center">
                        <span className="text-blue-500 mr-1">📍</span> RT Nagar
                      </p>
                    </div>
                  </div>
                  <Label value="Note by the Artist" className="text-lg" />
                  <div className="bg-[#FFDA57] p-4 rounded-lg w-full">
                    {item?.vendor_notes}
                  </div>
                  {!item?.status?.userAccepted &&
                    !item?.status?.userRejected && (
                      <div className="bg-white rounded-lg grid grid-cols-2 px-8 py-4 gap-6">
                        <button
                          className="bg-white border border-rose-900 text-rose-900 rounded-lg text-lg py-1"
                          onClick={() => {
                            RejectBid(item?._id);
                          }}
                        >
                          Decline
                        </button>
                        <button
                          className="bg-rose-900 border border-rose-900 text-white rounded-lg text-lg py-1"
                          onClick={() => {
                            AcceptBid(item?._id);
                          }}
                        >
                          Accept & Chat
                        </button>
                      </div>
                    )}
                </>
              ))}
        </div>
      )}
      <div className="flex flex-col bg-gray-100 min-h-[90vh] md:min-h-[70vh]">
        <div className="grid md:grid-cols-5 gap-4 px-6 md:px-24 py-6">
          <div className="md:col-span-2 md:px-4 md:border-r md:border-r-black flex flex-col gap-6">
            <div
              className={`${
                expand ? "text-[#2B3F6C] bg-white" : "bg-[#2B3F6C] text-white"
              } p-6 rounded-lg flex md:hidden flex-col space-y-4 divide-y`}
            >
              <div className="flex flex-row gap-4 items-center justify-between">
                <span className="text-lg font-medium">MY REQUIREMENTS</span>
                {expand ? (
                  <MdOutlineKeyboardArrowUp
                    size={24}
                    cursor={"pointer"}
                    onClick={() => {
                      setExpand(false);
                    }}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    cursor={"pointer"}
                    onClick={() => {
                      setExpand(true);
                    }}
                  />
                )}
              </div>
              {expand && (
                <>
                  {bidding?.events?.map((item, index) => (
                    <div className="text-sm pt-4" key={index}>
                      <div className="flex flex-row justify-between mb-3">
                        <p className="text-xl font-semibold">
                          {item?.eventName}
                        </p>
                        <div>
                          {new Date(item?.date)?.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          {`${item?.time} ${
                            +item?.time.split(":")[0] < 12 ? "AM" : "PM"
                          }`}
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 items-top">
                        <p className="my-0 py-0 flex flex-row items-center gap-1">
                          <MdOutlineLocationOn className="flex-shrink-0 text-base" />
                          {"   "}
                          {item?.location}
                        </p>
                      </div>
                      {item?.peoples?.map((rec, recIndex) => (
                        <>
                          <div
                            className="flex flex-row gap-4 items-top"
                            key={recIndex}
                          >
                            <p className="my-0 py-0 flex flex-row items-center gap-1">
                              <MdPersonOutline className="flex-shrink-0 text-base" />
                              {"   "}
                              {rec?.noOfPeople}
                            </p>
                            <p className="">{rec.makeupStyle}</p>
                            <p className="">{rec.preferredLook}</p>
                          </div>
                          <div
                            className="flex flex-row gap-4 items-top mb-2"
                            key={recIndex}
                          >
                            <p className="my-0 py-0 flex flex-row items-center gap-1">
                              <RxDashboard className="flex-shrink-0 text-base" />
                              {"   "}
                              {rec?.addOns}
                            </p>
                          </div>
                        </>
                      ))}
                      {item?.notes?.length > 0 && (
                        <>
                          <Label className="mt-4" value="NOTES" />
                          <div className="border rounded-lg  p-2 bg-white">
                            {item?.notes?.join("\n")}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="hidden bg-[#2B3F6C] p-6 rounded-lg md:flex flex-row gap-4 items-center justify-between">
              <span className="text-lg text-white font-medium">
                MY REQUIREMENTS
              </span>
              <MdChevronRight
                size={24}
                cursor={"pointer"}
                color="white"
                onClick={() => {
                  setView("");
                }}
              />
            </div>
            <div className="flex items-center space-x-4 my-2">
              <p className="text-xl ">New Quotations</p>
              <div className="flex-grow border-t border-gray-300" />
              <div className="flex items-center justify-center w-6 h-6 bg-rose-900 text-white rounded-full text-xs">
                {bidding?.bids?.filter((i) => !i?.status?.userViewed).length}
              </div>
            </div>
            {bidding?.bids
              ?.filter((i) => !i?.status?.userViewed)
              ?.map((item, index) => (
                <div
                  key={item?._id}
                  className="p-4 grid grid-cols-4 md:grid-cols-5 gap-4 bg-white rounded-xl"
                >
                  <div className="bg-gray-500 pt-[100%] w-full relative">
                    <img
                      src={item?.vendor?.gallery?.coverPhoto}
                      className="absolute top-0 w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-4 relative flex flex-col justify-between">
                    <p className="uppercase text-xl font-medium">
                      {item?.vendor?.name}
                    </p>
                    <p className="text-sm">
                      Price Offered &nbsp;
                      <span className="text-rose-900 text-2xl font-medium">
                        {toPriceString(item?.bid)}
                      </span>
                    </p>
                    <MdOutlineChevronRight
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                      size={24}
                      cursor={"pointer"}
                      onClick={() => {
                        setView(item._id);
                        ViewBid(item?._id);
                      }}
                    />
                  </div>
                </div>
              ))}
            <div className="w-full border-t border-gray-300" />
            {bidding?.bids
              ?.filter((i) => i?.status?.userViewed && !i?.status?.userRejected)
              ?.map((item, index) => (
                <div
                  key={item?._id}
                  className="p-4 grid grid-cols-4 md:grid-cols-5 gap-4 bg-white rounded-xl"
                >
                  <div className="bg-gray-500 pt-[100%] w-full relative">
                    <img
                      src={item?.vendor?.gallery?.coverPhoto}
                      className="absolute top-0 w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-4 relative flex flex-col justify-between">
                    <p className="uppercase text-xl font-medium">
                      {item?.vendor?.name}
                    </p>
                    <p className="text-sm">
                      Price Offered &nbsp;
                      <span className="text-rose-900 text-2xl font-medium">
                        {toPriceString(item?.bid)}
                      </span>
                    </p>
                    <MdOutlineChevronRight
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                      size={24}
                      cursor={"pointer"}
                      onClick={() => {
                        setView(item._id);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="hidden md:flex flex-col gap-6 col-span-3 p-4">
            {view === "" && (
              <>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-2xl">Your Requirements</p>
                  <Button color="dark">
                    Edit &nbsp; <MdEdit />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4 divide-y rounded-xl p-6 bg-white">
                  {bidding?.events?.map((item, index) => (
                    <div className="text-lg pt-4" key={index}>
                      <div className="flex flex-row justify-between mb-3">
                        <p className="text-xl font-semibold">
                          {item?.eventName}
                        </p>
                        <div>
                          {new Date(item?.date)?.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          {`${item?.time} ${
                            +item?.time.split(":")[0] < 12 ? "AM" : "PM"
                          }`}
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 items-top">
                        <p className="my-0 py-0 flex flex-row items-center gap-1">
                          <MdOutlineLocationOn className="flex-shrink-0 text-base" />
                          {"   "}
                          {item?.location}
                        </p>
                      </div>
                      {item?.peoples?.map((rec, recIndex) => (
                        <>
                          <div
                            className="flex flex-row gap-4 items-top"
                            key={recIndex}
                          >
                            <p className="my-0 py-0 flex flex-row items-center gap-1">
                              <MdPersonOutline className="flex-shrink-0 text-base" />
                              {"   "}
                              {rec?.noOfPeople}
                            </p>
                            <p className="">{rec.makeupStyle}</p>
                            <p className="">{rec.preferredLook}</p>
                          </div>
                          <div
                            className="flex flex-row gap-4 items-top mb-2"
                            key={recIndex}
                          >
                            <p className="my-0 py-0 flex flex-row items-center gap-1">
                              <RxDashboard className="flex-shrink-0 text-base" />
                              {"   "}
                              {rec?.addOns}
                            </p>
                          </div>
                        </>
                      ))}
                      {item?.notes?.length > 0 && (
                        <>
                          <Label className="mt-4" value="NOTES" />
                          <div className="border rounded-lg  p-2 bg-white">
                            {item?.notes?.join("\n")}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {view &&
              bidding?.bids
                ?.filter((item) => item._id === view)
                ?.map((item, index) => (
                  <>
                    <p className="text-2xl">{item?.vendor?.name}</p>
                    <div className="flex flex-row gap-4 bg-white rounded-lg shadow-md p-6 space-y-4">
                      <div className="relative">
                        <div className="bg-gray-300 w-40 h-40 rounded-md pt-[100%] relative">
                          <img
                            src={item?.vendor?.gallery?.coverPhoto}
                            className="absolute top-0 w-full h-full object-cover rounded-xl"
                          />
                        </div>
                        <button
                          onClick={() => {
                            router.push(
                              `/makeup-and-beauty/artists/${item?.vendor?._id}`
                            );
                          }}
                          className="w-max absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-white text-rose-900 text-sm font-medium py-1.5 px-4 rounded-full shadow-sm"
                        >
                          View profile
                        </button>
                        {item?.vendor?.tag && (
                          <div className="absolute top-0 right-4 translate-x-full bg-pink-500 text-white text-xs font-bold py-1 px-3 rounded-tr-md rounded-bl-md">
                            {item?.vendor?.tag}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 pt-6">
                        <p className="text-gray-700 text-sm">
                          4+ years of experience
                        </p>
                        <p className="text-gray-700 text-sm">20+ orders done</p>
                        <p className="text-gray-700 text-sm">50+ reviews</p>
                        <p className="text-gray-700 text-sm flex items-center">
                          <span className="text-blue-500 mr-1">📍</span> RT
                          Nagar
                        </p>
                      </div>
                    </div>
                    <Label value="Note by the Artist" className="text-lg" />
                    <div className="bg-[#FFDA57] p-4 rounded-lg">
                      {item?.vendor_notes}
                    </div>
                    {!item?.status?.userAccepted &&
                      !item?.status?.userRejected && (
                        <div className="bg-white rounded-lg grid grid-cols-2 px-8 py-4 gap-6">
                          <button
                            className="bg-white border border-rose-900 text-rose-900 rounded-lg text-lg py-1"
                            onClick={() => {
                              RejectBid(item?._id);
                            }}
                          >
                            Decline
                          </button>
                          <button
                            className="bg-rose-900 border border-rose-900 text-white rounded-lg text-lg py-1"
                            onClick={() => {
                              AcceptBid(item?._id);
                            }}
                          >
                            Accept & Chat
                          </button>
                        </div>
                      )}
                  </>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
