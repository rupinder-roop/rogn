import Header from "../components/Header";
import Hero from "../components/Hero";
import { useEffect } from "react";
import {
  ConnectWallet,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text-[#282b2f] font-semibold mt-4`,
};

export default function Home() {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome Back ${userName !== "Unnamed" ? userName : ""}!`,
      {
        style: {
          border: "1px solid #1a1523",
          padding: "8px",
          color: "whitesmoke",
          background: "#1a1523",
        },
        iconTheme: {
          primary: "#3d3252",
          secondary: "white",
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
        userName: "Unnamed",
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);

      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <>
    <Head>
        <title>Home | ROGN | Rupinder Singh</title>
      </Head>
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {connectionStatus === "connected" ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <div className="hero bg-[#1A1523] min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">
            Connect Your Wallet to Explore NFTs!
          </h1>
          <p className="text-lg text-center max-w-md mb-8">
            Unlock the world of decentralized applications and digital assets by
            connecting your wallet securely.
          </p>
          <ConnectWallet
            theme="dark"
            showThirdwebBranding={false}
            modalSize="compact"
            style={{ border: "2px solid " }}
            className="border-2 border-gray-300 p-4 rounded-lg shadow-md w-full max-w-md"
          />
        </div>
      )}
    </div>
    </>
  );
}
