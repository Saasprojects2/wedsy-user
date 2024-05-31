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
          <Table className="border mb-3  w-full">
            <Table.Head>
              <Table.HeadCell className="p-1">
                <span className="sr-only">#</span>
              </Table.HeadCell>
              <Table.HeadCell className="p-1">Item</Table.HeadCell>
              <Table.HeadCell className="p-1 text-right">Price</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {tempEventDay?.decorItems.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell className="p-2">{index + 1}</Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white p-1">
                    [{item.decor.category}] {item.decor.name}
                  </Table.Cell>
                  <Table.Cell className="p-1 text-rose-900 text-right">
                    {toPriceString(item.price)}
                  </Table.Cell>
                </Table.Row>
              ))}
              {tempEventDay?.packages.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell className="p-2">
                    {tempEventDay?.decorItems.length + index + 1}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white p-1">
                    [Package] {item.package.name}
                  </Table.Cell>
                  <Table.Cell className="p-1 text-rose-900 text-right">
                    {toPriceString(item.price)}
                  </Table.Cell>
                </Table.Row>
              ))}
              {tempEventDay.customItems.filter((i) => !i.includeInTotalSummary)
                .length > 0 && (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-2">
                    {tempEventDay?.decorItems.length +
                      tempEventDay?.packages.length +
                      1}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white p-1">
                    {tempEventDay.customItemsTitle || "ADD ONS"}
                  </Table.Cell>
                  <Table.Cell className="p-1 text-rose-900 text-right">
                    {toPriceString(
                      tempEventDay?.customItems
                        .filter((i) => !i.includeInTotalSummary)
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        }, 0)
                    )}
                  </Table.Cell>
                </Table.Row>
              )}
              {tempEventDay?.mandatoryItems
                .filter((i) => i.itemRequired && !i.includeInTotalSummary)
                ?.map((item, index) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <Table.Cell className="p-2">
                      {tempEventDay?.decorItems.length +
                        tempEventDay?.packages.length +
                        (tempEventDay.customItems.filter(
                          (i) => !i.includeInTotalSummary
                        ).length
                          ? 1
                          : 0) +
                        index +
                        1}
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-white p-1">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell className="p-1 text-rose-900 text-right">
                      {toPriceString(item.price)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-2" />
                <Table.Cell className="text-right font-medium text-gray-900 dark:text-white p-1">
                  Total
                </Table.Cell>
                <Table.Cell className="p-1 text-rose-900 text-right font-semibold">
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
                      tempEventDay?.customItems
                        .filter((i) => !i.includeInTotalSummary)
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        }, 0) +
                      tempEventDay?.mandatoryItems
                        ?.filter(
                          (i) => i.itemRequired && !i.includeInTotalSummary
                        )
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        }, 0)
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
