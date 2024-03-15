export default function EventDayInfo({ tempEventDay }) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between pr-8 mb-4 text-base font-medium">
        <div className="flex flex-col justify-between">
          <span>
            {new Date(tempEventDay.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            {new Date("1970-01-01T" + tempEventDay.time).toLocaleTimeString(
              "en-US",
              { hour: "numeric", minute: "2-digit" }
            )}
            Onwards
          </span>
          <span>{tempEventDay.venue}</span>
        </div>
        <span className="italic">
          Designated Planner : &nbsp;
          <span className="text-rose-900 font-semibold">Rohaan Saleem</span>
        </span>
      </div>
    </>
  );
}
