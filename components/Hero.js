import Link from "next/link";
import React from "react";

const style = {
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://i.seadn.io/s/raw/files/8e55a1e3891d317e3a747fba5f4cef81.jpg?auto=format&dpr=1&w=384')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: ` align-center w-3/4 mt-8 md:w-1/2`,
  title: `text-center text-white font-semibold text-2xl md:text-left sm:text-4xl  md:text-[46px]`,
  description: `text-[#8a939b] container-[400px] text-base text-center md:text-2xl md:text-left mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex place-content-center md:place-content-start sm:flex-row mb-8`,
  accentedButton: ` text-base -ml-1 mr-2 px-8 py-2 font-semibold sm:px-12 sm:py-4 bg-[#3d3252] rounded-lg sm:mr-5 text-white hover:bg-[#1A1523]  cursor-pointer`,
  button: `text-base font-semibold ml-2 px-8 py-2 sm:px-12 sm:py-4 bg-[#363840] rounded-lg md:inline-flex sm:mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `h-auto w-auto mx-6 md:h-auto md:w-auto rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
};

const Hero = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>Discover, collect, and sell NFTs</div>
            <div className={style.description}>
              Rogn is the world&apos;s first NFT marketplace
            </div>
            <div className={style.ctaContainer}>
              <Link href="/buy">
                <button className={style.accentedButton}>Explore</button>
              </Link>
              <Link href={"/create"}>
                <button className={style.button}>Create</button>
              </Link>
            </div>
          </div>
          <div className={style.cardContainer}>
            <a href="https://opensea.io/assets/ethereum/0xefdbe9a86a0ccdf905e566a6ca809b85a3214ffc/12">
              <img
                className="rounded-t-lg h-full w-fit"
                src="https://i.seadn.io/s/raw/files/8e55a1e3891d317e3a747fba5f4cef81.jpg?auto=format&dpr=1&w=384"
                alt="raw"
              />
            </a>
            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://i.seadn.io/gcs/files/cf6dcf969e2947afc194ec19a8201df4.jpg?auto=format&dpr=1&w=256"
                alt="raw"
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
