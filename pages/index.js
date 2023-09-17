import styles from "@/styles/Home.module.css";
export default function Home() {
  return (
    <>
      <main
        className={`${styles.main__div} flex flex-col justify-around gap-12`}
      >
        <div className="strike">
          <span className="text-white text-6xl text-center font-normal">
            WEDDINGS MADE EASY
          </span>
        </div>
        <div className="px-16 flex flex-row justify-between mb-16 text-white">
          <div className="w-1/3  text-6xl ">
            YOUR WEDDING <span className="text-8xl font-medium">MEGA</span>{" "}
            STORE
          </div>
          <div className="flex flex-col w-1/3 text-center gap-6">
            <span className="text-3xl">YOUR WEDDING VISION, OUR EXPERTISE</span>
            <input
              type="text"
              placeholder="NAME"
              className="text-white text-center bg-transparent border-0 border-b border-b-white outline-0 outline-0 placeholder:text-white"
            />
            <input
              type="text"
              placeholder="PHONE NO."
              className="text-white text-center bg-transparent border-0 border-b border-b-white outline-0 outline-0 placeholder:text-white"
            />
            <button
              type="submit"
              className="rounded-full bg-white text-black py-2"
            >
              ENTER WITH WEDSY
            </button>
          </div>
        </div>
      </main>
      <main className={`${styles.main__div__2}`}>
        <img src="/assets/images/flowers-1.png" className=" float-left" />
        <img src="/assets/images/flowers-2.png" className=" float-right" />
        <div className="text-center flex flex-col h-full">
          <span className="text-[#622400] text-4xl mt-[15%]">
            DISCOVER WEDSY&#39;S MAGIC
          </span>
          <span className="text-[#622400] text-8xl">MAGIC</span>
          <span>MEMORIES MADE EASY, NO HASSLES TO SEE</span>
          <span className="mt-16 text-left ml-8">
            Share Your Desires - Where wedding dreams catch fire.
          </span>
          <span className="text-sm mt-auto mb-4 ml-auto">
            Let us bring your wedding vision to life. Your dream wedding, along
            with a free consultation, is just a click away! 🌟
          </span>
        </div>
      </main>
    </>
  );
}
