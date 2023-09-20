import Image from "next/image";

export default function DecorCard({ image, title, price }) {
  return (
    <>
      <div className="relative">
        <Image
          src={`/assets/temp/${image}`}
          alt="Decor"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "auto" }}
          className="rounded-xl"
        />
        <p className="mt-3 pl-2 font-semibold">{title}</p>
        <p className="pl-2  font-semibold">₹ {price}</p>
      </div>
    </>
  );
}
