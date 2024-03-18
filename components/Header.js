import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import rognLogo from "../assets/rognLogo.png";
import {
  ConnectWallet,
} from "@thirdweb-dev/react";

const style = {
  wrapper: `bg-[#1A1523] w-screen px-[1.2rem] py-[0.8rem] flex sticky top-0`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white text-3xl `,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#061213] rounded-[0.8rem] hover:bg-[#3d3252]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 cursor-pointer`,
};

const Header = () => {

  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={rognLogo} height={40} width={40} />
          <div className={`${style.logoText} dancing-script-rogn`}>Rogn</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <Link href="/collections/0xA5Eb0Ce0bFFCD1923F41FD036EaD74bda2CB7AfC">
          <div className={style.headerItem}> Collections </div>
        </Link>
        <div className={style.headerItem}> Stats </div>
        <div className={style.headerItem}> Resources </div>
        <Link href="/create/roop">
        <div className={style.headerItem}> Create </div>
        </Link>
        <div className={style.headerIcon}>
          <CgProfile />
        </div>
        <div className={style.headerIcon}>
              <ConnectWallet style={{ backgroundColor: 'transparent', color: 'white', padding:'0px' ,border:0 }} />
        </div>
      </div>
    </div>
  );
};

export default Header;

{
  /* <ConnectWallet   theme={"dark"} modalSize={"compact"} showThirdwebBranding={false} /> */
}
