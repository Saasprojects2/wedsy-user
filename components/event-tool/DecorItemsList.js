import { Tooltip } from "flowbite-react";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import ImageCard from "../cards/ImageCard";

export default function DecorItemsList({
  decorItems,
  status,
  RemoveDecorFromEvent,
  setNotes,
  event_id,
  eventDay,
  allowEdit,
}) {
  return (
    <>
      {decorItems.length > 0 && (
        <>
          {decorItems
            ?.sort(
              (a, b) =>
                [
                  "Nameboard",
                  "Entrance",
                  "Pathway",
                  "Photobooth",
                  "Stage",
                  "Mandap",
                ].indexOf(a.category) -
                [
                  "Nameboard",
                  "Entrance",
                  "Pathway",
                  "Photobooth",
                  "Stage",
                  "Mandap",
                ].indexOf(b.category)
            )
            ?.map((item) => (
              <div
                className="flex flex-col gap-4 mt-8 pt-2 border-b border-b-black"
                key={item._id}
                data-key={`decor-${item.decor._id}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center px-4 md:w-4/5">
                  <div className="relative md:col-span-3">
                    <p className="text-base font-semibold flex flex-row items-center gap-2 mb-2.5">
                      <span>{item.decor?.name}</span>
                      {allowEdit && !status.finalized && (
                        <MdDelete
                          size={24}
                          className="cursor-pointer ml-auto"
                          onClick={() => {
                            RemoveDecorFromEvent({
                              decor_id: item.decor._id,
                            });
                          }}
                        />
                      )}
                    </p>
                    <div className={`relative pt-[56.25%]`}>
                      <Image
                        src={item.decor?.image}
                        alt="Decor"
                        // width={0}
                        // height={0}
                        sizes="100%"
                        layout={"fill"}
                        objectFit="cover"
                        className="rounded-xl"
                        // className="rounded-xl w-auto !h-96"
                      />
                      {/* <ImageCard
                        src={item.decor?.image}
                        // className={`relative pt-[70%]`}
                        className={"rounded-xl"}
                      /> */}
                    </div>
                  </div>
                  {item.platform && item.flooring && (
                    <div className="flex flex-col md:flex-row items-center gap-0 md:gap-6 md:col-span-2 md:mt-6">
                      <AiOutlinePlus
                        size={24}
                        className="hidden md:block md:mx-3"
                      />
                      <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-between items-end">
                        <div>
                          <Image
                            src={"/assets/images/platform.png"}
                            alt="Platform"
                            width={0}
                            height={0}
                            sizes="100%"
                            style={{ width: "100%", height: "auto" }}
                          />
                          <p className="font-medium text-center mt-2 text-sm md:text-base">
                            Platform (
                            {`${item.dimensions.length} x ${item.dimensions.breadth} x ${item.dimensions.height}`}
                            )
                          </p>
                        </div>
                        <div>
                          <Image
                            src={
                              item.flooring === "Carpet"
                                ? "/assets/images/carpet.png"
                                : item.flooring === "Flex"
                                ? "/assets/images/flex.png"
                                : item.flooring === "PrintedFlex"
                                ? "/assets/images/printedFlex.png"
                                : "/assets/images/carpet.png"
                            }
                            alt="Platform"
                            width={0}
                            height={0}
                            sizes="100%"
                            style={{ width: "100%", height: "auto" }}
                          />
                          <p className="font-medium text-center mt-2 text-sm md:text-base">
                            Flooring:
                            {` ${
                              item.flooring !== "PrintedFlex"
                                ? item.flooring
                                : "Printed Flex"
                            }`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col px-4 pb-6 gap-2">
                    <div className="border p-2 md:border-0 rounded-lg">
                      <p className="text-lg font-medium mb-2">Inclusive of:</p>
                      <ul className="md:list-disc">
                        {item.decor.productInfo?.included.map(
                          (rec, recIndex) => (
                            <li key={recIndex}>{rec}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setNotes({
                            open: true,
                            edit: false,
                            loading: false,
                            event_id: event_id,
                            eventDay: eventDay,
                            decor_id: item.decor._id,
                            package_id: "",
                            admin_notes: item.admin_notes,
                            user_notes: item.user_notes,
                          });
                        }}
                        className="text-rose-900 bg-white hover:bg-rose-900 hover:text-white cursor-pointer px-2 py-1.5 text-sm focus:outline-none rounded-lg border-rose-900 border"
                      >
                        View Notes
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col md:w-1/3 md:ml-auto justify-end">
                    <p className="font-medium text-sm md:text-lg mt-auto text-right px-10">
                      {/* Price for{" "} */}
                      <span className="text-rose-900">
                        {item.variant === "artificialFlowers"
                          ? "Artificial"
                          : item.variant === "naturalFlowers"
                          ? "Natural"
                          : item.variant === "mixedFlowers"
                          ? "Mixed"
                          : ""}{" "}
                        Flowers
                      </span>
                    </p>
                    <div className="flex flex-row items-center justify-end gap-2 text-lg text-white font-medium bg-gradient-to-l from-rose-900 to-white py-2 px-10">
                      ₹ {item.price}{" "}
                      <Tooltip
                        content={
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-row justify-between gap-2">
                              <span>{item.category}:</span>
                              <span>
                                ₹
                                {
                                  item.decor.productInfo.variant[item.variant]
                                    .sellingPrice
                                }
                              </span>
                            </div>
                            {item.platform && (
                              <div className="flex flex-row justify-between gap-2">
                                <span>Platform:</span>
                                <span>
                                  ₹
                                  {item.dimensions.length *
                                    item.dimensions.breadth *
                                    25}
                                </span>
                              </div>
                            )}
                            {item.flooring && (
                              <div className="flex flex-row justify-between gap-2">
                                <span>Flooring:</span>
                                <span>
                                  ₹
                                  {(item.dimensions.length +
                                    item.dimensions.height) *
                                    (item.dimensions.breadth +
                                      item.dimensions.height) *
                                    (item.flooring === "Carpet"
                                      ? 8
                                      : item.flooring === "Flex"
                                      ? 10
                                      : item.flooring === "PrintedFlex"
                                      ? 15
                                      : 0)}
                                </span>
                              </div>
                            )}
                            {item.addOns?.map((rec, recIndex) => (
                              <div
                                className="flex flex-row justify-between gap-2"
                                key={recIndex}
                              >
                                <span>{rec.name}:</span>
                                <span>₹{rec.price}</span>
                              </div>
                            ))}
                          </div>
                        }
                        trigger="hover"
                        style="light"
                      >
                        <BsInfoCircle size={16} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}
