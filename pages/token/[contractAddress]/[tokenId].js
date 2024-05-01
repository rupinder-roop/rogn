import React, { useState } from "react";
import Link from "next/link";
import {
  ThirdwebNftMedia,
  Web3Button,
  useContract,
  useAddress,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import { Skeleton, Input, Button, Snippet } from "@nextui-org/react";

import Header from "@/components/Header";

export default function TokenPage({ nft, contractMetadata }) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });
  const [bidValue, setBidValue] = useState("");
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  async function buyListing() {
    let txResult;
    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }
    return txResult;
  }

  async function createBidOffer() {
    let txResult;
    if (!bidValue) {
      return;
    }

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.offers.makeOffer({
        assetContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        totalPrice: bidValue,
      });
    } else {
      throw new Error("No listing found");
    }
    return txResult;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-5 my-5">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="space-y-6 w-full  md:w-4/5 md:h-4/5">
            <div className="rounded-2xl overflow-hidden">
              <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  width="100%"
                  height="100%"
                />
              </Skeleton>
            </div>
            <div className="flex flex-row justify-between">
              <div className="md:py-3">
                <p className="text-xs md:text-lg font-bold">Description:</p>
                <p>{nft.metadata.description}</p>
              </div>
              <div>
                {nft?.metadata?.attributes ? (
                  <>
                    <p className="text-xs md:text-lg font-bold">Traits:</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(nft?.metadata?.attributes || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex flex-col items-center justify-center border p-2 rounded"
                          >
                            <p className="text-sm">{value.trait_type}</p>
                            <p className="text-sm font-bold">{value.value}</p>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p className=" text-xs md:text-lg font-bold">Traits:</p>
                    No Traits Available
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mt-4 sm:mt-4 sm:-ml-3 space-y-2 md:space-y-6 ">
            {contractMetadata && (
              <div className="flex items-center">
                <div className="rounded overflow-hidden mr-4">
                  <img
                    src={contractMetadata.image}
                    alt="Contract Image"
                    width={40}
                    height={40}
                    className="object-cover border-2 border-cyan-400 p-1 rounded-full"
                  />
                </div>
                <p className="font-bold">{contractMetadata.name}</p>
              </div>
            )}

            <div className="mx-2.5">
              <p className="text-sm sm:text-2xl md:text-4xl mb-2 font-bold">
                {nft.metadata.name}
              </p>
              <div className=" sm:justify-center sm:flex-row">
                <Link href={`/profile/${nft.owner}`}>
                  <Button className="mr-10 md:mr-5">Owner</Button>
                </Link>
                <Snippet
                  className="sm:hidden "
                  symbol=""
                  codeString={nft.owner}
                  color="secondary"
                >
                  {nft.owner.slice(0, 6)}
                </Snippet>
                <Snippet
                  className="hidden sm:inline-flex"
                  symbol=""
                  xcodeString={nft.owner}
                  color="secondary"
                >
                  {nft.owner}
                </Snippet>
              </div>
            </div>
            <div className="bg-black-200 p-2.5 rounded">
              <p className="text-darkgray">Price:</p>
              {loadingMarketplace || loadingDirectListing ? (
                <p className="text-xl md:text-3xl font-bold">Loading...</p>
              ) : (
                <>
                  {directListing && directListing[0] ? (
                    (
                      <p className="text-lg md:text-3xl font-bold">
                        {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
                      </p>
                    )
                  ) : auctionListing && auctionListing[0] ? (
                    <p className="text-lg md:text-3xl font-bold">
                      {`${auctionListing[0]?.buyoutCurrencyValue.displayValue} ${auctionListing[0]?.buyoutCurrencyValue.symbol}`}
                    </p>
                  ) : (
                    <p className="text-lg md:text-3xl font-bold">
                      Not for sale
                    </p>
                  )}
                </>
              )}
              {loadingAuction ? (
                <p className="text-gray-100 text-lg md:text-3xl">Loading...</p>
              ) : (
                <>
                  {auctionListing && auctionListing[0] && (
                    <div>
                      <p className="text-darkgray">Bids starting from</p>
                      <p className="text-lg md:text-3xl font-bold">
                        {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="space-y-5 flex flex-col justify-center">
              <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={async () => buyListing()}
                isDisabled={
                  (!auctionListing || !auctionListing[0]) &&
                  (!directListing || !directListing[0])
                }
                style={{
                  backgroundColor: "#1e112a",
                  color: "#9455d3",
                  width: "auto",
                }}
              >
                Buy at asking price
              </Web3Button>
              <p className="text-center text-sm md:text-xl">or</p>
              <div className="container ">
                <div className="flex flex-col justify-center">
                  <Input
                    className="mb-5 text-black "
                    defaultValue={
                      auctionListing?.[0]?.minimumBidCurrencyValue
                        ?.displayValue || 0
                    }
                    type="number"
                    onChange={(e) => setBidValue(e.target.value)}
                  />
                  <Web3Button
                    contractAddress={MARKETPLACE_ADDRESS}
                    action={async () => await createBidOffer()}
                    isDisabled={!auctionListing || !auctionListing[0]}
                    style={{ backgroundColor: "#1e112a", color: "#9455d3" }}
                  >
                    Place Bid
                  </Web3Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const tokenId = context.params?.tokenId;
  const sdk = new ThirdwebSDK("Sepolia");

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nft = await contract.erc721.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const sdk = new ThirdwebSDK("Sepolia");

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
}
