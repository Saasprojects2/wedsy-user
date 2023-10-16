import Image from "next/image";
import Link from "next/link";

export default function DecorCard({ decor, className }) {
  const { _id, thumbnail, name } = decor;
  return (
    <>
      <Link href={`/decor/view/${_id}`} className={`relative ${className}`}>
        <Image
          // src={`/assets/temp/d1.png`}
          src={`${thumbnail.trim()}`}
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "auto" }}
          className="rounded-xl"
        />
        <p className="mt-3 pl-2 font-semibold">{name}</p>
        <p className="pl-2  font-semibold">₹ {decor.productInfo.costPrice}</p>
      </Link>
    </>
  );
}
