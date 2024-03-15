export default function EventToolSidebar({
  tempEventDay,
  displayKey,
  handlePlannerClick,
}) {
  return (
    <>
      <div className="overflow-y-auto hide-scrollbar hidden border-r md:flex flex-col gap-6 py-4 pl-8">
        {tempEventDay?.decorItems.length > 0 && (
          <div className="flex flex-col gap-3 pl-6">
            <p className="flex flex-row justify-between pb-2 font-semibold text-xl">
              Decor
            </p>
            <div className="flex flex-col gap-2">
              {tempEventDay?.decorItems.map((item, index) =>
                displayKey === `decor-${item.decor._id}` ? (
                  <div
                    className="font-medium text-lg flex flex-row gap-2 items-center pl-2"
                    key={index}
                  >
                    {item.category}
                    <span className="h-px flex-grow bg-black"></span>
                  </div>
                ) : (
                  <div
                    className="text-gray-700 cursor-pointer"
                    key={index}
                    onClick={() =>
                      handlePlannerClick(`decor-${item.decor._id}`)
                    }
                  >
                    {item.category}
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {tempEventDay?.packages.length > 0 && (
          <div className="flex flex-col gap-3 pl-6">
            <p className="flex flex-row justify-between pb-2 font-semibold text-xl">
              Decor Packages
            </p>
            <div className="flex flex-col gap-2">
              {tempEventDay?.packages.map((item, index) =>
                displayKey === `package-${item.package._id}` ? (
                  <div
                    className="font-medium text-lg flex flex-row gap-2 items-center pl-2"
                    key={index}
                  >
                    {item.package.name}
                    <span className="h-px flex-grow bg-black"></span>
                  </div>
                ) : (
                  <div
                    className="text-gray-700 cursor-pointer"
                    key={index}
                    onClick={() =>
                      handlePlannerClick(`package-${item.package._id}`)
                    }
                  >
                    {item.package.name}
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {tempEventDay?.customItems?.length > 0 && (
          <div className="flex flex-col gap-3 pl-6 font-medium text-xl">
            {displayKey === `custom-add-ons` ? (
              <div className="font-semibold flex flex-row gap-2 items-center pl-2">
                {tempEventDay?.customItemsTitle || "ADD-ONS"}
                <span className="h-px flex-grow bg-black"></span>
              </div>
            ) : (
              <div
                className="text-gray-700 cursor-pointer"
                onClick={() => handlePlannerClick(`custom-add-ons`)}
              >
                {tempEventDay?.customItemsTitle || "ADD-ONS"}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
