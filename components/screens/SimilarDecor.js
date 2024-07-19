import DecorCard from "../cards/DecorCard";

export default function SimilarDecor({ similarDecor }) {
  return (
    <div className="border-y border-y-black p-8 decor-bg-image">
      <p className="text-2xl font-semibold px-12 text-center">
        BROWSE MORE DECOR{" "}
      </p>
      <div className="flex flex-row md:gap-12 justify-between items-center my-6 px-4 md:px-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 grow">
          {similarDecor.map((item, index) => (
            <DecorCard decor={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
