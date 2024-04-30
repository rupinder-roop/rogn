import { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import {
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/addresses";
import Skeleton from "@/lib/Skeleton";

const NFTComponent = ({ nft }) => {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  const [isListed, setIsListed] =   useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (directListing && directListing[0]) {
      setIsListed(true);
      console.log(directListing)
      setPrice(directListing[0].currencyValuePerToken.displayValue);
    } else if (auctionListing && auctionListing[0]) {
      console.log(auctionListing)
      setIsListed(true);
      setPrice(
        `${auctionListing[0].minimumBidCurrencyValue.displayValue} ${auctionListing[0].minimumBidCurrencyValue.symbol}`
      );
    } else {
      setIsListed(false);
      setPrice(0);
    }
  }, [directListing, auctionListing]);

  const style = {
    wrapper: `bg-[black] flex-auto flex-shrink w-[18rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer relative transition-all duration-300 ease-in-out`,
    wrapperHover: `filter backdrop-blur-sm transition-all duration-300 ease-in-out`,
    imgContainer: `h-full w-full overflow-hidden flex justify-center items-center relative transition-all duration-300 ease-in-out`,
    nftImg: `h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:opacity-50 hover:scale-110 hover:duration-200`,
    details: `absolute bottom-0 right-0 w-full p-3 text-[white] drop-shadow-xl transition-all duration-500 ease-in-out`,
    detailsVisible: `md:opacity-100`,
    // detailsHidden: `opacity-0`,
    price: `flex flex-row justify-end`,
    detailsHidden: `md:opacity-0 md:translate-y-full`,
  };

  return (
    <>
      <div
        className={`${style.wrapper} ${showDetails ? style.wrapperHover : ""}`}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <div className="rounded-lg overflow-hidden">
          <ThirdwebNftMedia
            metadata={nft.metadata}
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="text-lg text-white">Token ID #{nft.metadata.id}</p>
        <p className="font-bold text-slate-200">{nft.metadata.name}</p>

        <div
          className={`${style.details}  ${
            style.price
          } absolute bottom-0 right-0 w-full text-[white] drop-shadow-xl transition-all duration-500 ease-in-out`}
        >
          {loadingDirectListing || loadingAuction ? (
            <div className="text-center">
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            </div>
          ) : isListed ? (
            <div
          className={`${style.details} ${
            showDetails ? style.detailsVisible : style.detailsHidden
          } ${
            style.price
          } absolute bottom-0 right-0 w-full text-[white] drop-shadow-xl transition-all duration-500 ease-in-out`}
        >
            <div className="flex flex-row">
              <p className="p-sm">Price &nbsp;</p>
              <p className="p-sm text-lime-300">{price}</p>
            </div>
            </div>
          ) : (
            <div
          className={`${style.details} ${
            showDetails ? style.detailsVisible : style.detailsHidden
          } ${
            style.price
          } absolute bottom-0 right-0 w-full text-[white] drop-shadow-xl transition-all duration-500 ease-in-out`}
        >
            <div className="flex flex-row">
              <p className="p-sm text-orange-300">Not Listed</p>
            </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NFTComponent;
