import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="relative col-span-2">
          <Image
            src={`/assets/images/login-image.png`}
            alt="Decor"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="bg-[#ABBBC7] flex flex-col gap-16 px-8 pb-32 items-center justify-center">
          <p className="font-semibold text-lg text-center">{`"Together is a beautiful place to be. Join us as we say 'I do'!"`}</p>
          <div className=" gap-6 flex flex-col w-3/4">
            <input
              type="text"
              placeholder="NAME"
              className="text-center text-black bg-transparent border-0 border-b border-b-black outline-0 outline-0 placeholder:text-black"
            />
            <input
              type="text"
              placeholder="PHONE NO."
              className="text-center text-black bg-transparent border-0 border-b border-b-black outline-0 outline-0 placeholder:text-black"
            />
            <input
              type="text"
              placeholder="OTP"
              className="text-center text-black bg-transparent border-0 border-b border-b-black outline-0 outline-0 placeholder:text-black"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-black text-white py-2 w-3/4"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
