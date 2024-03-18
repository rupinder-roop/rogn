import "@/styles/globals.css";
// import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { Sepolia } from "@thirdweb-dev/chains";
import { ethers } from "ethers";

import {
  ThirdwebProvider,
  metamaskWallet,
  localWallet,
  coinbaseWallet,
  useSigner
} from "@thirdweb-dev/react";
export default function App({ Component, pageProps }) {
  // const signer = useSigner();
  // console.log(signer);
 

  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      // signer={useSigner()}
      clientId="27b2951bace39a4489643398630600f8"
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
        localWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

//security key :- uv2R0GdqwO9VYAqevhoiztsNp_3qiCNzrilGfu5h8SG3tSxIsVz2VauP9HP7YgKW-r3QIU9PCknPtUwIJa_Thw
