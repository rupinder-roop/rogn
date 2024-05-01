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
      {!selectedNFT ? (
        <>
          <div className=" mx-auto px-5 py-10 ">
            <h1 className="text-3xl font-bold mb-5">Sell NFTs</h1>
            <p className="mb-5">Select which NFT to sell below.</p>
          </div>
          <div>
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
        <div className="flex justify-around w-full md:w-vw md:h-[40rem] mt-6 mx-1 rounded-xl">
          <div className="">
            <div className="grid md:grid md:grid-cols-2 md:gap-8 md:p-2 md:h-3/5 ">
              <div
                className={`h-[100%] w-[100%] ml-2 md:ml-5  md:h-full md:w-full justify-self-center rounded-xl overflow-hidden `}
              >
                <ThirdwebNftMedia
                  metadata={selectedNFT.metadata}
                  height="100%"
                  width="100%"
                  className="rounded-xl h-full w-full -mx-2.5"
                />
              </div>
              <div className="mt-2 md:mt-0 space-y-3">
                <div className="flex justify-between md:justify-between">
                  <h2 className="text-sm ml-4 md:ml-0 md:text-xl font-bold">
                    TOKEN ID #{selectedNFT.metadata.id}
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedNFT(undefined);
                    }}
                    className="absolute top-[5.5rem] right-2 md:top-0 md:right-0 md:relative border rounded-full hover:bg-gray-400 hover:text-gray-800 text-white-800 font-bold py-0 px-2  ease-in-out transition-all duration-150"
                  >
                    X
                  </button>
                </div>
                <h2 className=" ml-4 md:ml-0 text-lg md:text-xl font-bold">
                  NFT {selectedNFT.metadata.name}
                </h2>
                <SaleInfo nft={selectedNFT} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
