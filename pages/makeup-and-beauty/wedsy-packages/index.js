import FAQAccordion from "@/components/accordion/FAQAccordion";
import MobileStickyFooter from "@/components/layout/MobileStickyFooter";
import { toPriceString } from "@/utils/text";
import { Modal } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { MdChevronRight, MdClear } from "react-icons/md";

function MakeupAndBeauty({ userLoggedIn, setOpenLoginModalv2, setSource }) {
  const router = useRouter();
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const [search, setSearch] = useState("");
  const [wedsyPackages, setWedsyPackages] = useState([]);
  const [display, setDisplay] = useState("");
  const [wedsyPackageCategory, setWedsyPackageCategory] = useState([]);
  const [selectedWedsyPackageCategory, setSelectedWedsyPackageCategory] =
    useState("");
  const [taxationData, setTaxationData] = useState({});
  const [wedsyPackageTaxMultiply, setWedsyPackageTaxMultiply] = useState(1);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const fetchTaxationData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/config?code=MUA-Taxation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTaxationData(response.data);
        setWedsyPackageTaxMultiply(
          (100 +
            response?.data?.wedsyPackage?.cgst +
            response?.data?.wedsyPackage?.sgst) /
            100
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const fetchWedsyPackages = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wedsy-package`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (!document.body.classList.contains("relative")) {
          document.body.classList.add("relative");
        }
        const uniqueCategories = [
          ...new Set(response.map((item) => item.category)),
        ];
        setWedsyPackageCategory(uniqueCategories);
        Promise.all(
          response.map((i) => ({
            _id: i._id,
            quantity: 0,
            price: i.price,
          }))
        ).then((r) => {
          setSelectedPackages(r);
          setWedsyPackages(response);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchWedsyPackages();
    fetchTaxationData();
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
  return (
    <>
      <MobileStickyFooter />
      {selectedPackages?.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0) > 0 && (
        <div className="bg-white fixed left-0 bottom-16 md:bottom-0 px-4 md:px-24 py-3 w-full z-50 flex flex-row items-center gap-4 items-center">
          <button
            className="py-2 px-6 rounded-md bg-black text-white shadow-md"
            onClick={() => {
              localStorage.setItem(
                "wedsy-package-cart",
                JSON.stringify(selectedPackages)
              );
              if (!userLoggedIn) {
                setSource("Makeup & Beauty Packages");
                setOpenLoginModalv2(true);
              } else {
                router.push("/makeup-and-beauty/wedsy-packages/checkout");
              }
            }}
          >
            <span className="hidden md:block">{"CHOOSE DATE & TIME"}</span>
            <span className="md:hidden">View Cart</span>
          </button>
          <div className="hidden md:flex bg-[#840032] text-white rounded-full h-10 w-10 font-medium flex items-center justify-center">
            {selectedPackages?.reduce((accumulator, item) => {
              return accumulator + item.quantity;
            }, 0)}
          </div>
          <div className="ml-auto font-semibold text-black text-base md:text-lg">
            TOTAL:{" "}
            <span className="ml-4 text-[#840032] text-xl md:text-2xl">
              {toPriceString(
                selectedPackages?.reduce((accumulator, item) => {
                  return accumulator + item.quantity * item.price;
                }, 0) * wedsyPackageTaxMultiply
              )}
            </span>
          </div>
        </div>
      )}
      <div className="bg-[#f4f4f4] uppercase px-6 text-center md:hidden py-6 text-xl font-semibold mb-1">
        Makeup Packages
      </div>
      <div className="hidden md:grid grid-cols-2 bg-[#f4f4f4] px-24 py-6 mb-1">
        <div className="uppercase text-4xl font-medium">Packages</div>
        <div className="flex flex-row justify-around items-center gap-6 px-6">
          <select
            value={selectedWedsyPackageCategory}
            onChange={(e) => {
              setSelectedWedsyPackageCategory(e.target.value);
            }}
            className="grow outline-none border-0 px-6 rounded-full"
          >
            <option value={""}>Select Package Category</option>
            {wedsyPackageCategory?.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1">
            <span className="text-black">&#x1F4CD;</span>
            <h2 className="text-xl font-semibold text-[#880E4F]">
              Bangalore, IN
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] py-4 px-6 grid grid-cols-2 gap-4 md:hidden">
        <img
          src="/assets/images/makeup-landing-page-4.png"
          className="w-full"
        />
        <img
          src="/assets/images/makeup-landing-page-5.png"
          className="w-full"
        />
        <img
          src="/assets/images/makeup-landing-page-6.png"
          className="w-full"
        />
        <img
          src="/assets/images/makeup-landing-page-7.png"
          className="w-full"
        />
      </div>
      <div className="md:hidden">
        <Modal
          show={display ? true : false}
          onClose={() => setDisplay("")}
          className="relative"
        >
          <MdClear
            className="absolute top-6 right-6 h-6 w-6"
            onClick={() => setDisplay("")}
          />
          <Modal.Body className="bg-[#F4F4F4]">
            {display &&
              wedsyPackages
                ?.filter((i, _) => i._id === display)
                ?.map((item, index) => (
                  <>
                    <p className="font-medium text-xl">MAKEUP & HAIR PROCESS</p>
                    <ul className="flex flex-col gap-2">
                      {item.process?.map((rec, recIndex) => (
                        <li className="" key={recIndex}>
                          <p className="text-[#2B3F6C] font-medium">
                            {rec.topic}
                          </p>
                          <p>{rec.description}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="font-medium text-xl my-4">OVERVIEW</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 flex flex-col gap-2 items-center">
                        <div className="aspect-w-1 aspect-h-1">
                          <img
                            src="/assets/icons/icon-cosmetics.png"
                            alt="Image"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="uppercase font-medium text-sm text-center">
                          PREMIUM MERCHANDISE
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex flex-col gap-2 items-center">
                        <div className="aspect-w-1 aspect-h-1">
                          <img
                            src="/assets/icons/icon-clean.png"
                            alt="Image"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="uppercase font-medium text-sm text-center">
                          NO MESS CREATED
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex flex-col gap-2 items-center">
                        <div className="aspect-w-1 aspect-h-1">
                          <img
                            src="/assets/icons/icon-investment.png"
                            alt="Image"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="uppercase font-medium text-sm text-center">
                          VALUE FOR MONEY
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 flex flex-col gap-2 items-center">
                        <div className="aspect-w-1 aspect-h-1">
                          <img
                            src="/assets/icons/icon-user-2.png"
                            alt="Image"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="uppercase font-medium text-sm text-center">
                          CERTIFIED EXPERTS
                        </div>
                      </div>
                    </div>
                  </>
                ))}
          </Modal.Body>
        </Modal>
      </div>
      <div className="flex flex-col gap-1 md:hidden">
        {wedsyPackageCategory
          ?.filter((i) =>
            selectedWedsyPackageCategory
              ? i === selectedWedsyPackageCategory
              : true
          )
          ?.map((i, iIndex) => (
            <div className="bg-white rounded-lg bg-[#f4f4f4] p-8" key={iIndex}>
              <p className="text-center text-[#2B3F6C] uppercase text-2xl font-medium">
                {i}
              </p>
              <div className="flex flex-col gap-4 divide-y-2 divide-y-gray-500">
                {wedsyPackages
                  ?.filter((j) => j.category === i)
                  ?.map((item, index) => (
                    <div key={index} className={`pt-4`}>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-full flex flex-col ">
                          <p className="font-medium text-xl">{item.name}</p>
                          <div className="flex items-center gap-1">
                            <FaStar size={14} className="text-[#fff170]" />
                            <span className="text-sm font-medium">
                              2.1k reviews
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            &bull; {item.time}
                          </div>
                          <div className="text-[#880E4F] font-semibold text-right mt-auto border-b">
                            <span className="text-2xl font-bold">
                              ₹{item?.price * wedsyPackageTaxMultiply}
                            </span>
                            <span className="text-black font-normal text-base mr-4">
                              {" "}
                              Per Person
                            </span>
                          </div>
                        </div>
                        <img src={item.image} />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <p className="">{item.details}</p>
                          {display !== item._id && (
                            <div
                              className="text-[#880E4F] underline font-semibold text-lg cursor-pointer"
                              onClick={() => {
                                setDisplay(item?._id);
                              }}
                            >
                              View details
                            </div>
                          )}
                        </div>
                        <div className="text-[#880E4F] flex flex-row p-2 justify-center">
                          <div className="flex items-center gap-1 rounded-lg bg-white border-[#880E4F] border divide-x-1 divide-[#880E4F]">
                            {selectedPackages?.find((i) => i._id === item._id)
                              ?.quantity > 0 && (
                              <button
                                className="p-2 font-semibold"
                                onClick={() => {
                                  setSelectedPackages(
                                    selectedPackages.map((i) =>
                                      i._id === item._id
                                        ? { ...i, quantity: i.quantity - 1 }
                                        : i
                                    )
                                  );
                                }}
                              >
                                -
                              </button>
                            )}
                            <span className="p-2">
                              {selectedPackages?.find((i) => i._id === item._id)
                                ?.quantity >
                              0 >
                              0
                                ? selectedPackages?.find(
                                    (i) => i._id === item._id
                                  )?.quantity
                                : "Add"}
                            </span>
                            <button
                              className="p-2 font-semibold"
                              onClick={() => {
                                setSelectedPackages(
                                  selectedPackages.map((i) =>
                                    i._id === item._id
                                      ? { ...i, quantity: i.quantity + 1 }
                                      : i
                                  )
                                );
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
      <div
        className="hidden md:grid grid-cols-2 gap-1 relative overflow-hidden hide-scrollbar"
        ref={divRef}
        style={{ height: divSize.height ?? "100vh" }}
      >
        <div className="bg-[#f4f4f4] hide-scrollbar overflow-y-auto p-12 flex flex-col gap-12">
          {wedsyPackageCategory
            ?.filter((i) =>
              selectedWedsyPackageCategory
                ? i === selectedWedsyPackageCategory
                : true
            )
            ?.map((i, iIndex) => (
              <div className="bg-white rounded-lg p-8" key={iIndex}>
                <p className="text-center text-[#2B3F6C] uppercase text-2xl font-medium">
                  {i}
                </p>
                <div className="flex flex-col gap-4 divide-y-2 divide-y-gray-500">
                  {wedsyPackages
                    ?.filter((j) => j.category === i)
                    ?.map((item, index) => (
                      <div key={index} className={`pt-4`}>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 h-full flex flex-col ">
                            <p className="font-medium text-xl">{item.name}</p>
                            <div className="flex items-center gap-1">
                              <FaStar size={14} className="text-[#fff170]" />
                              <span className="text-sm font-medium">
                                2.1k reviews
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              &bull; {item.time}
                            </div>
                            <div className="text-[#880E4F] font-semibold text-right mt-auto border-b">
                              <span className="text-2xl font-bold">
                                ₹{item?.price * wedsyPackageTaxMultiply}
                              </span>
                              <span className="text-black font-normal text-base mr-4">
                                {" "}
                                Per Person
                              </span>
                            </div>
                          </div>
                          <img src={item.image} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <p className="">{item.details}</p>
                            {display !== item._id && (
                              <div
                                className="text-[#880E4F] underline font-semibold text-lg cursor-pointer"
                                onClick={() => {
                                  setDisplay(item?._id);
                                }}
                              >
                                View details
                              </div>
                            )}
                          </div>
                          <div className="text-[#880E4F] flex flex-row p-2 justify-center">
                            <div className="flex items-center gap-1 rounded-lg bg-white border-[#880E4F] border divide-x-1 divide-[#880E4F]">
                              {selectedPackages?.find((i) => i._id === item._id)
                                ?.quantity > 0 && (
                                <button
                                  className="p-2 font-semibold"
                                  onClick={() => {
                                    setSelectedPackages(
                                      selectedPackages.map((i) =>
                                        i._id === item._id
                                          ? { ...i, quantity: i.quantity - 1 }
                                          : i
                                      )
                                    );
                                  }}
                                >
                                  -
                                </button>
                              )}
                              <span className="p-2">
                                {selectedPackages?.find(
                                  (i) => i._id === item._id
                                )?.quantity >
                                0 >
                                0
                                  ? selectedPackages?.find(
                                      (i) => i._id === item._id
                                    )?.quantity
                                  : "Add"}
                              </span>
                              <button
                                className="p-2 font-semibold"
                                onClick={() => {
                                  setSelectedPackages(
                                    selectedPackages.map((i) =>
                                      i._id === item._id
                                        ? { ...i, quantity: i.quantity + 1 }
                                        : i
                                    )
                                  );
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <div className="bg-[#f4f4f4] hide-scrollbar overflow-y-auto p-12 flex flex-col gap-4">
          {display &&
            wedsyPackages
              ?.filter((i, _) => i._id === display)
              ?.map((item, index) => (
                <>
                  <p className="font-medium text-2xl">MAKEUP & HAIR PROCESS</p>
                  <ul className="p-6 flex flex-col gap-2">
                    {item.process?.map((rec, recIndex) => (
                      <li className="" key={recIndex}>
                        <p className="text-[#2B3F6C] font-medium">
                          {rec.topic}
                        </p>
                        <p>{rec.description}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="w-full h-1 bg-[#C8C8C8]" />
                  <p className="font-medium text-2xl">OVERVIEW</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-2 items-center">
                      <div className="uppercase font-medium text-lg col-span-2">
                        PREMIUM MERCHANDISE
                      </div>
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src="/assets/icons/icon-cosmetics.png"
                          alt="Image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-2 items-center">
                      <div className="uppercase font-medium text-lg col-span-2">
                        NO MESS CREATED
                      </div>
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src="/assets/icons/icon-clean.png"
                          alt="Image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-2 items-center">
                      <div className="uppercase font-medium text-lg col-span-2">
                        VALUE FOR MONEY
                      </div>
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src="/assets/icons/icon-investment.png"
                          alt="Image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-2 items-center">
                      <div className="uppercase font-medium text-lg col-span-2">
                        CERTIFIED EXPERTS
                      </div>
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src="/assets/icons/icon-user-2.png"
                          alt="Image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-[#C8C8C8]" />
                  <p className="font-medium text-2xl">REVIEWS</p>
                  <div className="w-full h-1 bg-[#C8C8C8]" />
                  <p className="font-medium text-2xl">ALL REVIEWS</p>
                </>
              ))}
        </div>
      </div>
    </>
  );
}

export default MakeupAndBeauty;
