import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import rognLogo from "../assets/rognLogo.png";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Avatar, AvatarIcon } from "@nextui-org/react";

const style = {
  // wrapper: `bg-[#1A1523] w-screen px-[1.2rem] py-[0.8rem] flex sticky top-0 justify-center z-20`,
  desktopWrapper: ` flex md:items-center bg-[#1A1523] w-screen px-[1.2rem] py-2 md:py-[0.8rem] sticky top-0 justify-between items-center z-20`,
  mobileWrapper: `md:hidden bg-[#1A1523] w-screen px-[1.2rem] py-[0.8rem] flex sticky top-0 justify-between items-center z-20`,
  logoContainer: `flex flex-1 mr-9 items-center cursor-pointer `,
  logoText: ` ml-[0.8rem] text-white text-3xl `,
  searchBar: ` hidden md:flex w-3/5 mx-[0.8rem] items-center bg-[#061213] rounded-[0.8rem] hover:bg-[#3d3252] `,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `hidden md:flex px-8 py-4 md:py-0 md:px-3 md:flex-1 md:justify-around items-center `,
  headerItem: ` text-lg -mt-2 px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `flex  md:px-4  cursor-pointer`,
  headerIconProfile: `text-[#8a939b] text-2xl font-black mr-8  cursor-pointer`,
  menuIcon: `cursor-pointer`,
  drop: `absolute z-20 bg-[#1A1523] h-1/2 w-screen md:hidden`,
};

const Header = () => {
  const address = useAddress();
  const [menuOpen, setMenuOpen] = useState(false);

  const Links = [
    { name: "Buy", link: "/buy" },
    { name: "Sell", link: "/sell" },
    // { name: "Create", link: "/create" },
    // { name: "Profile", link: `/profile/${address}` },
  ];
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav className={`${style.desktopWrapper}`}>
        <Link href="/">
          <div
            className={`${style.logoContainer} ${
              menuOpen ? " duration-1500 " : ""
            }`}
          >
            <Image alt="Logo" src={rognLogo} height={40} width={40} />
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
        {Links.map((menu, index) => (
          <div className={style.headerItems}>
            <Link key={index} href={menu.link}>
              <div className={style.headerItem}>{menu.name}</div>
            </Link>
          </div>
        ))}
        <div className={style.headerItems}>
          <div className={style.headerIcon}>
            <ConnectWallet
              style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "0px",
                border: 0,
              }}
            />
            {address && (
              <Link href={`/profile/${address}`}>
                <div className={style.headerIconProfile}>
                  {/* <CgProfile /> */}
                  <Avatar
                    icon={<AvatarIcon />}
                    classNames={{
                      base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                      icon: "text-black/50",
                    }}
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
        <div onClick={handleNav} className="md:hidden cursor-pointer pl-24 ">
          {!menuOpen ? (
            <HiMenu
              size={25}
              className="transition-all ease-in-out duration-1000"
            />
          ) : (
            <IoClose
              size={25}
              className="transition-all ease-in-out duration-1000"
            />
          )}
        </div>
        <div
          className={`before:content-[''] bg-[#1a1523] before:absolute before:blur-xl w-full ${
            menuOpen
              ? "fixed left-0 top-14 overflow-hidden  w-[55%] sm:hidden h-screen p-10  duration-1000"
              : "fixed -left-[100%] blur-sm top-14 w-[0%] sm:hidden h-[101vh]  p-10 ease-in duration-1000"
          }`}
        >
          <div className="flex flex-col justify-between items-center h-full ">
            <div>
              <div className="text-xl items-center -ml-10 py-3 ">
                <Link href="/">Home</Link>
              </div>
              {Links.map((menu, index) => (
                <div className="text-xl items-center -ml-10 py-3 ">
                  <Link href={menu.link} key={index}>
                    {menu.name}
                  </Link>
                </div>
              ))}
              <div className="text-xl items-center -ml-10 py-3">
                <Link href={`/profile/${address}`}>Profile</Link>
              </div>
            </div>
            <div className="mb-8 ml-8 py-4">
              <ConnectWallet
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  padding: "0px",
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
