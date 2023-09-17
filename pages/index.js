import styles from "@/styles/Home.module.css";
export default function Home() {
  return (
    <>
      <main
        className={`${styles.main__div} flex flex-col justify-around gap-12`}
        id="mainDiv"
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
      <section className={`${styles.section__2} flex flex-col py-16 gap-6`}>
        <span className="text-4xl">
          Say <span className="text-[#D33467]">I DO</span>
          <br />
          To Expert Wedding Planning!
        </span>
        <p className="w-1/3">
          Are you ready to say ‘I Do’ to a wedding that exceeds your wildest
          dreams? Our certified wedding planners are here to make it happen. Get
          a free consultation and say goodbye to wedding planning stress and
          hello to seamless perfection.{" "}
        </p>
        <input
          type="text"
          placeholder="NAME"
          className="w-1/4 text-black bg-transparent border-0 border-b border-b-black outline-0 outline-0 placeholder:text-black"
        />
        <input
          type="text"
          placeholder="PHONE NO."
          className="w-1/4 text-black bg-transparent border-0 border-b border-b-black outline-0 outline-0 placeholder:text-black"
        />
        <input
          type="text"
          placeholder="OTP"
          className="w-1/4 text-black bg-transparent border-0 border-b border-b-black outline-0 outline-0 placeholder:text-black"
        />
        <button
          type="submit"
          className="w-1/4 rounded-full bg-black text-white py-2"
        >
          SUBMIT
        </button>
      </section>
      <section className="flex flex-col gap-12 py-16 px-24">
        <p className="text-[#D33467] flex font-medium gap-2">
          <span className="text-6xl">THE BEST</span>
          <span className="text-xl flex flex-col">
            <span>IN</span>

            <span>TOWN</span>
          </span>
          <span className="text-6xl">!</span>
        </p>
        <p className="text-center text-3xl">What Makes Wedsy Stand Out?</p>
        <div className="flex flex-row gap-12 mx-auto">
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#FFB8C0] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/easy.png" />
            </div>
            <span>Easy</span>
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#D6FF79] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/price.png" />
            </div>
            <span>Unbeatable Pricing</span>
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#F19A3E] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/quality.png" />
            </div>
            <span>Superior Quality</span>
          </div>
          <div className="text-center flex flex-col items-center gap-3">
            <div className="bg-[#70D6FF] flex justify-center rounded-3xl w-32 h-32">
              <img className="m-auto" src="/assets/icons/solutions.png" />
            </div>
            <span>Innovative Solutions</span>
          </div>
        </div>
      </section>
    </>
  );
}
