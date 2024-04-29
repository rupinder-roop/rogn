import React, { useState } from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import SaleInfo from "@/components/SalesInfo";
import NFTGrid from "@/components/NftGrid";
import { NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import Header from "@/components/Header";

export default function Sell() {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const [selectedNFT, setSelectedNFT] = useState();

  const style = {
    wrapper: `bg-[black] flex-auto flex-shrink w-[18rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-300 ease-in-out`,
    imgContainer: `h-5/5 w-full overflow-hidden flex justify-center items-center  transition-all duration-300 ease-in-out`,
    nftImg: `h-full w-full object-cover scale-110`,
    details: `p-3 mt-2 absolute bottom-0 left-0 w-full text-[white] drop-shadow-xl transition-all duration-500 ease-in-out`,
  };
  return (
    <>
      <Header />
      <div className=" mx-auto px-5 py-10">
        {!selectedNFT ? (
          <>
            <h1 className="text-3xl font-bold mb-5">Sell NFTs</h1>
            <p className="mb-5">Select which NFT to sell below.</p>
            <div >
              <NFTGrid
                data={data}
                isLoading={isLoading}
                overrideOnclickBehavior={(nft) => {
                  setSelectedNFT(nft);
                }}
                emptyText={"You don't own any NFTs yet from this collection."}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center w-vw h-[40rem] -mt-6 overflow-hidden rounded-xl">
            <div className="">
              <div className="grid grid-cols-2 gap-8 p-2 h-3/5 ">
                <div className={`rounded-lg overflow-hidden `}>
                  <ThirdwebNftMedia
                    metadata={selectedNFT.metadata}
                    width="100%"
                    height="100%"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between">
                  <h2 className="text-xl font-bold">
                    {console.log(selectedNFT)}
                    TOKEN ID #{selectedNFT.metadata.id}
                  </h2>
                    <button
                      onClick={() => {
                        setSelectedNFT(undefined);
                      }}
                      className=" hover:bg-gray-400 hover:text-gray-800 text-white-800 font-bold py-2 px-4 rounded ease-in-out transition-all duration-150"
                    >
                      X
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-bold">
                    NFT {selectedNFT.metadata.name}
                  </h2>
                  <SaleInfo nft={selectedNFT} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
