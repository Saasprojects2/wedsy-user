import { AiFillHeart } from "react-icons/ai";
import {
  Button,
  Checkbox,
  Dropdown,
  Label,
  Modal,
  Rating,
  Table,
  TextInput,
  Tooltip,
} from "flowbite-react";
import Image from "next/image";
import SearchBar from "@/components/searchBar/SearchBar";
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
import DecorPackageCard from "@/components/cards/DecorPackageCard";

function DecorListing({
  similarDecorPackages,
  decorPackage,
  userLoggedIn,
  setOpenLoginModal,
}) {
  const router = useRouter();
  const [similarIndex, setSimilarIndex] = useState([0, 1, 2]);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [eventList, setEventList] = useState([]);
  //   const [variant, setVariant] = useState(
  //     decorPackage.variant.artificialFlowers.sellingPrice > 0
  //       ? "artificialFlowers"
  //       : "naturalFlowers"
  //   );
  //   const [addOns, setAddOns] = useState({
  //     open: false,
  //     platform: false,
  //     dimensions: { length: 0, breadth: 0, height: 0 },
  //     price: 0,
  //     eventId: "",
  //     eventDayId: "",
  //     flooring: "",
  //     baseCost: 0,
  //     quantity: 1,
  //     unit: decor.unit,
  //   });
  //   const [quantity, setQuantiy] = useState({
  //     open: false,
  //     eventId: "",
  //     eventDayId: "",
  //     quantity: 1,
  //     unit: "",
  //   });
  const { package_id } = router.query;
  //   const fetchEvents = () => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/event`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //       .then((response) => (response.ok ? response.json() : null))
  //       .then((response) => {
  //         if (response) {
  //           setEventList(response);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was a problem with the fetch operation:", error);
  //       });
  //   };
  //   useEffect(() => {
  //     if (decor_id && userLoggedIn) {
  //       fetchEvents();
  //       fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/user/is-added-to-wishlist?product=decor&_id=${decor_id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       )
  //         .then((response) => (response.ok ? response.json() : null))
  //         .then((response) => {
  //           if (response) {
  //             setIsAddedToWishlist(response.wishlist);
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("There was a problem with the fetch operation:", error);
  //         });
  //     }
  //   }, [decor_id, userLoggedIn]);
  //   const AddToWishlist = () => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/decor`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ _id: decor_id }),
  //     })
  //       .then((response) => (response.ok ? response.json() : null))
  //       .then((response) => {
  //         if (response.message === "success") {
  //           setIsAddedToWishlist(true);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was a problem with the fetch operation:", error);
  //       });
  //   };
  //   const RemoveFromWishList = () => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/decor`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ _id: decor_id }),
  //     })
  //       .then((response) => (response.ok ? response.json() : null))
  //       .then((response) => {
  //         if (response.message === "success") {
  //           setIsAddedToWishlist(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was a problem with the fetch operation:", error);
  //       });
  //   };
  //   const AddToEvent = ({
  //     eventId,
  //     eventDayId,
  //     platform,
  //     flooring,
  //     dimensions,
  //     price,
  //     quantity,
  //     unit,
  //   }) => {
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}/decor/${eventDayId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: JSON.stringify({
  //           decor: decor_id,
  //           platform,
  //           flooring,
  //           dimensions,
  //           price,
  //           category: decor.category,
  //           variant,
  //           quantity,
  //           unit,
  //         }),
  //       }
  //     )
  //       .then((response) => (response.ok ? response.json() : null))
  //       .then((response) => {
  //         if (response.message === "success") {
  //           fetchEvents();
  //           alert("Item added to event!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was a problem with the fetch operation:", error);
  //       });
  //   };
  //   const RemoveFromEvent = ({ eventId, eventDayId }) => {
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/event/${eventId}/decor/${eventDayId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: JSON.stringify({
  //           decor: decor_id,
  //         }),
  //       }
  //     )
  //       .then((response) => (response.ok ? response.json() : null))
  //       .then((response) => {
  //         if (response.message === "success") {
  //           fetchEvents();
  //           alert("Item remove from event!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was a problem with the fetch operation:", error);
  //       });
  //   };
  return (
    <>
      <Head>
        <title>{decorPackage.name} | Wedsy</title>
        <meta name="description" content={decorPackage?.seoTags?.description} />
        <meta property="og:title" content={decorPackage.name} />
        <meta
          property="og:description"
          content={decorPackage?.seoTags?.description}
        />
        <meta property="og:image" content={decorPackage?.seoTags?.image} />
      </Head>
      <div className="p-6 md:py-16 md:px-24">
        <p className="font-semibold text-2xl md:text-4xl text-rose-900 mb-3">
          {decorPackage.name}
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-3">
          <DecorPackageCard
            decorPackage={decorPackage}
            className={"rounded-xl border-b-4 border-b-rose-900"}
          />
          <div className="hidden md:block col-span-2">
            <p className="font-semibold text-2xl md:text-3xl mb-2">
              Similar Packages
            </p>
            <div className="grid grid-cols-2 gap-4">
              <DecorPackageCard decorPackage={decorPackage} />
              <DecorPackageCard decorPackage={decorPackage} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-16 mb-3">
          {decorPackage.decor.map((item, index) => (
            <div className="" key={index}>
              <p className="font-semibold text-2xl md:text-2xl mb-2 text-rose-900">
                {item.category}: {item.name}
              </p>
              <div className="grid md:grid-cols-3 gap-2 md:gap-6">
                <div className="order-last md:order-first border-b pb-2 md:pb-0 md:border-b-0 border-black flex flex-col md:divide-y gap-2 md:divide-black md:pr-6">
                  <p className="text-xl font-medium hidden md:block">
                    Description
                  </p>
                  {item.category !== "Mandap" && (
                    <div className="flex flex-col px-4 md:px-0">
                      <p className="text-lg flex flex-row justify-between">
                        Can be used for
                      </p>
                      <ul className="list-disc pl-4 flex flex-col gap-1">
                        {item.productVariation.occassion.map((rec, index) => (
                          <li className="" key={index}>
                            {toProperCase(rec)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-col px-4 md:px-0 ">
                    <p className="text-lg flex flex-row justify-between">
                      Included
                    </p>
                    <ul className="list-disc pl-4 flex flex-col gap-1">
                      {item.productInfo.included.map((rec, index) => (
                        <li className="" key={index}>
                          {toProperCase(rec)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col px-4 md:px-0 ">
                    <p className="text-lg flex flex-row justify-between">
                      Sizes:
                    </p>
                    <ul className="list-disc pl-4 flex flex-col gap-1">
                      {item.productInfo.measurements.length > 0 && (
                        <li>
                          Length: {item.productInfo.measurements.length} ft.
                        </li>
                      )}
                      {item.productInfo.measurements.width > 0 && (
                        <li>
                          Width: {item.productInfo.measurements.width} ft.
                        </li>
                      )}
                      {item.productInfo.measurements.height > 0 && (
                        <li>
                          Height: {item.productInfo.measurements.height} ft.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="relative md:col-span-2 md:px-12">
                  <Image
                    src={item.image}
                    alt="Decor"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: "100%", height: "auto" }}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/3 mx-auto mt-6">
          <Table className="border mx-auto">
            <Table.Body className="divide-y">
              {decorPackage.decor?.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    [{item.category}] {item.name}
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
                  {/* {event.eventDays
                  ?.filter((item) => item._id === eventDay)[0]
                  ?.decorItems.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.price;
                  }, 0)} */}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      {/* <Modal
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
              className={`text-white bg-[#C84047]  border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
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
                <div className="flex flex-row items-center">
                  <p>Do you want to add a platform?</p>
                  <button
                    className={`${
                      addOns.platform
                        ? "text-white bg-[#C84047]"
                        : "bg-white text-[#C84047]"
                    }  border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
                    onClick={() => {
                      setAddOns({ ...addOns, platform: true });
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={`${
                      !addOns.platform && addOns.platform !== undefined
                        ? "text-white bg-[#C84047]"
                        : "bg-white text-[#C84047]"
                    } border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none`}
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
                      Dimensions for platform (in metres)
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
                          className={`mt-auto text-white bg-[#C84047] border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
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
                        className={`mt-auto text-white bg-[#C84047] border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
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
              <div className="flex flex-col gap-2">
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
                          ? "text-white bg-[#C84047]"
                          : "bg-white text-[#C84047]"
                      } hover:text-white border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
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
                          ? "text-white bg-[#C84047]"
                          : "bg-white text-[#C84047]"
                      } hover:text-white border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
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
                          ? "text-white bg-[#C84047]"
                          : "bg-white text-[#C84047]"
                      } hover:text-white border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
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
                      className={`text-white bg-[#C84047] border border-[#C84047] hover:bg-[#C84047] font-medium rounded-lg text-sm px-3 py-2.5 focus:outline-none`}
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
      </Modal> */}
      {/* <div className="md:p-8 grid grid-cols-1 md:grid-cols-4 md:gap-8 decor-bg-image">
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
          <div className="flex flex-col pt-4 md:border-b md:border-black px-4 md:px-0"></div>
        </div>
        <div className="md:col-span-3 py-3 px-4 md:px-0 md:py-6">
          <div className="md:px-10 relative">
            <div className="flex flex-row justify-between mb-6">
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
              className="rounded-xl"
            />
            <div className="flex flex-row flex-wrap gap-4 items-center mt-3">
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
                    className="text-white bg-rose-900 hover:bg-rose-900 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
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
                  as={Link}
                  href="/event"
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
            <p className="mt-3">{decor.description}</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { package_id } = context.params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor-package`
    );
    const similarDecorPackages = await response.json();
    const decorPackageResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor-package/${package_id}`
    );
    const decorPackage = await decorPackageResponse.json();
    if (!decorPackage || decorPackageResponse.status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/decor/packages",
        },
      };
    }
    return {
      props: {
        similarDecorPackages: similarDecorPackages.list,
        decorPackage,
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
