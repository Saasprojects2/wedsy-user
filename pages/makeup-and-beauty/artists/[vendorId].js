import FAQAccordion from "@/components/accordion/FAQAccordion";
import MobileStickyFooter from "@/components/layout/MobileStickyFooter";
import { loadGoogleMaps } from "@/utils/loadGoogleMaps";
import { toPriceString } from "@/utils/text";
import { Label, Modal, TextInput } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsShareFill } from "react-icons/bs";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart,
  FaRegStar,
  FaSearch,
  FaShareAlt,
  FaStar,
} from "react-icons/fa";
import { MdChevronRight, MdClear } from "react-icons/md";
import { RWebShare } from "react-web-share";

function MakeupAndBeauty({ userLoggedIn, setOpenLoginModalv2, setSource }) {
  const router = useRouter();
  const { vendorId } = router.query;
  const [loading, setLoading] = useState(false);
  const [personalPackages, setPersonalPackages] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [displayPersonalPackages, setDisplayPersonalPackages] = useState([
    0, 1, 2, 3,
  ]);
  const inputRef = useRef(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({ date: "", time: "" });
  const [googleAddressDetails, setGoogleAddressDetails] = useState({});
  const [taxationData, setTaxationData] = useState({});
  const [personalPackageTaxMultiply, setPersonalPackageTaxMultiply] =
    useState(1);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [galleryViewAll, setGalleryViewAll] = useState(false);
  const [viewBookingModal, setViewBookingModal] = useState(false);

  const extractAddressComponents = (components) => {
    const result = {
      city: "",
      postal_code: "",
      state: "",
      country: "",
      locality: "",
    };

    components.forEach((component) => {
      if (component.types.includes("locality")) {
        result.city = component.long_name; // Locality usually represents the city
      }
      if (
        component.types.includes("administrative_area_level_2") &&
        !result.city
      ) {
        result.city = component.long_name; // Fallback if locality isn't available
      }
      if (component.types.includes("postal_code")) {
        result.postal_code = component.long_name; // Extract postal code
      }
      if (component.types.includes("administrative_area_level_1")) {
        result.state = component.long_name; // Extract state
      }
      if (component.types.includes("country")) {
        result.country = component.long_name; // Extract country
      }
      if (
        component.types.includes("sublocality") ||
        component.types.includes("neighborhood")
      ) {
        result.locality = component.long_name; // More granular locality info
      }
    });

    return result;
  };

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        const google = await loadGoogleMaps(); // Load Google Maps API
        setIsLoaded(true);

        if (!google?.maps) {
          throw new Error("Google Maps library is not loaded properly.");
        }

        // Check if inputRef.current exists before initializing Autocomplete
        if (inputRef.current) {
          const autocomplete = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              types: ["geocode"], // Restrict results to addresses only
            }
          );

          // Listen for place selection
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              const { city, postal_code, state, country, locality } =
                extractAddressComponents(place.address_components);
              setGoogleAddressDetails((prevDetails) => ({
                ...prevDetails, // Retain existing fields like house_no and address_type
                city,
                postal_code,
                state,
                country,
                locality,
                place_id: place.place_id,
                formatted_address: place.formatted_address,
                geometry: {
                  location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                },
                address_components: place.address_components,
              }));
            }
          });
        } else {
          console.warn("Input reference is not available yet.");
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (viewBookingModal) {
      initializeAutocomplete();
    }
  }, [viewBookingModal]); // Add inputRef.current as a dependency

  const handleSubmit = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        source: "Personal-Package",
        vendor: vendorId,
        personalPackages: selectedPackages
          ?.filter((i) => i.quantity > 0)
          ?.map((i) => ({
            quantity: i.quantity,
            price: i.price,
            package: i._id,
          })),
        date: bookingInfo?.date,
        time: bookingInfo?.time,
        address: googleAddressDetails,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        if (response.message === "success") {
          alert("Request Sent Successfully!");
          setViewBookingModal(false);
          fetchPersonalPackages();
        } else {
          alert("Please try again later");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const AddToWishlist = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/vendor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ _id: vendorId }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          setIsAddedToWishlist(true);
          alert("Vendor added to wishlist!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const RemoveFromWishList = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/vendor`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ _id: vendorId }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((response) => {
        if (response.message === "success") {
          setIsAddedToWishlist(false);
          alert("Vendor removed from wishlist!");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
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
        setPersonalPackageTaxMultiply(
          (100 +
            response?.data?.personalPackage?.cgst +
            response?.data?.personalPackage?.sgst) /
            100
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const fetchPersonalPackages = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor-personal-package?vendorId=${vendorId}`,
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
        if (!document.body.classList.contains("relative")) {
          document.body.classList.add("relative");
        }
        Promise.all(
          response.map((i) => ({
            _id: i._id,
            quantity: 0,
            price: i.price,
          }))
        ).then((r) => {
          setSelectedPackages(r);
          setPersonalPackages(response);
          if (response.length < 4) {
            if (response.length === 1) {
              setDisplayPersonalPackages([0, 0, 0, 0]);
            }
            if (response.length === 2) {
              setDisplayPersonalPackages([0, 1, 0, 1]);
            }
            if (response.length === 3) {
              setDisplayPersonalPackages([0, 1, 2, 0]);
            }
          }
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const fetchVendor = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/${vendorId}?fetchSimilar=true`,
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
        if (response?._id) {
          setVendor(response);
        } else {
          router.push("/makeup-and-beauty/artists");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchPersonalPackages();
    fetchVendor();
    fetchTaxationData();
  }, []);
  useEffect(() => {
    if (vendorId && userLoggedIn) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/is-added-to-wishlist?product=vendor&_id=${vendorId}`,
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
  }, [vendorId, userLoggedIn]);
  return (
    <>
      <Head>
        <title>{vendor.name} | Wedsy</title>
        {/* <meta name="description" content={decor?.seoTags?.description} />
        <meta property="og:title" content={decor.name} />
        <meta property="og:description" content={decor?.seoTags?.description} /> */}
        <meta property="og:image" content={vendor?.gallery?.coverPhoto} />
      </Head>
      <MobileStickyFooter />
      {selectedPackages?.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0) > 0 && (
        <div className="bg-white fixed left-0 bottom-16 md:bottom-0 px-4 md:px-24 py-3 w-full z-50 flex flex-row items-center gap-4 items-center">
          <button
            className="py-2 px-6 rounded-md bg-black text-white shadow-md"
            onClick={() => {
              if (!userLoggedIn) {
                setSource(`Makeup Artist [${vendor.name}]`);
                setOpenLoginModalv2(true);
              } else {
                setViewBookingModal(true);
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
                }, 0) * personalPackageTaxMultiply
              )}
            </span>
          </div>
        </div>
      )}
      <Modal
        show={viewBookingModal}
        onClose={() => {
          setViewBookingModal(false);
        }}
        className="[&>div]:[&>div]:rounded-2xl"
      >
        <Modal.Body className="relative bg-[#D9D9D9] rounded-2xl p-6 flex flex-col gap-4">
          <MdClear
            className="absolute top-4 right-4"
            onClick={() => setViewBookingModal(false)}
            cursor={"pointer"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label value="DATE" />
              <TextInput
                type="date"
                value={bookingInfo.date}
                onChange={(e) => {
                  setBookingInfo({ ...bookingInfo, date: e.target.value });
                }}
              />
            </div>
            <div>
              <Label value="TIME" />
              <TextInput
                type="time"
                value={bookingInfo.time}
                onChange={(e) => {
                  setBookingInfo({ ...bookingInfo, time: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <Label value="LOCATION" />
            <TextInput
              ref={inputRef}
              type="text"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <Label value="PROCESS" />
            <ul className="text-sm list-decimal list-inside">
              <li>
                Fill in the required details and submit your request to the
                artist
              </li>
              <li>
                The artist will review their availability and confirm if they
                can accommodate your request.
              </li>
              <li>
                Once accepted, you’ll receive a confirmation in your inbox, and
                you can proceed with payment to secure the artist’s services.
              </li>
            </ul>
          </div>
          <button
            className="bg-black disabled:bg-black/50 text-white py-2 px-7 rounded-lg max-w-max m-auto mt-4 self-center"
            disabled={loading}
            onClick={() => {
              handleSubmit();
            }}
          >
            SEND REQUEST
          </button>
        </Modal.Body>
      </Modal>
      <div className="hidden md:block relative w-full mb-1">
        <div className="w-32 h-32 overflow-hidden absolute top-0 right-0 ">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 0 0 A 100 100 0 0 0 100 100 L 100 0 Z" fill="#840032" />
          </svg>
        </div>
        <div className="absolute left-0 bottom-0 translate-y-1/2 bg-white rounded-r-full py-2 h-12 px-12 divide-x-2 divide-black flex flex-row">
          <div
            className="flex flex-row items-center gap-3 px-8 cursor-pointer"
            onClick={() => {
              if (!userLoggedIn) {
                setSource(`Makeup Artist [${vendor.name}]`);
                setOpenLoginModalv2(true);
              } else {
                window.open(`tel:${vendor.phone}`, "_blank");
              }
            }}
          >
            <img src="/assets/icons/icon-message.png" className="h-6 w-6" />
            <span className="font-semibold">CHAT</span>
          </div>
          <div
            className="flex flex-row items-center gap-3 px-8 cursor-pointer"
            onClick={() => {
              router.push("#gallery");
            }}
          >
            <img src="/assets/icons/icon-image.png" className="h-6 w-6" />
            <span className="font-semibold">100 PHOTOS</span>
          </div>
          <div
            className="flex flex-row items-center gap-3 px-8 cursor-pointer"
            onClick={() => {
              router.push("#about");
            }}
          >
            <img src="/assets/icons/icon-info.png" className="h-6 w-6" />
            <span className="font-semibold">ABOUT</span>
          </div>
          <div
            className="flex flex-row items-center gap-3 px-8 cursor-pointer"
            onClick={() => {
              router.push("#reviews");
            }}
          >
            <img src="/assets/icons/icon-review.png" className="h-6 w-6" />
            <span className="font-semibold">REVIEWS</span>
          </div>
          <div
            className="flex flex-row items-center gap-3 px-8 cursor-pointer"
            onClick={() => {
              if (!userLoggedIn) {
                setSource(`Makeup Artist [${vendor.name}]`);
                setOpenLoginModalv2(true);
              } else {
                window.open(`tel:${vendor.phone}`, "_blank");
              }
            }}
          >
            <img src="/assets/icons/icon-call.png" className="h-6 w-6" />
            <span className="font-semibold">CONTACT</span>
          </div>
        </div>
        <div className="w-1/2 absolute top-0 left-1/2 h-full">
          <div className="flex flex-row justify-center relative max-w-max mx-auto h-full mx-24 items-center px-12">
            <div
              className="flex items-center gap-1 bg-white absolute top-[20%] right-0 px-4 pr-6 py-1"
              style={{
                clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
              }}
            >
              <FaRegStar size={14} className="text-[#840032] " />
              <span className="font-medium">4.5 RATED</span>
            </div>
            <div className="absolute bottom-[20%] right-0 bg-[#840032] text-white rounded-lg p-2 translate-y-1/2">
              <p>BRIDAL MAKEUP FROM</p>
              <p className="text-lg">{toPriceString(vendor?.prices?.bridal)}</p>
            </div>
            {vendor?.gallery?.coverPhoto && (
              <img
                src={vendor?.gallery?.coverPhoto}
                className="rounded-t-[6em] h-[80%] object-cover"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 px-24 bg-[#f4f4f4] py-6 ">
          <div className="relative">
            <div
              className="font-semibold text-5xl leading-loose tracking-wider text-[#840032] uppercase"
              style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}
            >
              {vendor?.name}
            </div>
            <div className="uppercase">Speciality In: {vendor?.speciality}</div>
            <div className="flex flex-col gap-8 items-center absolute right-0 bottom-0">
              {isAddedToWishlist ? (
                <FaHeart
                  size={24}
                  className="text-[#840032]"
                  onClick={() => {
                    if (userLoggedIn) {
                      RemoveFromWishList();
                    } else {
                      setSource(`Makeup Artist [${vendor.name}]`);
                      setOpenLoginModalv2(true);
                    }
                  }}
                />
              ) : (
                <FaRegHeart
                  size={24}
                  className="text-[#840032]"
                  onClick={() => {
                    if (userLoggedIn) {
                      AddToWishlist();
                    } else {
                      setSource(`Makeup Artist [${vendor.name}]`);
                      setOpenLoginModalv2(true);
                    }
                  }}
                />
              )}
              <RWebShare
                data={{
                  title: `Wedsy Makeup Artist - ${vendor?.name}`,
                  text: `Check out the Wedsy's Makeup Artist - ${vendor?.name}.`,
                  url: `https://wedsy.in/makeup-and-beauty/artists/${vendorId}`,
                }}
                onClick={() => console.log("Vendor shared successfully!")}
              >
                <BsShareFill
                  size={24}
                  className="text-[#840032]"
                  cursor={"pointer"}
                />
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 px-24 bg-black py-6 pb-16">
          <div>
            <div className="flex flex-row gap-4 items-start">
              <div className="bg-[#EF2471] text-white uppercase px-6 py-1">
                {vendor?.tag}
              </div>
              <div className="bg-white rounded-lg px-4 py-1 text-center">
                <span className="text-lg font-medium">
                  {vendor?.other?.experience} yr+
                </span>
                <span className="text-sm block">Experience</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-1 text-center">
                <span className="text-lg font-medium">
                  {vendor?.other?.clients}
                </span>
                <span className="text-sm block">Orders</span>
              </div>
            </div>
            <p className="text-white mt-6">{vendor?.businessDescription}</p>
          </div>
        </div>
      </div>
      <div className="md:hidden relative">
        <div className="font-semibold text-4xl bg-white rounded-b-2xl text-center leading-loose tracking-wider text-[#840032] uppercase">
          {vendor?.name}
        </div>
        <div className="absolute top-0 left-0 w-full font-semibold text-4xl bg-white rounded-b-2xl text-center leading-loose tracking-wider text-[#840032] uppercase z-20">
          {vendor?.name}
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 px-4 py-1 bg-[#EF2471] text-white uppercase">
            {vendor?.tag}
          </div>
          <div className="absolute top-8 right-8">
            {isAddedToWishlist ? (
              <FaHeart
                size={32}
                className="text-[#840032]"
                onClick={() => {
                  if (userLoggedIn) {
                    RemoveFromWishList();
                  } else {
                    setSource(`Makeup Artist [${vendor.name}]`);
                    setOpenLoginModalv2(true);
                  }
                }}
              />
            ) : (
              <FaRegHeart
                size={32}
                className="text-[#840032]"
                onClick={() => {
                  if (userLoggedIn) {
                    AddToWishlist();
                  } else {
                    setSource(`Makeup Artist [${vendor.name}]`);
                    setOpenLoginModalv2(true);
                  }
                }}
              />
            )}
          </div>
          <div className="bg-[#f4f4f4] absolute -bottom-12 left-0 rounded-t-2xl w-full py-6 flex flex-row gap-4 items-center justify-center">
            <div className="bg-white p-2 rounded-lg">
              <img
                src="/assets/icons/icon-image.png"
                className="h-6 w-6"
                onClick={() => {
                  router.push("#gallery");
                }}
              />
            </div>
            <div className="bg-white p-2 rounded-lg">
              <img
                src="/assets/icons/icon-review.png"
                className="h-6 w-6"
                onClick={() => {
                  router.push("#reviews");
                }}
              />
            </div>
            <div className="bg-white p-2 rounded-lg">
              <img
                src="/assets/icons/icon-info.png"
                className="h-6 w-6"
                onClick={() => {
                  router.push("#about");
                }}
              />
            </div>
          </div>
          <img src={vendor?.gallery?.coverPhoto} className="-mt-4" />
        </div>
        <div className="bg-[#f4f4f4] py-6 mt-10 px-6">
          <div className="uppercase font-medium text-center">
            Speciality In: {vendor?.speciality}
          </div>
          <div className="bg-[#840032] text-white rounded-lg p-2 mt-4 font-medium text-center">
            <p className="text-lg">BRIDAL MAKEUP FROM</p>
            <p className="font-semibold text-2xl">
              {toPriceString(vendor?.prices?.bridal)}
            </p>
          </div>
          <p className="text-lg mt-4">{vendor?.businessDescription}</p>
          <div className="py-2 gap-6 grid grid-cols-2 mt-6">
            <div
              className="flex flex-row items-center gap-3 justify-center bg-white rounded-lg p-2 py-3"
              onClick={() => {
                if (!userLoggedIn) {
                  setSource(`Makeup Artist [${vendor.name}]`);
                  setOpenLoginModalv2(true);
                } else {
                  window.open(`tel:${vendor.phone}`, "_blank");
                }
              }}
            >
              <img src="/assets/icons/icon-message-2.png" className="h-6 w-6" />
              <span className="font-semibold">CHAT NOW</span>
            </div>
            <div
              className="flex flex-row items-center gap-3 justify-center bg-white rounded-lg p-2 py-3"
              onClick={() => {
                if (!userLoggedIn) {
                  setSource(`Makeup Artist [${vendor.name}]`);
                  setOpenLoginModalv2(true);
                } else {
                  window.open(`tel:${vendor.phone}`, "_blank");
                }
              }}
            >
              <img src="/assets/icons/icon-call-2.png" className="h-6 w-6" />
              <span className="font-semibold">CALL NOW</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4] uppercase px-6 md:px-24 py-8 md:pt-16 text-xl md:text-3xl font-semibold mt-1 md:mt-0 md:mb-1 text-center">
        {"Makeup Artist’s Packages"}
      </div>
      <div className="bg-[#f4f4f4] py-12 pt-0 mb-1">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 w-24 hidden md:flex flex-col justify-center items-center">
            {displayPersonalPackages[0] > 0 && (
              <div
                className="rounded-full border border-black p-2 cursor-pointer"
                onClick={() => {
                  setDisplayPersonalPackages((prev) => {
                    let startIndex = prev[0] - 4;
                    if (startIndex < 0) {
                      startIndex = 0;
                    }
                    return [
                      startIndex,
                      startIndex + 1,
                      startIndex + 2,
                      startIndex + 3,
                    ];
                  });
                }}
              >
                <FaArrowLeft size={20} />
              </div>
            )}
          </div>
          <div className="absolute right-0 w-24 hidden md:flex flex-col justify-center items-center">
            {displayPersonalPackages[3] < personalPackages.length - 1 && (
              <div
                className="rounded-full border border-black p-2 cursor-pointer"
                onClick={() => {
                  setDisplayPersonalPackages((prev) => {
                    let endIndex = prev[3] + 4;
                    if (endIndex > personalPackages.length - 1)
                      endIndex = personalPackages.length - 1;
                    return [endIndex - 3, endIndex - 2, endIndex - 1, endIndex];
                  });
                }}
              >
                <FaArrowRight size={20} />
              </div>
            )}
          </div>
          {personalPackages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-1 px-6 md:px-24 w-full mb-8">
              {[
                personalPackages[displayPersonalPackages[0]],
                personalPackages[displayPersonalPackages[1]],
                personalPackages[displayPersonalPackages[2]],
                personalPackages[displayPersonalPackages[3]],
              ].map((pkg, index) => (
                <div
                  key={pkg?._id}
                  className={`flex flex-col bg-white rounded-2xl md:rounded-none ${
                    index % 2 == 0 ? "md:bg-gray-200" : "md:bg-gray-300"
                  } shadow-md`}
                >
                  <div className="text-center py-2 font-semibold md:border-b">
                    {pkg?.name}
                  </div>
                  <div className="px-6 md:text-center py-4 md:py-8">
                    <h4 className="mb-1 md:mb-3">Services</h4>
                    <p className="hidden md:block text-gray-700 font-semibold">
                      {pkg?.services?.join(", ")}
                    </p>
                    <ul className="md:hidden">
                      {pkg?.services?.map((i, i1) => (
                        <li key={i1} className="font-medium">
                          &bull; {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`flex items-center justify-between border-t py-2 px-4 ${
                      index % 2 == 0 ? "bg-gray-200" : "bg-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-1 divide-x-1 rounded-lg bg-white">
                      {selectedPackages?.find((i) => i._id === pkg._id)
                        ?.quantity > 0 && (
                        <button
                          className="p-2 text-gray-800 font-semibold"
                          onClick={() => {
                            setSelectedPackages(
                              selectedPackages.map((i) =>
                                i._id === pkg._id
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
                        {selectedPackages?.find((i) => i._id === pkg._id)
                          ?.quantity >
                        0 >
                        0
                          ? selectedPackages?.find((i) => i._id === pkg._id)
                              ?.quantity
                          : "Add"}
                      </span>
                      <button
                        className="p-2 text-gray-800 font-semibold"
                        onClick={() => {
                          setSelectedPackages(
                            selectedPackages.map((i) =>
                              i._id === pkg._id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                            )
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-[#880E4F] font-semibold">
                      <span className="text-black font-normal text-sm mr-4">
                        Per Person
                      </span>
                      <span>₹{pkg?.price * personalPackageTaxMultiply}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden bg-[#f4f4f4] py-4 mb-1">
        <Modal show={galleryViewAll} onClose={() => setGalleryViewAll(false)}>
          <Modal.Body>
            <p className="text-2xl font-semibold  mb-2">
              GALLERY
              <MdClear
                className="float-right"
                onClick={() => setGalleryViewAll(!galleryViewAll)}
                cursor={"pointer"}
              />
            </p>
            <div className="grid grid-cols-2 gap-1">
              {vendor?.gallery?.photos?.map((item, index) => (
                <div className="pt-[100%] relative" key={index}>
                  <img
                    src={item}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="bg-[#D9D9D9] flex justify-center items-center">
                <button
                  className="underline"
                  onClick={() => setGalleryViewAll(!galleryViewAll)}
                >
                  view less
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <p className="text-2xl font-semibold text-center">GALLERY</p>
        <div className="p-6 grid grid-cols-2 gap-1">
          {vendor?.gallery?.photos?.slice(0, 5)?.map((item, index) => (
            <div className="pt-[100%] relative" key={index}>
              <img
                src={item}
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
            </div>
          ))}
          {vendor?.gallery?.photos?.length > 5 && (
            <div className="bg-[#D9D9D9] flex justify-center items-center">
              <button
                className="underline"
                onClick={() => setGalleryViewAll(!galleryViewAll)}
              >
                view all
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block bg-[#f4f4f4] px-24 py-12" id={"gallery"}>
        <div className="grid grid-cols-2 bg-white font-semibold text-center text-xl uppercase">
          <div className="text-[#840032] border-b-4 py-2 border-b-[#840032]">
            PHOTOS
          </div>
          <div className="border-b-4 border-white py-2">ALBUM</div>
        </div>
        <div className="shadow-xl p-12 grid grid-cols-5 gap-1">
          {(galleryViewAll
            ? vendor?.gallery?.photos
            : vendor?.gallery?.photos?.slice(0, 10)
          )?.map((item, index) => (
            <div className="pt-[100%] relative" key={index}>
              <img
                src={item}
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
            </div>
          ))}
          {vendor?.gallery?.photos?.length > 10 && (
            <div className="col-span-5 flex justify-center items-center mt-4">
              <button
                className="bg-[#840032] text-white rounded-lg px-12 py-1"
                onClick={() => setGalleryViewAll(!galleryViewAll)}
              >
                VIEW {galleryViewAll ? "LESS" : "ALL"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden bg-[#f4f4f4] px-6 py-6" id="about">
        <div className="font-semibold text-2xl uppercase mb-4 text-center">
          About {vendor?.businessName}
        </div>
        <div className="font-semibild rounded-2xl bg-white p-6 font-medium">
          {vendor?.businessDescription}
        </div>
      </div>
      <div className="hidden md:block bg-[#f4f4f4] px-24 py-12">
        <div className="bg-white font-semibold text-xl uppercase py-2 px-6">
          About {vendor?.businessName}
        </div>
        <div className="shadow-xl p-6 font-medium">
          {vendor?.businessDescription}
        </div>
      </div>
      <div className="bg-[#f4f4f4] px-6 md:px-24 py-6 md:py-12">
        <p className="font-semibold text-2xl text-[#840032] text-center md:text-left">
          Browse similar Makeup Artists
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {vendor?.similarVendors?.map((item, index) => (
            <div
              className="bg-white p-2 md:p-4 rounded-lg flex flex-col gap-2 md:gap-4"
              key={index}
              onClick={() => {
                router.push(`/makeup-and-beauty/artists/${item?._id}`);
              }}
            >
              <div className="bg-gray-500 pt-[100%] w-full relative">
                <img
                  src={item?.gallery?.coverPhoto}
                  className="absolute top-0 w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                  {item?.name}
                </h3>
                <div className="hidden md:flex flex-row items-end gap-2 justify-between">
                  <div className="flex items-center gap-1 text-[#880E4F]">
                    <FaStar size={14} />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FaMapMarkerAlt size={14} />
                    <span>RT Nagar, Bangalore</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm">Specialist in</p>
                  <p className="text-xs md:text-sm">- {item?.speciality}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-end md:gap-1 items-end">
                  <div className="text-[#880E4F] font-bold text-lg">
                    {toPriceString(item?.prices?.bridal || 0)}
                  </div>
                  <div className="text-xs text-gray-400">Onwards</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MakeupAndBeauty;
