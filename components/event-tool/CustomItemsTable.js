import { toPriceString } from "@/utils/text";
import { Table } from "flowbite-react";
import ImageCard from "../cards/ImageCard";

export default function CustomItemsTable({ customItems, customItemsTitle }) {
  return (
    <>
      {customItems.length > 0 && (
        <>
          <p
            className="text-xl font-semibold flex flex-row items-center gap-2 my-3"
            data-key={"custom-add-ons"}
          >
            {customItemsTitle || "ADD ONS"}
          </p>
          <div className="md:mr-3">
            <div className="overflow-x-auto">
              <Table className="border mb-3 table-fixed md:table-auto w-full">
                <Table.Head>
                  <Table.HeadCell>Item Name</Table.HeadCell>
                  <Table.HeadCell>Qty.</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {customItems?.map((item, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell className="font-medium text-gray-900 dark:text-white flex flex-col md:flex-row justify-between">
                        <p>{item.name}</p>
                        {item.image && (
                          <ImageCard
                            src={item?.image}
                            className="rounded-xl w-24 h-auto"
                          />
                        )}
                      </Table.Cell>
                      <Table.Cell>{item.quantity}</Table.Cell>
                      <Table.Cell>{toPriceString(item.price)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
          <div className="flex flex-row border-b border-b-black">
            <div className="flex flex-col w-full md:w-1/2 md:ml-auto">
              <div className="mt-auto flex flex-row items-center justify-end gap-2 text-lg text-white font-medium bg-gradient-to-l from-rose-900 to-white py-2 px-10">
                {toPriceString(
                  customItems?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.price;
                  }, 0)
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
