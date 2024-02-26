import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import rognLogo from'../assets/rognLogo.png'
import { useEffect } from "react";
import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
  shortenIfAddress,
} from "@thirdweb-dev/react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

// const walletConfig = metamaskWallet();

export default function Home() {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back ${
        userName !== "Unnamed"
          ? ` ${userName}`
          : ``
      } !!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };

  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);

      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {connectionStatus === "connected" ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className="walletConnectWrapper flex justify-center items-center h-screen bg-gray-200 bg-opacity-40 backdrop-filter backdrop-blur-lg fixed top-0 left-0 w-full z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full relative">
            <img
              src={rognLogo}
              alt="Logo"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gray-200"
              style={{ zIndex: 10 }}
            />
            <ConnectWallet
              theme="dark"
              showThirdwebBranding={false}
              modalSize="wide"
            />
          </div>
        </div>
      )}
    </div>
  );
}
