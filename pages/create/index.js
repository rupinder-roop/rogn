import React from "react";
import Lottie from "lottie-react";
import soonData from "@/assets/soon.json";
import Header from "@/components/Header";

const index = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-4 md:px-0">
          <div className="w-full md:w-3/4 mb-8 md:mb-0">
            <Lottie animationData={soonData} className="h-full w-full" />
          </div>
          <div className="w-full md:w-screen md:p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Our NFT Creation Platform
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Exciting things are brewing! Our team is hard at work crafting a
              seamless NFT creation experience just for you. Stay tuned as we
              prepare to unveil our minting platform, where you can bring your
              digital creations to life on the blockchain. Watch this space for
              updates!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
