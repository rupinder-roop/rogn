import "@/styles/globals.css";
// import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import {
  ThirdwebProvider,
  metamaskWallet,
  localWallet,
  coinbaseWallet,
  walletConnect,
  zerionWallet,
} from "@thirdweb-dev/react";

const supportedChainIds = [5];
const connectors = {
  injected: {},
};
export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
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
