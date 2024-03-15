import { useEffect, useState } from "react";
import {
  useBuyDirectListing,
  useContract,
  ThirdwebProvider,
  Web3Button,
} from "@thirdweb-dev/react";
import { EmbeddedWallet } from "@thirdweb-dev/wallets";
import { Sepolia } from "@thirdweb-dev/chains";
import { useWeb3 } from "@thirdweb-dev";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const { address, connectWallet } = useWeb3();
  const [selectedMarketNft, setSelectedMarketNft] = useState();
  const [enableButton, setEnableButton] = useState(false);

  useEffect(() => {
    if (account) {
      setConnectedAccount(account);
    }
  }, [account]);
  // console.log(selectedNft,listings)
  const sdk = new ThirdwebSDK(
    Sepolia,
    "https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837"
  );
  const embeddedWallet = new EmbeddedWallet({
    clientId: "27b2951bace39a4489643398630600f8",
    chain: Sepolia, //  chain to connect to
  });

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
          (marketNft) => marketNft.asset?.id === selectedNft.metadata.id
        )
      );
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
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
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listingId, quantityDesired, await module, "david");
    await buyDirectListing({
      listingId: listingId,
      quantityDesired: quantityDesired,
      buyer: await embeddedWallet.getAddress(),
    })
      .then(() => {
        confirmPurchase();
      })
      .catch((error) => console.error(error));

    confirmPurchase();
  };

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === "true" ? (
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
          {/* <Web3Button
          contractAddress={contract}
          action={()=>buyDirectListing({
            listingId:selectedMarketNft.id,
            quantity:1,
          })}
          >
            BUY
          </Web3Button>
           */}
        </div>
      )}
    </div>
  );
};

export default MakeOffer;
