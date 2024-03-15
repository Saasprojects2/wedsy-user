import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function DecorPackagesList({
  packages,
  status,
  RemovePackageFromEvent,
  setNotes,
  event_id,
  eventDay,
  allowEdit,
}) {
  return (
    <>
      {packages.length > 0 && (
        <>
          {packages.map((item) => (
            <div
              className="flex flex-col gap-3 pt-4 border-b border-b-black"
              key={item._id}
              data-key={`package-${item.package._id}`}
            >
              <p className="text-xl font-semibold flex flex-row items-center gap-2 mb-2">
                <span>{item.package?.name}</span>
                {allowEdit && !status.finalized && (
                  <MdDelete
                    size={24}
                    className="cursor-pointer ml-auto"
                    onClick={() => {
                      RemovePackageFromEvent({
                        package_id: item.package._id,
                      });
                    }}
                  />
                )}
              </p>
              {item.decorItems.map((rec, recIndex) => (
                <>
                  <div className="flex flex-col gap-4" key={rec._id}>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center px-4 md:w-4/5">
                      <div className="relative md:col-span-3">
                        <p className="text-base font-semibold flex flex-row items-center gap-2 mb-2">
                          <span>{rec.decor?.name}</span>
                        </p>
                        <Image
                          src={rec.decor?.image}
                          alt="Decor"
                          width={0}
                          height={0}
                          sizes="100%"
                          className="rounded-xl w-auto h-92"
                        />
                      </div>
                      {rec.platform && rec.flooring && (
                        <div className="flex flex-col md:flex-row items-center gap-6 md:col-span-2">
                          <AiOutlinePlus size={24} />
                          <div className="flex flex-row md:flex-col gap-3">
                            <Image
                              src={"/assets/images/platform.png"}
                              alt="Platform"
                              width={0}
                              height={0}
                              sizes="100%"
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                            />
                            <p className="font-medium text-center mb-2">
                              Platform (
                              {`${rec.dimensions.length} x ${rec.dimensions.breadth} x ${rec.dimensions.height}`}
                              )
                            </p>
                            <Image
                              src={
                                rec.flooring === "Carpet"
                                  ? "/assets/images/carpet.png"
                                  : rec.flooring === "Flex"
                                  ? "/assets/images/flex.png"
                                  : rec.flooring === "PrintedFlex"
                                  ? "/assets/images/printedFlex.png"
                                  : "/assets/images/carpet.png"
                              }
                              alt="Platform"
                              width={0}
                              height={0}
                              sizes="100%"
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                            />
                            <p className="font-medium text-center mb-2">
                              Flooring:
                              {` ${
                                rec.flooring !== "PrintedFlex"
                                  ? rec.flooring
                                  : "Printed Flex"
                              }`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="flex flex-col px-4 pb-1">
                        <p className="text-lg font-medium">Inclusive of:</p>
                        {rec.decor.productInfo?.included.map((temp, tIndex) => (
                          <p key={tIndex}>{temp}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col px-4  pt-auto pb-1">
                  <button
                    onClick={() => {
                      setNotes({
                        open: true,
                        edit: false,
                        loading: false,
                        event_id: event_id,
                        eventDay: eventDay,
                        decor_id: "",
                        package_id: item.package._id,
                        admin_notes: item.admin_notes,
                        user_notes: item.user_notes,
                      });
                    }}
                    className="mt-auto text-rose-900 bg-white hover:bg-rose-900 hover:text-white cursor-pointer px-2 py-1.5 text-sm focus:outline-none rounded-lg border-rose-900 border"
                  >
                    View Notes
                  </button>
                </div>
                <div className="flex flex-col md:w-1/2 md:ml-auto">
                  <p className="font-medium text-lg mt-auto text-right px-10">
                    Price for{" "}
                    <span className="text-rose-900">
                      {item.variant === "artificialFlowers"
                        ? "Artificial"
                        : item.variant === "naturalFlowers"
                        ? "Natural"
                        : item.variant === "mixedFlowers"
                        ? "Mixed"
                        : ""}{" "}
                      Flowers.
                    </span>
                  </p>
                  <div className="mt-auto flex flex-row items-center justify-end gap-2 text-lg text-white font-medium bg-gradient-to-l from-rose-900 to-white py-2 px-10">
                    ₹ {item.price}{" "}
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
