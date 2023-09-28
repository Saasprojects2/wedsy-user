import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LiaSearchSolid } from "react-icons/lia";
import { Checkbox, Dropdown, Label, TextInput, Spinner } from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";
import { useState, useEffect, useRef } from "react";
import RangeSlider from "@/components/slider/RangeSlider";
import SearchBar from "@/components/searchBar/SearchBar";

export default function DecorListing() {
  const [filters, setFilters] = useState({
    open: { occasion: true, colours: true, priceRange: true },
    priceRange: [3000, 115000],
    colours: [],
    occasion: [],
    occasionList: [
      "Reception",
      "Engagement",
      "Wedding",
      "Muhurtham",
      "Haldi",
      "Mehendi",
      "Sangeet",
      "Anniversaries",
    ],
    priceRangeLimit: [0, 200000],
    coloursList: ["red"],
  });
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const fetchList = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/decor?page=${page}`
      );
      const data = await response.json();
      setList([...list, ...data]);
      console.log("Fetched Page >> " + page);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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
      <div className="p-8 grid grid-cols-4 gap-8">
        <div className="border-r border-black flex flex-col divide-y gap-4 divide-black pr-6">
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
        <div className="col-span-3 py-6">
          <div className="flex flex-row justify-between px-10 mb-8 items-center">
            <div className="w-1/2">
              <SearchBar />
            </div>
            <div>
              <Dropdown inline label="Sort" className="max-w-max">
                <Dropdown.Item>Price: Low to High</Dropdown.Item>
                <Dropdown.Item>Price: High to Low</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 px-10">
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
