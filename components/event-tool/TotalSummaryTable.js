import { toPriceString } from "@/utils/text";
import { Table } from "flowbite-react";

export default function TotalSummaryTable({ event }) {
  return (
    <>
      <p className="mt-8 text-xl font-semibold flex flex-row justify-center items-center gap-2">
        TOTAL SUMMARY
      </p>
      <div>
        <div className="overflow-x-auto md:w-4/5 block mx-auto pb-6 mb-6 border-b border-b-black">
          <Table className="border mb-3 w-full">
            <Table.Head>
              <Table.HeadCell className="p-1">
                <span className="sr-only">#</span>
              </Table.HeadCell>
              <Table.HeadCell className="p-1">Event Day</Table.HeadCell>
              <Table.HeadCell className="p-1 text-right">Price</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {event?.eventDays?.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell className="p-2">{index + 1}</Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white p-1">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell className="p-1 text-rose-900 text-right">
                    {toPriceString(
                      item?.decorItems.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.price;
                      }, 0) +
                        item?.packages.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.price;
                        }, 0) +
                        item?.customItems.reduce(
                          (accumulator, currentValue) => {
                            return accumulator + currentValue.price;
                          },
                          0
                        ) +
                        item?.mandatoryItems.reduce(
                          (accumulator, currentValue) => {
                            return accumulator + currentValue.price;
                          },
                          0
                        )
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-2" />
                <Table.Cell className="text-right font-semibold uppercase text-gray-900 dark:text-white p-1">
                  Total
                </Table.Cell>
                <Table.Cell className="p-2 text-right text-rose-900 font-semibold">
                  {toPriceString(
                    event?.eventDays?.reduce(
                      (masterAccumulator, masterCurrentValue) => {
                        return (
                          masterAccumulator +
                          masterCurrentValue.decorItems.reduce(
                            (accumulator, currentValue) => {
                              return accumulator + currentValue.price;
                            },
                            0
                          ) +
                          masterCurrentValue?.packages.reduce(
                            (accumulator, currentValue) => {
                              return accumulator + currentValue.price;
                            },
                            0
                          ) +
                          masterCurrentValue?.customItems.reduce(
                            (accumulator, currentValue) => {
                              return accumulator + currentValue.price;
                            },
                            0
                          ) +
                          masterCurrentValue?.mandatoryItems.reduce(
                            (accumulator, currentValue) => {
                              return accumulator + currentValue.price;
                            },
                            0
                          )
                        );
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
