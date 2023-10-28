import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Checkbox, Dropdown, Label, TextInput, Spinner } from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";
import { useState, useEffect, useRef } from "react";
import RangeSlider from "@/components/slider/RangeSlider";
import SearchBar from "@/components/searchBar/SearchBar";
import { useRouter } from "next/router";

function DecorListing({ data }) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    open: { occasion: true, colours: true, priceRange: true },
    priceRange: [3000, 115000],
    colours: [],
    occasion: [],
    occasionList: [
      "Reception",
      "Engagement",
      "Sangeet",
      "Wedding",
      "Haldi",
      "Mehendi",
      "Muhurtham",
    ],
    priceRangeLimit: [0, 200000],
    coloursList: ["red"],
  });
  const [list, setList] = useState(data || []);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const fetchList = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log(router.query.category, router.query);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/decor?page=${page}${
          router.query.category ? `&category=${router.query.category}` : ""
        }${
          filters.occasion.length > 0
            ? `&occassion=${filters.occasion.join("|")}`
            : ""
        }${
          filters.colours.length > 0
            ? `&color=${filters.colours.join("|")}`
            : ""
        }`
      );
      const tempData = await response.json();
      setList([...list, ...tempData]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setPage(1);
    setList([]);
  }, [filters.colours, filters.occasion, filters.priceRange, router.query]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchList();
      }
    }, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [page]);

  return (
    <>
      <div className="md:p-8 grid md:grid-cols-4 gap-8 relative">
        <div className="border-r border-black hidden md:flex flex-col divide-y gap-4 divide-black pr-6">
          <p className="text-xl font-medium">Filter by</p>
          <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Occasion{" "}
              {filters.open.occasion ? (
                <AiOutlineMinus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, occasion: false },
                    })
                  }
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlinePlus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, occasion: true },
                    })
                  }
                  className="cursor-pointer"
                />
              )}
            </p>
            {filters.open.occasion &&
              filters.occasionList.map((item, index) => (
                <div className="flex items-center gap-2 mt-2" key={index}>
                  <Checkbox
                    id={`ocassion-${item}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!filters.occasion.includes(item)) {
                          setFilters({
                            ...filters,
                            occasion: [...filters.occasion, item],
                          });
                        }
                      } else {
                        setFilters({
                          ...filters,
                          occasion: filters.occasion.filter((i) => i !== item),
                        });
                      }
                    }}
                    checked={filters.occasion.includes(item)}
                  />
                  <Label className="flex" htmlFor={`ocassion-${item}`}>
                    {item}
                  </Label>
                </div>
              ))}
          </div>
          <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Colours{" "}
              {filters.open.colours ? (
                <AiOutlineMinus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, colours: false },
                    })
                  }
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlinePlus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, colours: true },
                    })
                  }
                  className="cursor-pointer"
                />
              )}
            </p>
          </div>
          <div className="flex flex-col pt-4 border-b border-black">
            <p className="text-lg flex flex-row justify-between">
              Price Range{" "}
              {filters.open.priceRange ? (
                <AiOutlineMinus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, priceRange: false },
                    })
                  }
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlinePlus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, priceRange: true },
                    })
                  }
                  className="cursor-pointer"
                />
              )}
            </p>
            {filters.open.priceRange && (
              <div>
                <RangeSlider
                  range={filters.priceRange}
                  setRange={(range) => {
                    setFilters({
                      ...filters,
                      priceRange: range,
                    });
                  }}
                  factor={2000}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 md:py-6">
          <div className="h-16 w-full bg-white top-0 fixed z-20"></div>
          <div className="border-y border-black bg-white grid grid-cols-2 md:hidden divide-x-2 divide-black  sticky top-16 w-full z-20">
            <span className="text-center py-2">Filter</span>
            <span className="w-full flex flex-row justify-center">
              <Dropdown inline label="Sort" className="">
                <Dropdown.Item>Price: Low to High</Dropdown.Item>
                <Dropdown.Item>Price: High to Low</Dropdown.Item>
              </Dropdown>
            </span>
          </div>
          <div className="flex flex-row justify-between px-6 py-6 md:py-0 md:px-10 md:mb-8 items-center">
            <div className="w-full md:w-1/2">
              <SearchBar />
            </div>
            <div className="hidden md:inline">
              <Dropdown inline label="Sort" className="max-w-max">
                <Dropdown.Item>Price: Low to High</Dropdown.Item>
                <Dropdown.Item>Price: High to Low</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:gap-12 md:px-10">
            {list.map((item, index) => (
              <DecorCard key={index} decor={item} />
            ))}
          </div>
          <div ref={containerRef}></div>
          {loading && (
            <div className="w-full text-center mt-8">
              <Spinner size={"xl"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let { query } = context;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/decor${
        query.category ? `?category=${query.category}` : ""
      }`
    );
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        data: [],
      },
    };
  }
}

export default DecorListing;
