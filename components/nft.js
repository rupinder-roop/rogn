import React, { useMemo, useEffect, useState } from "react";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import {
  ThirdwebNftMedia,
  useContract,
  useReadContract,
  useAddress,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";

const NFTR = ({ nft }) => {
  const { contract, isLoading } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const data = useValidDirectListings(contract, {
    tokenContract: NFT_COLLECTION_ADDRESS,
    tokenId: nft.metadata.id,
  });
  return (
    <div>
      {contract}
      Buy
      {/* <ThirdwebNftMedia metadata={nft.metadata} height="100%" width="100%" /> */}
    </div>
  );
};

export default NFTR;
