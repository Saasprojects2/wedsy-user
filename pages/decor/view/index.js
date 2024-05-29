import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  Checkbox,
  Dropdown,
  Label,
  TextInput,
  Spinner,
  Radio,
  Select,
} from "flowbite-react";
import DecorCard from "@/components/cards/DecorCard";
import { useState, useEffect, useRef } from "react";
import RangeSlider from "@/components/slider/RangeSlider";
import SearchBar from "@/components/searchBar/SearchBar";
import { useRouter } from "next/router";
import Head from "next/head";
import DecorDisclaimer from "@/components/marquee/DecorDisclaimer";

function DecorListing({ data }) {
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const [filters, setFilters] = useState({
    open: {
      occasion: true,
      colours: false,
      priceRange: false,
      style: false,
      stageSize: false,
    },
    category: router.query.category || "",
    categoryList: [
      "Stage",
      "Pathway",
      "Entrance",
      "Photobooth",
      "Mandap",
      "Nameboard",
    ],
    style: [],
    styleList: ["Modern", "Traditional", "Both"],
    priceRange: [0, 115000],
    stageSizeRange: [0, 1500],
    stageLengthRange: [0, 0],
    stageWidthRange: [0, 0],
    stageHeightRange: [0, 0],
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/decor?page=${page}${
          filters.category || router.query.category
            ? `&category=${
                filters.category ? filters.category : router.query.category
              }`
            : ""
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
          // }${
          //   filters.applySizeFilter && filters.stageSizeRange
          //     ? `&stageSizeLower=${filters.stageSizeRange[0]}&stageSizeHigher=${filters.stageSizeRange[1]}`
          //     : ""
        }${
          filters.applySizeFilter &&
          filters.stageLengthRange.filter((item) => item > 0).length > 0
            ? `&stageLengthLower=${filters.stageLengthRange[0]}&stageLengthHigher=${filters.stageLengthRange[1]}`
            : ""
        }${
          filters.applySizeFilter &&
          filters.stageWidthRange.filter((item) => item > 0).length > 0
            ? `&stageWidthLower=${filters.stageWidthRange[0]}&stageWidthHigher=${filters.stageWidthRange[1]}`
            : ""
        }${
          filters.applySizeFilter &&
          filters.stageHeightRange.filter((item) => item > 0).length > 0
            ? `&stageHeightLower=${filters.stageHeightRange[0]}&stageHeightHigher=${filters.stageHeightRange[1]}`
            : ""
        }&displayVisible=true&displayAvailable=true`
      );
      const tempData = await response.json();
      if (page === 1 && filters.sort.length <= 0) {
        setList([
          ...list,
          ...tempData.list.sort((a, b) => 0.5 - Math.random()),
        ]);
      } else {
        setList([...list, ...tempData.list]);
      }
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
    filters.category,
    filters.stageLengthRange,
    filters.stageHeightRange,
    filters.stageWidthRange,
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
      <Head>
        <meta
          name="google-site-verification"
          content="6NQH3LHjenBtdQYZzStAqCj51nFRb1P4Pb5jhIdugB0"
        />
        {router.query.category === "Stage" && (
          <>
            <title>Best Wedding Stage Decoration For Marriage | Wedsy</title>
            <meta
              name="description"
              content="Find the perfect wedding stage decoration at Wedsy. Our best stage decoration for marriage will make your day unforgettable. Book now! "
            />
            <meta
              name="keywords"
              content="wedding stage decoration,best stage decoration for marriage, best wedding stage decoration"
            />
            <meta name="robots" content="index, follow" />
            <meta name="copyright" content="Wedsy" />
            <meta name="language" content="EN" />
          </>
        )}
        {router.query.category === "Mandap" && (
          <>
            <title>
              Affordable Mandap Decoration Prices | Elegant Designs by Wedsy
            </title>
            <meta
              name="description"
              content="Wedsy offers competitive mandap decoration prices for weddings. Explore our cost-effective packages for breathtaking designs that don't compromise on elegance. "
            />
            <meta name="keywords" content="mandap decoration price" />
            <meta name="robots" content="index, follow" />
            <meta name="copyright" content="Wedsy" />
            <meta name="language" content="EN" />
          </>
        )}
      </Head>
      <DecorDisclaimer />
      <div
        className="md:p-8 grid md:grid-cols-4 gap-8 relative overflow-hidden hide-scrollbar decor-bg-image"
        ref={divRef}
        style={{ height: divSize.height ?? "100vh" }}
      >
        <div className="hide-scrollbar border-r border-black hidden md:flex flex-col divide-y gap-4 divide-black pr-6 overflow-y-auto">
          <p className="text-xl font-medium">Filter by</p>
          {filters.category !== "Mandap" && (
            <div className="flex flex-col pt-4 md:gap-2">
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
          )}
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
            {/* {filters.open.stageSize && (
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
            )} */}
            {filters.open.stageSize && (
              <div className="flex flex-col gap-3 p-3">
                <Select
                  value={JSON.stringify(filters.stageLengthRange)}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      stageLengthRange: JSON.parse(e.target.value),
                    });
                  }}
                >
                  {[
                    [0, 0],
                    [0, 5],
                    [5, 10],
                    [10, 15],
                    [15, 20],
                    [20, 25],
                    [25, 30],
                    [30, 35],
                    [35, 40],
                    [40, 45],
                    [45, 50],
                    [50, 55],
                    [55, 60],
                    [60, 65],
                    [65, 70],
                    [70, 75],
                    [75, 80],
                    [80, 85],
                    [85, 90],
                    [90, 95],
                    [95, 100],
                  ].map((item, index) => (
                    <option value={JSON.stringify(item)} key={index}>
                      Length:{" "}
                      {item[0] == 0 && item[1] == 0
                        ? "Select Range"
                        : `${item[0]} - ${item[1]} ft.`}
                    </option>
                  ))}
                </Select>
                <Select
                  value={JSON.stringify(filters.stageWidthRange)}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      stageWidthRange: JSON.parse(e.target.value),
                    });
                  }}
                >
                  {[
                    [0, 0],
                    [0, 5],
                    [5, 10],
                    [10, 15],
                    [15, 20],
                    [20, 25],
                    [25, 30],
                  ].map((item, index) => (
                    <option value={JSON.stringify(item)} key={index}>
                      Width:{" "}
                      {item[0] == 0 && item[1] == 0
                        ? "Select Range"
                        : `${item[0]} - ${item[1]} ft.`}
                    </option>
                  ))}
                </Select>
                <Select
                  value={JSON.stringify(filters.stageHeightRange)}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      stageHeightRange: JSON.parse(e.target.value),
                    });
                  }}
                >
                  {[
                    [0, 0],
                    [0, 5],
                    [5, 10],
                    [10, 15],
                    [15, 20],
                    [20, 25],
                    [25, 30],
                  ].map((item, index) => (
                    <option value={JSON.stringify(item)} key={index}>
                      Height:{" "}
                      {item[0] == 0 && item[1] == 0
                        ? "Select Range"
                        : `${item[0]} - ${item[1]} ft.`}
                    </option>
                  ))}
                </Select>
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
                <div className="max-h-[75vh] overflow-y-auto z-40 ml-auto">
                  {filters.category !== "Mandap" && (
                    <div className="flex flex-col p-4 ">
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
                          <div
                            className="flex items-center gap-2 mt-2"
                            key={index}
                          >
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
                            <Label
                              className="flex"
                              htmlFor={`ocassion-${item}`}
                            >
                              {item}
                            </Label>
                          </div>
                        ))}
                    </div>
                  )}
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
                        <div
                          className="flex items-center gap-2 mt-2"
                          key={index}
                        >
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
                    {/* {filters.open.stageSize && (
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
                  )} */}
                    {filters.open.stageSize && (
                      <div className="flex flex-col gap-3 p-3">
                        <Select
                          value={JSON.stringify(filters.stageLengthRange)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              stageLengthRange: JSON.parse(e.target.value),
                            });
                          }}
                        >
                          {[
                            [0, 0],
                            [0, 5],
                            [5, 10],
                            [10, 15],
                            [15, 20],
                            [20, 25],
                            [25, 30],
                            [30, 35],
                            [35, 40],
                            [40, 45],
                            [45, 50],
                            [50, 55],
                            [55, 60],
                            [60, 65],
                            [65, 70],
                            [70, 75],
                            [75, 80],
                            [80, 85],
                            [85, 90],
                            [90, 95],
                            [95, 100],
                          ].map((item, index) => (
                            <option value={JSON.stringify(item)} key={index}>
                              Length:{" "}
                              {item[0] == 0 && item[1] == 0
                                ? "Select Range"
                                : `${item[0]} - ${item[1]} ft.`}
                            </option>
                          ))}
                        </Select>
                        <Select
                          value={JSON.stringify(filters.stageWidthRange)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              stageWidthRange: JSON.parse(e.target.value),
                            });
                          }}
                        >
                          {[
                            [0, 0],
                            [0, 5],
                            [5, 10],
                            [10, 15],
                            [15, 20],
                            [20, 25],
                            [25, 30],
                          ].map((item, index) => (
                            <option value={JSON.stringify(item)} key={index}>
                              Width:{" "}
                              {item[0] == 0 && item[1] == 0
                                ? "Select Range"
                                : `${item[0]} - ${item[1]} ft.`}
                            </option>
                          ))}
                        </Select>
                        <Select
                          value={JSON.stringify(filters.stageHeightRange)}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              stageHeightRange: JSON.parse(e.target.value),
                            });
                          }}
                        >
                          {[
                            [0, 0],
                            [0, 5],
                            [5, 10],
                            [10, 15],
                            [15, 20],
                            [20, 25],
                            [25, 30],
                          ].map((item, index) => (
                            <option value={JSON.stringify(item)} key={index}>
                              Height:{" "}
                              {item[0] == 0 && item[1] == 0
                                ? "Select Range"
                                : `${item[0]} - ${item[1]} ft.`}
                            </option>
                          ))}
                        </Select>
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
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between px-6 py-6 md:py-0 md:px-10 md:mb-8 items-center">
            <div className="block md:hidden">
              <Dropdown
                inline
                label={
                  filters.category
                    ? filters.category
                    : router.query.category
                    ? router.query.category
                    : "Select Category"
                }
                className="max-w-max"
              >
                <Dropdown.Item
                  onClick={() => {
                    setFilters({ ...filters, category: "" });
                  }}
                >
                  Select Category
                </Dropdown.Item>
                {filters.categoryList?.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      if (item === "Mandap") {
                        setFilters({
                          ...filters,
                          category: item,
                          occasion: [],
                        });
                      } else {
                        setFilters({ ...filters, category: item });
                      }
                    }}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="w-full md:w-1/2">
              <SearchBar
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value });
                }}
                disabled={false}
              />
            </div>
            <div className="hidden md:flex flex-row gap-3">
              <Dropdown
                inline
                label={
                  filters.category
                    ? filters.category
                    : router.query.category
                    ? router.query.category
                    : "Select Category"
                }
                className="max-w-max"
              >
                <Dropdown.Item
                  onClick={() => {
                    setFilters({ ...filters, category: "" });
                  }}
                >
                  Select Category
                </Dropdown.Item>
                {filters.categoryList?.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setFilters({ ...filters, category: item });
                    }}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
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
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/decor?displayVisible=true&displayAvailable=true${
        query.category ? `&category=${query.category}` : ""
      }`
    );
    const data = await response.json();
    return {
      props: {
        data: data.list.sort((a, b) => 0.5 - Math.random()),
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
