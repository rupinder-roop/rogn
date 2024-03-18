import { useEffect, useState } from "react";
import {
  useBuyDirectListing,
  useContract,
  useAddress,
  buyoutListing,
} from "@thirdweb-dev/react";
import { BigNumber } from "@ethersproject/bignumber";

import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const address = useAddress();
  const [purchased, setPurchased] = useState(false);
  const [selectedMarketNft, setSelectedMarketNft] = useState();
  const [enableButton, setEnableButton] = useState(false);

  // console.log(selectedNft,listings)

  const { contract } = useContract(
    "0xfd1f10f31759a9d0B63DcfD55f70b286140D1B77",
    "marketplace-v3"
  );
  const {
    mutateAsync: buyDirectListing,
    isLoading,
    error,
  } = useBuyDirectListing(contract);

  useEffect(() => {
    if (!listings || isListed === "false") return;
    (async () => {
      // console.log(await embeddedWallet.getAddress())

      setSelectedMarketNft(
        listings.find(
          (marketNft) => marketNft.asset?.id === selectedNft.metadata?.id
        )
      );
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    console.log(selectedMarketNft, "----selected,,,,, ", selectedNft?.owner);
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1
  ) => {
    console.log(listingId, quantityDesired, address);
    const id = BigNumber.from(listingId);
    await buyDirectListing({
      listingId: id,
      quantity: 1,
      buyer: address,
    })
      .then(() => {
        setPurchased(true);
      })
      .then(() => {
        confirmPurchase();
      })
      .catch((error) => console.error(error), alert(error));
  };

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === "true"? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null;
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}

      
    </div>
  );
};

export default MakeOffer;
