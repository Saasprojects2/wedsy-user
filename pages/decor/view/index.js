import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  Checkbox,
  Dropdown,
  Label,
  TextInput,
  Spinner,
  Radio,
} from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";
import { useState, useEffect, useRef } from "react";
import RangeSlider from "@/components/slider/RangeSlider";
import SearchBar from "@/components/searchBar/SearchBar";
import { useRouter } from "next/router";

function DecorListing({ data }) {
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const [filters, setFilters] = useState({
    open: {
      occasion: true,
      colours: true,
      priceRange: true,
      style: true,
      stageSize: true,
    },
    style: [],
    styleList: ["Modern", "Traditional", "Both"],
    priceRange: [0, 115000],
    stageSizeRange: [0, 1500],
    applyPriceFilter: false,
    applySizeFilter: false,
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
    stageSizeLimit: [0, 2000],
    coloursList: {
      Black: "#000000",
      Silver: "#C0C0C0",
      Gray: "#808080",
      White: "#FFFFFF",
      Maroon: "#800000",
      Red: "#FF0000",
      Purple: "#800080",
      Green: "#008000",
      Lime: "#00FF00",
      Olive: "#808000",
      Yellow: "#FFFF00",
      Navy: "#000080",
      Blue: "#0000FF",
      Peach: "#FFE5B4",
      Gold: "#FFD700",
    },
    search: "",
    sort: "",
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
        }${filters.style.length > 0 ? `&style=${filters.style[0]}` : ""}${
          filters.search.length > 0 ? `&search=${filters.search}` : ""
        }${filters.sort.length > 0 ? `&sort=${filters.sort}` : ""}${
          filters.applyPriceFilter && filters.priceRange
            ? `&priceLower=${filters.priceRange[0]}&priceHigher=${filters.priceRange[1]}`
            : ""
        }${
          filters.applySizeFilter && filters.stageSizeRange
            ? `&stageSizeLower=${filters.stageSizeRange[0]}&stageSizeHigher=${filters.stageSizeRange[1]}`
            : ""
        }`
      );
      const tempData = await response.json();
      setList([...list, ...tempData.list]);
      if (tempData.totalPages === 0) {
        setPage(0);
      } else {
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setPage(1);
    setList([]);
  }, [
    filters.colours,
    filters.occasion,
    filters.priceRange,
    filters.style,
    router.query,
    filters.search,
    filters.stageSizeRange,
    filters.sort,
    filters.applyPriceFilter,
    filters.applySizeFilter,
  ]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page !== 0) {
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
      <div
        className="md:p-8 grid md:grid-cols-4 gap-8 relative overflow-hidden hide-scrollbar decor-bg-image"
        ref={divRef}
        style={{ height: divSize.height ?? "100vh" }}
      >
        <div className="hide-scrollbar border-r border-black hidden md:flex flex-col divide-y gap-4 divide-black pr-6 overflow-y-auto">
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
            {filters.open.colours &&
              Object.keys(filters.coloursList).map((item, index) => (
                <div className="flex items-center gap-2 mt-2" key={index}>
                  <Checkbox
                    id={`colour-${item}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!filters.colours.includes(item)) {
                          setFilters({
                            ...filters,
                            colours: [...filters.colours, item],
                          });
                        }
                      } else {
                        setFilters({
                          ...filters,
                          colours: filters.colours.filter((i) => i !== item),
                        });
                      }
                    }}
                    checked={filters.colours.includes(item)}
                  />
                  <div
                    className={`h-4 w-4 rounded-full `}
                    style={{
                      background: filters.coloursList[item],
                    }}
                  />
                  <Label className="flex" htmlFor={`colour-${item}`}>
                    {item}
                  </Label>
                </div>
              ))}
          </div>
          {/* Style Filter */}
          {/* <div className="flex flex-col pt-4">
            <p className="text-lg flex flex-row justify-between">
              Style{" "}
              {filters.open.style ? (
                <AiOutlineMinus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, style: false },
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
                      open: { ...filters.open, style: true },
                    })
                  }
                  className="cursor-pointer"
                />
              )}
            </p>
            {filters.open.style &&
              filters.styleList.map((item, index) => (
                <div className="flex items-center gap-2 mt-2" key={index}>
                  <Radio
                    name="style"
                    id={`style-${item}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!filters.style.includes(item)) {
                          setFilters({
                            ...filters,
                            style: [item],
                          });
                        }
                      } else {
                        setFilters({
                          ...filters,
                          style: filters.style.filter((i) => i !== item),
                        });
                      }
                    }}
                    checked={filters.style.includes(item)}
                  />
                  <Label className="flex" htmlFor={`style-${item}`}>
                    {item}
                  </Label>
                </div>
              ))}
          </div> */}
          <div className="flex flex-col pt-4 border-b border-black">
            <p className="text-lg flex flex-row justify-between">
              Stage Size (in sqft.){" "}
              {filters.open.stageSize ? (
                <AiOutlineMinus
                  size={24}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      open: { ...filters.open, stageSize: false },
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
                      open: { ...filters.open, stageSize: true },
                    })
                  }
                  className="cursor-pointer"
                />
              )}
            </p>
            {filters.open.stageSize && (
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        applySizeFilter: true,
                      });
                    } else {
                      setFilters({
                        ...filters,
                        applySizeFilter: false,
                      });
                    }
                  }}
                  checked={filters.applySizeFilter}
                  id="size-filter"
                />

                <Label className="flex" htmlFor="size-filter">
                  Apply Size filter
                </Label>
              </div>
            )}
            {filters.open.stageSize && (
              <div>
                <RangeSlider
                  range={filters.stageSizeRange}
                  setRange={(range) => {
                    setFilters({
                      ...filters,
                      stageSizeRange: range,
                    });
                  }}
                  factor={20}
                />
              </div>
            )}
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
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        applyPriceFilter: true,
                      });
                    } else {
                      setFilters({
                        ...filters,
                        applyPriceFilter: false,
                      });
                    }
                  }}
                  checked={filters.applyPriceFilter}
                  id="price-filter"
                />

                <Label className="flex" htmlFor="price-filter">
                  Apply Price filter
                </Label>
              </div>
            )}
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
        <div className="hide-scrollbar col-span-3 md:py-6 overflow-y-auto">
          <div className="py-2 border-y border-black bg-white grid grid-cols-2 md:hidden divide-x-2 divide-black  sticky top-0 w-full z-20">
            <span className="w-full flex flex-row justify-center">
              <Dropdown
                inline
                label="Filter"
                className=""
                dismissOnClick={false}
              >
                <div className="flex flex-col p-4">
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
                                occasion: filters.occasion.filter(
                                  (i) => i !== item
                                ),
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
                <div className="flex flex-col p-4 border-t border-black">
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
                  {filters.open.colours &&
                    Object.keys(filters.coloursList).map((item, index) => (
                      <div className="flex items-center gap-2 mt-2" key={index}>
                        <Checkbox
                          id={`colour-${item}`}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (!filters.colours.includes(item)) {
                                setFilters({
                                  ...filters,
                                  colours: [...filters.colours, item],
                                });
                              }
                            } else {
                              setFilters({
                                ...filters,
                                colours: filters.colours.filter(
                                  (i) => i !== item
                                ),
                              });
                            }
                          }}
                          checked={filters.colours.includes(item)}
                        />
                        <div
                          className={`h-4 w-4 rounded-full `}
                          style={{
                            background: filters.coloursList[item],
                          }}
                        />
                        <Label className="flex" htmlFor={`colour-${item}`}>
                          {item}
                        </Label>
                      </div>
                    ))}
                </div>
                {/* Style Filter */}
                {/* <div className="flex flex-col p-4 border-t border-black">
                  <p className="text-lg flex flex-row justify-between">
                    Style{" "}
                    {filters.open.style ? (
                      <AiOutlineMinus
                        size={24}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            open: { ...filters.open, style: false },
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
                            open: { ...filters.open, style: true },
                          })
                        }
                        className="cursor-pointer"
                      />
                    )}
                  </p>
                  {filters.open.style &&
                    filters.styleList.map((item, index) => (
                      <div className="flex items-center gap-2 mt-2" key={index}>
                        <Radio
                          name="style"
                          id={`style-${item}`}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (!filters.style.includes(item)) {
                                setFilters({
                                  ...filters,
                                  style: [item],
                                });
                              }
                            } else {
                              setFilters({
                                ...filters,
                                style: filters.style.filter((i) => i !== item),
                              });
                            }
                          }}
                          checked={filters.style.includes(item)}
                        />
                        <Label className="flex" htmlFor={`style-${item}`}>
                          {item}
                        </Label>
                      </div>
                    ))}
                </div> */}
                <div className="flex flex-col p-4 border-t border-black">
                  <p className="text-lg flex flex-row justify-between">
                    Stage Size (in sqft.){" "}
                    {filters.open.stageSize ? (
                      <AiOutlineMinus
                        size={24}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            open: { ...filters.open, stageSize: false },
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
                            open: { ...filters.open, stageSize: true },
                          })
                        }
                        className="cursor-pointer"
                      />
                    )}
                  </p>
                  {filters.open.stageSize && (
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              applySizeFilter: true,
                            });
                          } else {
                            setFilters({
                              ...filters,
                              applySizeFilter: false,
                            });
                          }
                        }}
                        checked={filters.applySizeFilter}
                        id="size-filter"
                      />

                      <Label className="flex" htmlFor="size-filter">
                        Apply Size filter
                      </Label>
                    </div>
                  )}
                  {filters.open.stageSize && (
                    <div>
                      <RangeSlider
                        range={filters.stageSizeRange}
                        setRange={(range) => {
                          setFilters({
                            ...filters,
                            stageSizeRange: range,
                          });
                        }}
                        factor={20}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-4 border-t border-black">
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
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              applyPriceFilter: true,
                            });
                          } else {
                            setFilters({
                              ...filters,
                              applyPriceFilter: false,
                            });
                          }
                        }}
                        checked={filters.applyPriceFilter}
                        id="price-filter"
                      />

                      <Label className="flex" htmlFor="price-filter">
                        Apply Price filter
                      </Label>
                    </div>
                  )}
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
              </Dropdown>
            </span>
            <span className="w-full flex flex-row justify-center">
              <Dropdown
                inline
                label={filters.sort ? filters.sort.replace(/-/g, " ") : "Sort"}
                className=""
              >
                <Dropdown.Item
                  onClick={() => {
                    setFilters({ ...filters, sort: "Price:Low-to-High" });
                  }}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilters({ ...filters, sort: "Price:High-to-Low" });
                  }}
                >
                  Price: High to Low
                </Dropdown.Item>
              </Dropdown>
            </span>
          </div>
          <div className="flex flex-row justify-between px-6 py-6 md:py-0 md:px-10 md:mb-8 items-center">
            <div className="w-full md:w-1/2">
              <SearchBar
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value });
                }}
                disabled={false}
              />
            </div>
            <div className="hidden md:inline">
              <Dropdown
                inline
                label={filters.sort ? filters.sort.replace(/-/g, " ") : "Sort"}
                className="max-w-max"
              >
                <Dropdown.Item
                  onClick={() => {
                    setFilters({ ...filters, sort: "Price:Low-to-High" });
                  }}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilters({ ...filters, sort: "Price:High-to-Low" });
                  }}
                >
                  Price: High to Low
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:gap-12 md:px-10">
            {list.map((item, index) => (
              <DecorCard key={index} decor={item} />
            ))}
          </div>
          {list.length === 0 && page === 0 && (
            <p className="py-4 text-center font-medium text-red-500">
              No Decor Found.
            </p>
          )}
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
        data: data.list,
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
