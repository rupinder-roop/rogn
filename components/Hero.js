import React from "react";

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://i.seadn.io/s/raw/files/8e55a1e3891d317e3a747fba5f4cef81.jpg?auto=format&dpr=1&w=384')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-white text-[46px] font-semibold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#416466] rounded-lg mr-5 text-white hover:bg-[#81aeb0]  cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, collect, and sell    NFTs
            </div>
            <div className={style.description}>
              Rogn is the world&apos;s first NFT marketplace
            </div>
            <div className={style.ctaContainer}>
              <button className={style.accentedButton}>Explore</button>
              <button className={style.button}>Create</button>
            </div>
          </div>
          <div className={style.cardContainer}>
            <a href="https://opensea.io/assets/ethereum/0xefdbe9a86a0ccdf905e566a6ca809b85a3214ffc/12">

            <img
              className="rounded-t-lg h-full w-fit"
              src="https://i.seadn.io/s/raw/files/8e55a1e3891d317e3a747fba5f4cef81.jpg?auto=format&dpr=1&w=384"
              alt=""
            />
            </a>
            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://i.seadn.io/gcs/files/cf6dcf969e2947afc194ec19a8201df4.jpg?auto=format&dpr=1&w=256"
                alt=""
              />
              <div className={style.author}>
                <a className={style.name} href="https://opensea.io/TOKYOLUV">
                    TOKYOLUV 
                </a>
                <a
                  className="text-[#1868b7]"
                  href="https://opensea.io/collection/tokyoluveditions"
                >
                  TOKYOLUV // EDITIONS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
