import Image from "next/image";
import Link from "next/link";

export default function DecorPackageCard({ className }) {
  //   const { _id, thumbnail, name } = decor;
  return (
    <>
      <Link
        href={`/decor/view/`}
        className={`p-6 shadow-md rounded-lg flex flex-col gap-2 ${className}`}
      >
        <div className={`relative grid grid-cols-2 gap-2`}>
          {/* <Image
            src={`${thumbnail}`}
            alt="Decor"
            // width={0}
            // height={0}
            sizes="100%"
            layout={"fill"}
            objectFit="cover"
            // style={{ width: "100%", height: "auto" }}
            className="rounded-xl"
          /> */}
          <div className="w-full h-32 bg-gray-400" />
          <div className="w-full h-32 bg-gray-400" />
          <div className="w-full h-32 bg-gray-400" />
          <div className="w-full h-32 bg-gray-400" />
        </div>
        <p className="font-semibold">Silver package</p>
        <p className="">Stage, Entrance, Nameboard</p>
        <p className="text-xl text-rose-900 font-semibold">
          ₹ 40,000
          {/* {decor.productInfo.variant.artificialFlowers.sellingPrice ||
            decor.productInfo.variant.mixedFlowers.sellingPrice ||
            decor.productInfo.variant.naturalFlowers.sellingPrice} */}
        </p>
      </Link>
    </>
  );
}
