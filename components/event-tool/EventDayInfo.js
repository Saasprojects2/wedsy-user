export default function EventDayInfo({ tempEventDay }) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between pr-8 mb-4 text-md">
        <div className="flex flex-col justify-between">
          <span>{new Date(tempEventDay.date).toDateString()}</span>
          <span>{tempEventDay.time} Onwards</span>
          <span>{tempEventDay.venue}</span>
        </div>
        <span className="">
          Designated Planner :
          <span className="text-rose-900 font-semibold">Rohaan Saleem</span>
        </span>
      </div>
    </>
  );
}
