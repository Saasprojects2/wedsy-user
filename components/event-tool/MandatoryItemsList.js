import { toPriceString } from "@/utils/text";
import ImageCard from "../cards/ImageCard";

export default function MandatoryItemsList({ mandatoryItems }) {
  return (
    <>
      {mandatoryItems.length > 0 && (
        <>
          <p
            className="text-xl font-semibold flex flex-row items-center gap-2 my-3"
            data-key={"custom-add-ons"}
          >
            Mandatory Items
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-black">
            {mandatoryItems?.map((item, index) => (
              <div className="grid grid-cols-4 gap-2 px-2" key={index}>
                <div>
                  {item.image && (
                    <ImageCard src={item?.image} className="rounded-xl " />
                  )}
                </div>
                <div className="flex flex-col col-span-3">
                  <p>{item.description}</p>
                  <p>Price: {toPriceString(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
