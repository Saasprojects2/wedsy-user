import Image from "next/image";
import Link from "next/link";

export default function DecorCard({ decor, className }) {
  const { _id, thumbnail, name } = decor;
  return (
    <>
      <Link
        href={`/decor/view/${_id}`}
        target="_blank"
        className={`${className}`}
      >
        <div className={`relative pt-[56.25%]`}>
          <Image
            src={`${thumbnail}`}
            alt="Decor"
            // width={0}
            // height={0}
            sizes="100%"
            layout={"fill"}
            objectFit="cover"
            // style={{ width: "100%", height: "auto" }}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap bg-white px-6 py-2 rounded-full mt-3">
          <p className="font-semibold">{name}</p>
          <p className="font-semibold text-rose-900">
            ₹ {decor.productTypes[0]?.sellingPrice}{" "}
            {decor.category === "Pathway" && `/ ${decor.unit}`}
          </p>
        </div>
      </Link>
    </>
  );
}
