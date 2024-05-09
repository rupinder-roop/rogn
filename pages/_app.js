import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  ThirdwebProvider,
  metamaskWallet,
  localWallet,
  coinbaseWallet,
  useSigner,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingData from "@/assets/loading.json";
import Lottie from "lottie-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, 500);

      return () => clearTimeout(timer);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
      setShowLoader(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ThirdwebProvider
            activeChain={Sepolia}
            clientId="27b2951bace39a4489643398630600f8"
            secretKey="uv2R0GdqwO9VYAqevhoiztsNp_3qiCNzrilGfu5h8SG3tSxIsVz2VauP9HP7YgKW-r3QIU9PCknPtUwIJa_Thw"
            supportedWallets={[
              metamaskWallet({ recommended: true }),
              coinbaseWallet(),
              localWallet(),
            ]}
          >
            {loading && showLoader ? (
              <div className="flex justify-center items-center h-screen w-screen overflow-hidden top-0 z-50 bg-black">
                <Lottie animationData={LoadingData} />
              </div>
            ) : (
              <>
                <Component {...pageProps} />
                <Analytics />
                <SpeedInsights />
              </>
            )}
          </ThirdwebProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}

//security key :- uv2R0GdqwO9VYAqevhoiztsNp_3qiCNzrilGfu5h8SG3tSxIsVz2VauP9HP7YgKW-r3QIU9PCknPtUwIJa_Thw
