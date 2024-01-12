import Image from "next/image";
import Link from "next/link";

export default function DecorCard({ decor, className }) {
  const { _id, thumbnail, name } = decor;
  return (
    <>
      <Link href={`/decor/view/${_id}`} className={`${className}`}>
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
        <p className="mt-3 pl-2 font-semibold">{name}</p>
        <p className="pl-2  font-semibold">
          ₹{" "}
          {decor.productInfo.variant.artificialFlowers.sellingPrice ||
            decor.productInfo.variant.mixedFlowers.sellingPrice ||
            decor.productInfo.variant.naturalFlowers.sellingPrice}{" "}
          {decor.category === "Pathway" && `/ ${decor.unit}`}
        </p>
      </Link>
    </>
  );
}
