import { AiOutlinePlus } from "react-icons/ai";

export default function DecorQuotation({ userLoggedIn }) {
  return !userLoggedIn ? (
    <div className="py-16 px-6 md:px-24 bg-amber-100">
      <p className="text-2xl md:text-3xl font-medium mb-8">
        Have a decor in mind? Get an instant quote!
      </p>
      <div className="grid md:grid-cols-3">
        <div className="col-span-2">
          <p className="md:w-2/3 text-lg">
            {
              "Have a decor picture with you but you still don’t know how much it’s gonna cost? Upload your decor picture and Wedsy will revert back to you in 24 hours with a quote"
            }
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-8 justify-center md:w-2/3">
            <input
              type="text"
              placeholder="CITY"
              name="city"
              className="flex-grow pb-0 text-center bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0 placeholder:text-gray-500 placeholder:font-medium"
            />
            <input
              type="text"
              placeholder="ADDITIONAL COMMENTS"
              name="comments"
              className="flex-grow pb-0 text-center bg-transparent border-0 border-b-black outline-0 focus:outline-none focus:border-0 border-b focus:border-b focus:border-b-black focus:ring-0 placeholder:text-gray-500 placeholder:font-medium"
            />
          </div>
        </div>
        <div className="bg-[#57575799] mx-4 rounded-xl flex flex-col items-center justify-center gap-4 p-6 mt-4 md:mt-0">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
          />
          <label for="fileInput" className="bg-white p-2 rounded-full ">
            <AiOutlinePlus size={24} />
          </label>
          <span id="fileName" className="text-sm">
            UPLOAD HERE
          </span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
