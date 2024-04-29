import React from "react";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";
import { useRouter } from "next/router";
import NFTGrid from "@/components/NftGrid";
import Header from "@/components/Header";


export default function ProfilePage() {
  const router = useRouter();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address
  );

  return (
    <>
    <Header />
    
    <div className="mx-auto p-5 flex flex-col items-center gap-1 justify-center h-full w-screen ">
      <h1 className="text-2xl font-bold">Owned NFT(s)</h1>
      <p className="mt-2">
        Browse and manage your NFTs from this collection.
      </p>
      <NFTGrid
        data={ownedNfts}
        isLoading={loadingOwnedNfts}
        // emptyText={"You don't own any NFTs yet from this collection."}
      />
    </div>
    </>
  );
}
