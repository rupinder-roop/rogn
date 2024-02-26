import React from "react";

const WalletDetails = ({ imageSrc, walletAddress, walletBalance,symbol }) => {
  return (
    <div className="bg-[#416466] p-0 rounded-lg shadow-md">
    <div className="flex items-center justify-between px-2 mx-2">
      <div className="flex items-center space-x-3 mr-4">
        <img src={imageSrc} alt="Metamask Logo" className="w-6 h-6" />
      </div>
      <div className="mb">
        <p className="text-sm font-medium text-white">{walletAddress}</p>
        <p className="text-sm font-medium text-white">{parseFloat(walletBalance).toFixed(2)} {symbol}</p>
      </div>
    </div>
  </div>
  );
};

export default WalletDetails;
