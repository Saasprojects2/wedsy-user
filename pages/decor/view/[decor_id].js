import { AiFillHeart } from "react-icons/ai";
import {
  Checkbox,
  Dropdown,
  Label,
  Modal,
  Rating,
  TextInput,
  Tooltip,
} from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronDown,
  BsInfoCircle,
} from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { toProperCase } from "@/utils/text";
import Head from "next/head";

function DecorListing({
  similarDecor,
  decor,
  userLoggedIn,
  setOpenLoginModal,
}) {
  const router = useRouter();
  const [similarIndex, setSimilarIndex] = useState([0, 1, 2]);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [variant, setVariant] = useState(
    decor.productInfo.variant.artificialFlowers.sellingPrice > 0
      ? "artificialFlowers"
      : "naturalFlowers"
  );
  const [addOns, setAddOns] = useState({
    open: false,
    platform: false,
    dimensions: { length: 0, breadth: 0, height: 0 },
    price: 0,
    eventId: "",
    eventDayId: "",
    flooring: "",
    baseCost: 0,
    quantity: 1,
    unit: decor.unit,
  });
  const [quantity, setQuantiy] = useState({
    open: false,
    eventId: "",
    eventDayId: "",
    quantity: 1,
    unit: "",
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    community: "",
    eventDay: "",
    time: "",
    date: "",
    venue: "",
  });
  const { decor_id } = router.query;
  const fetchEvents = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response) {
          setEventList(response);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const createEvent = () => {
    if (!userLoggedIn) {
      setOpenLoginModal(true);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(eventData),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response._id) {
            setShowEventModal(false);
            setEventData({
              name: "",
              community: "",
              eventDay: "",
              time: "",
              date: "",
              venue: "",
            });
            fetchEvents();
            alert("Event Created Successfully!");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  };
  const AddToWishlist = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/decor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ _id: decor_id }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          setIsAddedToWishlist(true);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const RemoveFromWishList = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/decor`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ _id: decor_id }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          setIsAddedToWishlist(false);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const AddToEvent = ({
    eventId,
    eventDayId,
    platform,
    flooring,
    dimensions,
    price,
    quantity,
    unit,
  }) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}/decor/${eventDayId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          decor: decor_id,
          platform,
          flooring,
          dimensions,
          price,
          category: decor.category,
          variant,
          quantity,
          unit,
        }),
      }
    )
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          fetchEvents();
          alert("Item added to event!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const RemoveFromEvent = ({ eventId, eventDayId }) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}/decor/${eventDayId}`,
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
          fetchEvents();
          alert("Item remove from event!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    if (decor_id && userLoggedIn) {
      fetchEvents();
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/is-added-to-wishlist?product=decor&_id=${decor_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => (response.ok ? response.json() : null))
        .then((response) => {
          if (response) {
            setIsAddedToWishlist(response.wishlist);
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [decor_id, userLoggedIn]);
  return (
    <>
      <Head>
        <title>{decor.name} | Wedsy</title>
        <meta name="description" content={decor?.seoTags?.description} />
        <meta property="og:title" content={decor.name} />
        <meta property="og:description" content={decor?.seoTags?.description} />
        <meta property="og:image" content={decor?.seoTags?.image} />
      </Head>
      {/* Pathway Quantity Model */}
      <Modal
        show={quantity.open}
        size="lg"
        popup
        onClose={() =>
          setQuantiy({
            open: false,
            eventId: "",
            eventDayId: "",
            quantity: 1,
            unit: "",
          })
        }
      >
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white px-4">
            Setect Pathway Quantity (Unit: {quantity.unit})
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row gap-6">
            <TextInput
              type="Number"
              value={quantity.quantity}
              onChange={(e) => {
                setQuantiy({ ...quantity, quantity: parseInt(e.target.value) });
              }}
            />
            <button
              className={`text-white bg-rose-900  border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
              onClick={() => {
                // setAddOns({ ...addOns, platform: true });
                setQuantiy({
                  open: false,
                  eventId: "",
                  eventDayId: "",
                  quantity: 1,
                  unit: "",
                });
                AddToEvent({
                  quantity: quantity.quantity,
                  unit: decor.unit,
                  eventDayId: quantity.eventDayId,
                  eventId: quantity.eventId,
                  platform: false,
                  flooring: "",
                  dimensions: {
                    length: 0,
                    breadth: 0,
                    height: 0,
                  },
                  price:
                    quantity.quantity *
                    decor.productInfo.variant[variant].sellingPrice,
                });
              }}
            >
              Add to Event
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Event Modal */}
      <Modal
        show={showEventModal}
        size="lg"
        popup
        onClose={() => {
          setShowEventModal(false);
          setEventData({
            name: "",
            community: "",
            eventDay: "",
            time: "",
            date: "",
            venue: "",
          });
        }}
      >
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white px-4">
            Create New Event
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-6">
            <TextInput
              type="text"
              placeholder="EVENT NAME"
              value={eventData.name}
              onChange={(e) =>
                setEventData({ ...eventData, name: e.target.value })
              }
            />
            <TextInput
              type="text"
              name="eventDay"
              placeholder="EVENT DAY (eg: Reception)"
              value={eventData.eventDay}
              onChange={(e) =>
                setEventData({ ...eventData, eventDay: e.target.value })
              }
            />
            <TextInput
              type="text"
              name="community"
              placeholder="COMMUNITY"
              value={eventData.community}
              onChange={(e) =>
                setEventData({ ...eventData, community: e.target.value })
              }
            />
            <TextInput
              type="date"
              name="date"
              placeholder="DATE"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
            />
            <TextInput
              type="time"
              name="time"
              placeholder="START TIME"
              value={eventData.time}
              onChange={(e) =>
                setEventData({ ...eventData, time: e.target.value })
              }
            />
            <TextInput
              type="text"
              name="venue"
              placeholder="VENUE"
              value={eventData.venue}
              onChange={(e) =>
                setEventData({ ...eventData, venue: e.target.value })
              }
            />
            <button
              className={`text-white bg-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white disabled:bg-rose-800 font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
              disabled={
                !eventData.name ||
                !eventData.community ||
                !eventData.eventDay ||
                !eventData.time ||
                !eventData.date ||
                !eventData.venue
              }
              onClick={() => {
                createEvent();
              }}
            >
              Create Event
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Addons Model */}
      <Modal
        show={addOns.open}
        size="lg"
        popup
        onClose={() =>
          setAddOns({
            ...addOns,
            open: false,
            platform: false,
            dimensions: { length: 0, breadth: 0, height: 0 },
            price: 0,
            eventId: "",
            eventDayId: "",
            flooring: "",
            baseCost: 0,
          })
        }
      >
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white px-4">
            Product add-ons
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {addOns.flooring === undefined ? (
              <>
                <Image
                  src="/assets/images/platform.png"
                  alt="Platform"
                  width={0}
                  height={0}
                  sizes="100%"
                  style={{ width: "50%", height: "auto" }}
                />
                <div className="flex flex-row items-center gap-2">
                  <p>Do you want to add a platform?</p>
                  <button
                    className={`${
                      addOns.platform
                        ? "text-white bg-rose-900"
                        : "bg-white text-rose-900"
                    }  border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
                    onClick={() => {
                      setAddOns({ ...addOns, platform: true });
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={`${
                      !addOns.platform && addOns.platform !== undefined
                        ? "text-white bg-rose-900"
                        : "bg-white text-rose-900"
                    } border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
                    onClick={() => {
                      setAddOns({
                        ...addOns,
                        open: false,
                        platform: false,
                        dimensions: { length: 0, breadth: 0, height: 0 },
                        price: 0,
                        eventId: "",
                        eventDayId: "",
                        flooring: "",
                        baseCost: 0,
                      });
                      AddToEvent({
                        quantity: 1,
                        unit: decor.unit,
                        eventDayId: addOns.eventDayId,
                        eventId: addOns.eventId,
                        platform: false,
                        flooring: "",
                        dimensions: {
                          length: 0,
                          breadth: 0,
                          height: 0,
                        },
                        price: decor.productInfo.variant[variant].sellingPrice,
                      });
                    }}
                  >
                    No
                  </button>
                </div>
                {addOns.platform && (
                  <div className="border-t border-t-black pt-2 flex flex-col gap-2">
                    <p className="font-medium">
                      Dimensions for platform (in feet)
                    </p>
                    <div className="flex flex-row gap-2 itms-end">
                      <div className="flex flex-col">
                        <p>Length</p>
                        <TextInput
                          type="number"
                          placeholder="length"
                          required
                          value={addOns.dimensions.length}
                          onChange={(e) => {
                            setAddOns({
                              ...addOns,
                              dimensions: {
                                ...addOns.dimensions,
                                length: e.target.value,
                              },
                            });
                          }}
                          disabled={addOns.price > 0}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p>Breadth</p>
                        <TextInput
                          type="number"
                          placeholder="breadth"
                          required
                          value={addOns.dimensions.breadth}
                          onChange={(e) => {
                            setAddOns({
                              ...addOns,
                              dimensions: {
                                ...addOns.dimensions,
                                breadth: e.target.value,
                              },
                            });
                          }}
                          disabled={addOns.price > 0}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p>Height</p>
                        <TextInput
                          type="number"
                          placeholder="height"
                          required
                          value={addOns.dimensions.height}
                          onChange={(e) => {
                            setAddOns({
                              ...addOns,
                              dimensions: {
                                ...addOns.dimensions,
                                height: e.target.value,
                              },
                            });
                          }}
                          disabled={addOns.price > 0}
                        />
                      </div>
                      <div className="flex flex-col">
                        <button
                          className={`mt-auto text-white bg-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                          onClick={() => {
                            try {
                              let l = parseFloat(addOns.dimensions.length);
                              let b = parseFloat(addOns.dimensions.breadth);
                              let h = parseFloat(addOns.dimensions.height);
                              if (l > 0 && b > 0 && h > 0) {
                                let cost = l * b * 25;
                                let baseCost = (l + h) * (b + h);
                                setAddOns({
                                  ...addOns,
                                  dimensions: {
                                    length: l,
                                    breadth: b,
                                    height: h,
                                  },
                                  price: cost,
                                  baseCost,
                                });
                              } else {
                                alert("Enter possible values");
                              }
                            } catch (e) {
                              alert("Error, try again");
                            }
                          }}
                          disabled={
                            !addOns.dimensions.length ||
                            !addOns.dimensions.breadth ||
                            !addOns.dimensions.height
                          }
                        >
                          Calculate
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {addOns.price > 0 && (
                  <div className="border-t border-t-black pt-2 flex flex-row gap-2">
                    <p className="font-medium flex flex-col">
                      <span>Flooring Price: </span>
                      <span className="text-rose-900 font-semibold">
                        ₹{addOns.price}
                      </span>
                    </p>
                    <div className="flex flex-col ml-auto">
                      <button
                        className={`mt-auto text-white bg-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                        onClick={() => {
                          setAddOns({ ...addOns, flooring: "" });
                        }}
                      >
                        Select Flooring Type
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="font-medium flex flex-row gap-4 items-center justify-between">
                  <Image
                    src="/assets/images/carpet.png"
                    alt="Platform"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "30%", height: "auto" }}
                  />
                  <p className="font-medium flex flex-col items-center">
                    <span>Carpet</span>
                    <span className="text-rose-900 font-semibold">
                      ₹{addOns.baseCost * 8}
                    </span>
                  </p>
                  <div className="flex flex-col">
                    <button
                      className={`${
                        addOns.flooring === "Carpet"
                          ? "text-white bg-rose-900"
                          : "bg-white text-rose-900"
                      } hover:text-white border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                      onClick={() => {
                        setAddOns({
                          ...addOns,
                          flooring: "Carpet",
                        });
                      }}
                    >
                      {addOns.flooring === "Carpet" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
                <div className="font-medium flex flex-row gap-4 items-center justify-between">
                  <Image
                    src="/assets/images/flex.png"
                    alt="Platform"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "30%", height: "auto" }}
                  />
                  <p className="font-medium flex flex-col items-center">
                    <span>Flex</span>
                    <span className="text-rose-900 font-semibold">
                      ₹{addOns.baseCost * 10}
                    </span>
                  </p>
                  <div className="flex flex-col">
                    <button
                      className={`${
                        addOns.flooring === "Flex"
                          ? "text-white bg-rose-900"
                          : "bg-white text-rose-900"
                      } hover:text-white border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                      onClick={() => {
                        setAddOns({
                          ...addOns,
                          flooring: "Flex",
                        });
                      }}
                    >
                      {addOns.flooring === "Flex" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
                <div className="font-medium flex flex-row gap-4 items-center justify-between">
                  <Image
                    src="/assets/images/printedFlex.png"
                    alt="Platform"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "30%", height: "auto" }}
                  />
                  <p className="font-medium flex flex-col items-center">
                    <span>Printed Flex</span>
                    <span className="text-rose-900 font-semibold">
                      ₹{addOns.baseCost * 15}
                    </span>
                  </p>
                  <div className="flex flex-col">
                    <button
                      className={`${
                        addOns.flooring === "PrintedFlex"
                          ? "text-white bg-rose-900"
                          : "bg-white text-rose-900"
                      } hover:text-white border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                      onClick={() => {
                        setAddOns({
                          ...addOns,
                          flooring: "PrintedFlex",
                        });
                      }}
                    >
                      {addOns.flooring === "PrintedFlex"
                        ? "Selected"
                        : "Select"}
                    </button>
                  </div>
                </div>
                {addOns.flooring && (
                  <div className="flex flex-row items-center justify-between">
                    <p className="font-medium flex flex-col">
                      <span className="flex flex-row gap-2 items-center">
                        Total Price:{" "}
                        <Tooltip
                          content={`${
                            decor.productInfo.variant[variant].sellingPrice
                          } + ${addOns.price} + ${
                            addOns.flooring === "Carpet"
                              ? addOns.baseCost * 8
                              : addOns.flooring === "Flex"
                              ? addOns.baseCost * 10
                              : addOns.flooring === "PrintedFlex"
                              ? addOns.baseCost * 15
                              : 0
                          }`}
                          trigger="hover"
                        >
                          <BsInfoCircle />
                        </Tooltip>
                      </span>
                      <span className="text-rose-900 font-semibold">
                        ₹
                        {decor.productInfo.variant[variant].sellingPrice +
                          addOns.price +
                          (addOns.flooring === "Carpet"
                            ? addOns.baseCost * 8
                            : addOns.flooring === "Flex"
                            ? addOns.baseCost * 10
                            : addOns.flooring === "PrintedFlex"
                            ? addOns.baseCost * 15
                            : 0)}
                      </span>
                    </p>
                    <button
                      className={`text-white bg-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
                      onClick={() => {
                        setAddOns({
                          ...addOns,
                          open: false,
                          platform: false,
                          dimensions: { length: 0, breadth: 0, height: 0 },
                          price: 0,
                          eventId: "",
                          eventDayId: "",
                          flooring: "",
                          baseCost: 0,
                        });
                        AddToEvent({
                          quantity: 1,
                          unit: decor.unit,
                          eventDayId: addOns.eventDayId,
                          eventId: addOns.eventId,
                          platform: true,
                          flooring: addOns.flooring,
                          dimensions: addOns.dimensions,
                          price:
                            decor.productInfo.variant[variant].sellingPrice +
                            addOns.price +
                            (addOns.flooring === "Carpet"
                              ? addOns.baseCost * 8
                              : addOns.flooring === "Flex"
                              ? addOns.baseCost * 10
                              : addOns.flooring === "PrintedFlex"
                              ? addOns.baseCost * 15
                              : 0),
                        });
                      }}
                    >
                      Add to Event
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <div className="md:p-8 grid grid-cols-1 md:grid-cols-4 md:gap-8 decor-bg-image">
        <div className="order-last md:order-first border-t md:border-t-0 md:border-r-0 border-black flex flex-col md:divide-y gap-4 md:divide-black md:pr-6">
          <p className="text-xl font-medium hidden md:block">Description</p>
          {decor.category !== "Mandap" && (
            <div className="flex flex-col pt-4 px-4 md:px-0 gap-2">
              <p className="text-lg flex flex-row justify-between">
                Can be used for
              </p>
              <ul className="list-disc pl-4 flex flex-col gap-1">
                {decor.productVariation.occassion.map((item, index) => (
                  <li className="" key={index}>
                    {toProperCase(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col pt-4 px-4 md:px-0">
            <p className="text-lg flex flex-row justify-between">
              Colour Theme
            </p>
            {decor.productVariation.colors.map((item, index) => (
              <p className="" key={index}>
                {toProperCase(item)}
              </p>
            ))}
          </div>
          {/* {decor.productVariation.flowers.length > 0 && (
            <div className="flex flex-col pt-4 px-4 md:px-0">
              <p className="text-lg flex flex-row justify-between">Flowers</p>
              {decor.productVariation.flowers.map((item, index) => (
                <p className="" key={index}>
                  {toProperCase(item)}
                </p>
              ))}
            </div>
          )} */}
          {/* {decor.productVariation.fabric.length > 0 && (
            <div className="flex flex-col pt-4 px-4 md:px-0">
              <p className="text-lg flex flex-row justify-between">Fabric</p>
              {decor.productVariation.fabric.map((item, index) => (
                <p className="" key={index}>
                  {toProperCase(item)}
                </p>
              ))}
            </div>
          )} */}
          <div className="flex flex-col pt-4 px-4 md:px-0 gap-2">
            <p className="text-lg flex flex-row justify-between">Included</p>
            <ul className="list-disc pl-4 flex flex-col gap-1">
              {decor.productInfo.included.map((item, index) => (
                <li className="" key={index}>
                  {toProperCase(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col pt-4 px-4 md:px-0 gap-2">
            <p className="text-lg flex flex-row justify-between">Sizes:</p>
            <ul className="list-disc pl-4 flex flex-col gap-1">
              {decor.productInfo.measurements.length > 0 && (
                <li>Length: {decor.productInfo.measurements.length} ft.</li>
              )}
              {decor.productInfo.measurements.width > 0 && (
                <li>Width: {decor.productInfo.measurements.width} ft.</li>
              )}
              {decor.productInfo.measurements.height > 0 && (
                <li>Height: {decor.productInfo.measurements.height} ft.</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col pt-4 md:border-b md:border-black px-4 md:px-0">
            {/* <p className="text-lg flex flex-row justify-between">Placement</p> */}
          </div>
        </div>
        <div className="md:col-span-3 py-3 px-4 md:px-0 md:py-6">
          <div className="md:px-10 relative">
            {/* <div className="w-full md:w-1/2 mb-4">
              <SearchBar />
            </div> */}
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <p className="font-semibold text-2xl">
                {decor.name}{" "}
                <span className="text-lg font-normal">
                  ({decor?.productInfo.id})
                </span>
              </p>
              <Rating size={"md"}>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
              </Rating>
            </div>
            <Image
              src={decor.image}
              alt="Decor"
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
              className="rounded-xl md:mb-10"
            />
            <div className="flex flex-row flex-wrap gap-4 items-center">
              <div className="mr-auto  flex flex-col">
                <p className="flex">
                  Price for &nbsp;
                  {decor.productInfo.variant.artificialFlowers.sellingPrice >
                  0 ? (
                    <Dropdown
                      inline
                      renderTrigger={() => (
                        <span className="font-semibold text-rose-900 cursor-pointer flex items-center gap-1">
                          {variant === "artificialFlowers"
                            ? "Artificial"
                            : variant === "naturalFlowers"
                            ? "Natural"
                            : variant === "mixedFlowers"
                            ? "Mixed"
                            : ""}{" "}
                          Flowers <BsChevronDown />
                        </span>
                      )}
                      className="text-rose-900"
                    >
                      {decor.productInfo.variant.artificialFlowers
                        .sellingPrice > 0 &&
                        variant !== "artificialFlowers" && (
                          <Dropdown.Item
                            onClick={() => {
                              setVariant("artificialFlowers");
                            }}
                          >
                            Artifical Flowers
                          </Dropdown.Item>
                        )}
                      {decor.productInfo.variant.naturalFlowers.sellingPrice >
                        0 &&
                        variant !== "naturalFlowers" && (
                          <Dropdown.Item
                            onClick={() => {
                              setVariant("naturalFlowers");
                            }}
                          >
                            Natural Flowers
                          </Dropdown.Item>
                        )}
                      {decor.productInfo.variant.mixedFlowers.sellingPrice >
                        0 &&
                        variant !== "mixedFlowers" && (
                          <Dropdown.Item
                            onClick={() => {
                              setVariant("mixedFlowers");
                            }}
                          >
                            Mixed Flowers
                          </Dropdown.Item>
                        )}
                    </Dropdown>
                  ) : (
                    <span className="font-semibold text-rose-900 flex items-center gap-1">
                      {variant === "artificialFlowers"
                        ? "Artificial"
                        : variant === "naturalFlowers"
                        ? "Natural"
                        : variant === "mixedFlowers"
                        ? "Mixed"
                        : ""}{" "}
                      Flowers
                    </span>
                  )}
                </p>
                <p className="font-semibold text-xl">
                  ₹ {decor.productInfo.variant[variant].sellingPrice}
                </p>
              </div>
              <Dropdown
                inline
                arrowIcon={false}
                dismissOnClick={false}
                label={
                  <button
                    type="button"
                    className="text-white bg-rose-900 hover:bg-rose-900 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    onClick={() => {
                      if (!userLoggedIn) {
                        setOpenLoginModal(true);
                      }
                    }}
                  >
                    Add to Event
                  </button>
                }
                className="border border-black rounded-lg bg-black"
              >
                <Dropdown.Item className="text-white">Event List</Dropdown.Item>
                {eventList?.map((item) => (
                  <>
                    <Dropdown.Divider className="bg-black h-[1px] my-0" />
                    <Dropdown.Item
                      className="bg-white flex flex-row gap-4"
                      as="p"
                    >
                      <Label className="flex">{item.name}</Label>
                    </Dropdown.Item>
                    {item.eventDays.map((rec) => (
                      <Dropdown.Item
                        key={rec._id}
                        className="bg-white flex flex-row gap-4"
                        onClick={() => {}}
                        as={Label}
                      >
                        <Checkbox
                          checked={
                            rec.decorItems.filter((i) => i.decor === decor_id)
                              .length > 0
                          }
                          disabled={rec.status.finalized}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (
                                ["Stage", "Photobooth", "Mandap"].includes(
                                  decor.category
                                )
                              ) {
                                setAddOns({
                                  ...addOns,
                                  open: true,
                                  platform: undefined,
                                  dimensions: {
                                    length: 0,
                                    breadth: 0,
                                    height: 0,
                                  },
                                  price: 0,
                                  eventDayId: rec._id,
                                  eventId: item._id,
                                  flooring: undefined,
                                  baseCost: 0,
                                });
                              } else if (decor.category === "Pathway") {
                                setQuantiy({
                                  open: true,
                                  eventDayId: rec._id,
                                  eventId: item._id,
                                  quantity: 1,
                                  unit: decor.unit,
                                });
                              } else {
                                AddToEvent({
                                  quantity: 1,
                                  unit: decor.unit,
                                  eventDayId: rec._id,
                                  eventId: item._id,
                                  platform: false,
                                  flooring: "",
                                  dimensions: {
                                    length: 0,
                                    breadth: 0,
                                    height: 0,
                                  },
                                  price:
                                    decor.productInfo.variant[variant]
                                      .sellingPrice,
                                });
                              }
                            } else {
                              RemoveFromEvent({
                                eventDayId: rec._id,
                                eventId: item._id,
                              });
                            }
                          }}
                        />
                        {rec.name}
                      </Dropdown.Item>
                    ))}
                  </>
                ))}
                <Dropdown.Divider className="bg-black h-[1px] my-0" />
                <Dropdown.Item
                  // as={Link}
                  // href="/event"
                  onClick={() => {
                    setShowEventModal(true);
                  }}
                  className="bg-white text-cyan-600"
                >
                  + Create New Event
                </Dropdown.Item>
              </Dropdown>
              <button
                className={`${
                  isAddedToWishlist
                    ? "text-rose-900 bg-white hover-white"
                    : "text-white bg-rose-900 hover:bg-rose-900"
                } cursor-pointer px-5 py-2.5 focus:outline-none rounded-lg border-rose-900 border `}
                onClick={() => {
                  if (userLoggedIn) {
                    isAddedToWishlist ? RemoveFromWishList() : AddToWishlist();
                  } else {
                    setOpenLoginModal(true);
                  }
                }}
              >
                <AiFillHeart size={20} />
              </button>
            </div>
            <p className="mt-6">{decor.description}</p>
          </div>
        </div>
      </div>
      <div className="border-y border-y-black p-8 decor-bg-image">
        <p className="text-2xl font-semibold px-12">Similar Decor</p>
        <div className="flex flex-row md:gap-12 justify-between items-center my-6">
          <BsArrowLeftShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = similarDecor.length;
              let prev = similarIndex[0];
              let mid = similarIndex[1];
              let next = similarIndex[2];
              next = mid;
              mid = prev;
              if (prev === 0) {
                prev = length - 1;
              } else {
                prev--;
              }
              setSimilarIndex([prev, mid, next]);
            }}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-12 grow">
            <DecorCard decor={similarDecor[similarIndex[0]]} />
            <DecorCard
              decor={similarDecor[similarIndex[1]]}
              className="hidden md:inline"
            />
            <DecorCard
              decor={similarDecor[similarIndex[2]]}
              className="hidden md:inline"
            />
          </div>
          <BsArrowRightShort
            size={48}
            className="cursor-pointer scale-[0.5] md:scale-[1]"
            onClick={() => {
              let length = similarDecor.length;
              let prev = similarIndex[0];
              let mid = similarIndex[1];
              let next = similarIndex[2];
              prev = mid;
              mid = next;
              if (next === length - 1) {
                next = 0;
              } else {
                next++;
              }
              setSimilarIndex([prev, mid, next]);
            }}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { decor_id } = context.params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor?similarDecorFor=${decor_id}`
    );
    const similarDecor = await response.json();
    const decorResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor/${decor_id}`
    );
    const decor = await decorResponse.json();
    if (!decor || decorResponse.status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/decor/view",
        },
      };
    }
    return {
      props: {
        similarDecor: similarDecor.list,
        decor,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        similarDecor: [],
      },
    };
  }
}

export default DecorListing;
