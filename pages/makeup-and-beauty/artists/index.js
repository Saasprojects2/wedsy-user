import FAQAccordion from "@/components/accordion/FAQAccordion";
import MobileStickyFooter from "@/components/layout/MobileStickyFooter";
import { toPriceString } from "@/utils/text";
import { Select } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";

function MakeupAndBeauty({ userLoggedIn, setOpenLoginModalv2, setSource }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [taxationData, setTaxationData] = useState({});
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
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const fetchVendors = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setVendors(response);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchVendors();
    fetchTaxationData();
  }, []);
  return (
    <>
      <MobileStickyFooter />
      <div className="w-full relative hidden md:block pt-[16.2%]">
        <img
          className="absolute top-0 left-0 w-full object-cover"
          src="/assets/images/makeup-artists-1.png"
        />
        <div className="absolute top-0 left-0 w-1/2 px-8 py-4 h-full flex flex-col justify-around">
          <p className="uppercase text-[#802338] text-2xl">
            <span className="font-semibold">
              <span className="text-3xl">B</span>id
            </span>
            , <span className="font-semibold">book</span>, and{" "}
            <span className="font-semibold">beautify</span> with unbeatable
            makeup artist prices
          </p>
          <button
            className="rounded-lg bg-black md:bg-[#840032] text-white py-2 px-12 max-w-max"
            onClick={() => {
              router.push("/makeup-and-beauty/artists");
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="bg-[#f4f4f4] py-12 md:pt-16 grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-24">
        <div className="hidden md:block">
          <p className="text-[#840032] font-semibold text-3xl font-medium">
            MAKEUP ARTISTS
          </p>
          <p className="font-medium text-lg">In Banglore</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className=" relative w-full">
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-gray-500"
              aria-label="Search"
            >
              <FaSearch size={16} />
            </button>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search for makeup artist..."
              className="w-full py-2 px-4 text-gray-700 rounded-md md:border border-gray-300 focus:ring-2 focus:ring-[#880E4F] focus:outline-none pl-12"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <Select color={"light"} className="max-w-max ml-auto">
            <option>Sort</option>
          </Select>
        </div>
      </div>
      <div className="bg-[#f4f4f4] pb-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-16 px-6 md:px-24">
        {vendors
          ?.filter((i) =>
            search ? i.name.toLowerCase().includes(search.toLowerCase()) : true
          )
          .slice(page * 12, (page + 1) * 12)
          ?.map((item, index) => (
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
        {page < Math.ceil(vendors.length / 12) && (
          <div className="col-span-2 flex md:hidden flex-row gap-3 items-center justify-center my-4">
            <button
              className="bg-white rounded-full px-6 py-2"
              onClick={() => setPage(page + 1)}
            >
              Next Page &#8594;
            </button>
          </div>
        )}
        <div className="col-span-2 md:col-span-4 flex flex-row gap-3 items-center justify-center">
          {new Array(Math.ceil(vendors.length / 12))
            .fill("-")
            ?.map((_, index) => (
              <div
                key={index}
                className={`flex justify-center items-center h-8 w-8 cursor-pointer rounded-full font-medium ${
                  index !== page
                    ? "text-[#840032] bg-white"
                    : "bg-[#840032] text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default MakeupAndBeauty;
