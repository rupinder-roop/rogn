import React from "react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import NFTGrid from "@/components/NftGrid";
import Header from "@/components/Header";

function Buy() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);
  console.log(data, "....data buy");

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <div className=" text-xl md:text-3xl font-bold mb-2">Buy NFTs</div>
        <div className="text-gray-500 text-sm md:text-base">
          Browse and buy NFTs from this collection.
        </div>
      </div>
      <div className="container mx-auto -my-6">
        <NFTGrid isLoading={isLoading} data={data} />
      </div>
    </>
  );
}

export default Buy;
