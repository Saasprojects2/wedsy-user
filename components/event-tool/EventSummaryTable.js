import { toPriceString } from "@/utils/text";
import { Table } from "flowbite-react";

export default function EventSummaryTable({ tempEventDay }) {
  return (
    <>
      <p className="mt-8 text-xl font-semibold flex flex-row justify-center items-center gap-2">
        EVENT SUMMARY
      </p>
      <div>
        <div className="overflow-x-auto md:w-4/5 block mx-auto pb-6 mb-6 border-b border-b-black">
          <Table className="border my-3">
            <Table.Head>
              <Table.HeadCell>
                <span className="sr-only">#</span>
              </Table.HeadCell>
              <Table.HeadCell>Item</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {tempEventDay?.decorItems.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    [{item.decor.category}] {item.decor.name}
                  </Table.Cell>
                  <Table.Cell>{toPriceString(item.price)}</Table.Cell>
                </Table.Row>
              ))}
              {tempEventDay?.packages.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell>
                    {tempEventDay?.decorItems.length + index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    [Package] {item.package.name}
                  </Table.Cell>
                  <Table.Cell>{toPriceString(item.price)}</Table.Cell>
                </Table.Row>
              ))}
              {tempEventDay.customItems.length > 0 && (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {tempEventDay?.decorItems.length +
                      tempEventDay?.packages.length +
                      1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {tempEventDay.customItemsTitle || "ADD ONS"}
                  </Table.Cell>
                  <Table.Cell>
                    {toPriceString(
                      tempEventDay?.customItems.reduce(
                        (accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        },
                        0
                      )
                    )}
                  </Table.Cell>
                </Table.Row>
              )}
              {tempEventDay?.mandatoryItems
                .filter((i) => i.itemRequired)
                ?.map((item, index) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <Table.Cell>
                      {tempEventDay?.decorItems.length +
                        tempEventDay?.packages.length +
                        (tempEventDay.customItems.length ? 1 : 0) +
                        index +
                        1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell>{toPriceString(item.price)}</Table.Cell>
                  </Table.Row>
                ))}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell />
                <Table.Cell className="text-right whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Total
                </Table.Cell>
                <Table.Cell>
                  {toPriceString(
                    tempEventDay?.decorItems.reduce(
                      (accumulator, currentValue) => {
                        return accumulator + currentValue.price;
                      },
                      0
                    ) +
                      tempEventDay?.packages.reduce(
                        (accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        },
                        0
                      ) +
                      tempEventDay?.customItems.reduce(
                        (accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        },
                        0
                      ) +
                      tempEventDay?.mandatoryItems.reduce(
                        (accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        },
                        0
                      )
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
