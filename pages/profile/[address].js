import React from "react";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import { useRouter } from "next/router";
import NFTGrid from "@/components/NftGrid";
import Header from "@/components/Header";
import Head from "next/head";

export default function ProfilePage() {
  const router = useRouter();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address
  );

  return (
    <>
      <Head>
        <title>Profile | ROGN | Rupinder Singh</title>
      </Head>
      <Header />
      <div className="mx-auto p-5 flex flex-col items-center gap-1 justify-center h-full w-screen ">
        <h1 className="text-2xl font-bold">Owned NFT(s)</h1>
        <p className="mt-2">
          Browse and manage your NFTs from this collection.
        </p>
        <NFTGrid data={ownedNfts} isLoading={loadingOwnedNfts} />
      </div>
    </>
  );
}
