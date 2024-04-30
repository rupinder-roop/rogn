import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Web3Button,
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../const/addresses";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";

export default function SaleInfo({ nft }) {
  const router = useRouter();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection, isLoading: nftCollectionLoading } = useContract(
    NFT_COLLECTION_ADDRESS
  );;

  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

    async function checkAndProvideApproval() {
        if (typeof nftCollection !== 'object' || !nftCollection) return; // Check if nftCollection is loaded and is an object
        try {
            const hasApproval = await nftCollection?.call("isApprovedForAll", nft.owner, MARKETPLACE_ADDRESS);
    
            if (!hasApproval) {
                const txResult = await nftCollection?.call("setApprovalForAll", MARKETPLACE_ADDRESS, true);
    
                if (txResult) {
                    console.log("Approval provided");
                }
            }
    
            return true;
        } catch (error) {
            console.error("Error occurred while checking and providing approval:", error);
            return false;
        }
    }
      

  const { register: registerDirect, handleSubmit: handleSubmitDirect } =
    useForm({
      defaultValues: {
        nftContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        price: "0",
        startDate: new Date(),
        endDate: new Date(),
      },
    });

  async function handleSubmissionDirect(data) {
    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    });

    return txResult;
  }

  const { mutateAsync: createAuctionListing } =
    useCreateAuctionListing(marketplace);

  const { register: registerAuction, handleSubmit: handleSubmitAuction } =
    useForm({
      defaultValues: {
        nftContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        startDate: new Date(),
        endDate: new Date(),
        floorPrice: "0",
        buyoutPrice: "0",
      },
    });

  async function handleSubmissionAuction(data) {
    await checkAndProvideApproval();
    const txResult = await createAuctionListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      buyoutBidAmount: data.buyoutPrice,
      minimumBidAmount: data.floorPrice,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    });

    return txResult;
  }

  return (
    <>
      {nftCollectionLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex w-[19.5rem] lg:w-[31rem] lg::h-[33rem] flex-col ">
          <Tabs color="secondary" aria-label="Tabs colors" className="text-center items-centers mx-1" radius="full">
            <Tab key="direct" title="Direct Listing" className="">
              <Card>
                <CardBody className="text-orange-200">
                  <div className="p-4 ">
                    <form onSubmit={handleSubmitDirect(handleSubmissionDirect)}>
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          Listing starts on:
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          {...registerDirect("startDate")}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          Listing ends on:
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          {...registerDirect("endDate")}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">Price:</label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          type="float"
                          {...registerDirect("price")}
                        />
                      </div>
                      <Web3Button
                        contractAddress={MARKETPLACE_ADDRESS}
                        action={handleSubmitDirect(handleSubmissionDirect)}
                        onSuccess={() =>
                          router.push(
                            `/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`
                          )
                        }
                      >
                        Create Direct Listing
                      </Web3Button>
                    </form>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="auction" title="Auction Listing">
              <Card>
                <CardBody>
                  <div className="p-4 rounded">
                    <form
                      onSubmit={handleSubmitAuction(handleSubmissionAuction)}
                    >
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          Listing starts on:
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          {...registerAuction("startDate")}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          Listing ends on:
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Select Date and Time"
                          type="datetime-local"
                          {...registerAuction("endDate")}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          Starting bid from:
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="0"
                          type="number"
                          {...registerAuction("floorPrice")}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-semibold mb-2">
                          Buyout price:
                        </label>
                        <input
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="0"
                          type="number"
                          {...registerAuction("buyoutPrice")}
                        />
                      </div>
                      <Web3Button
                        contractAddress={MARKETPLACE_ADDRESS}
                        action={handleSubmitAuction(handleSubmissionAuction)}
                        onSuccess={() =>
                          router.push(
                            `/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`
                          )
                        }
                      >
                        Create Auction Listing
                      </Web3Button>
                    </form>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}
