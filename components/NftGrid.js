import React from "react";
import Link from "next/link";
import { NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import NFTComponent from "./nftComponent";
import Skeleton from "@/lib/Skeleton";

export default function NFTGrid({ isLoading, data, overrideOnclickBehavior }) {
  return (
    <div className="grid grid-cols-1 gap-0 mx-4 md:grid-cols-3 lg:grid-cols-5 ">
      {isLoading ? (
        [...Array(10)].map((e) => <Skeleton key={e} />)
      ) : data && data.length > 0 ? (
        data.map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
            >
              <NFTComponent nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFTComponent nft={nft} />
            </div>
          )
        )
      ) : (
        <p className="flex justify-center items-center h-unit-8xl text-center text-xl">
          No NFT Minted...
        </p>
      )}
    </div>
  );
}
