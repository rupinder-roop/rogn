import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { ThirdwebSDK} from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage.js'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = ({provider}) => {
//   const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  const nftModule = useMemo(async () => {
    // if (!provider) return

    const sdk = new ThirdwebSDK(
        Sepolia,
        "https://sepolia.infura.io/v3/d52ef0a36cbf4e1fbdcca4b00cc4bc67"
      );
      const contract = await sdk.getContract("0xA5Eb0Ce0bFFCD1923F41FD036EaD74bda2CB7AfC");
    return contract.erc721.getAll();
  }, [])
  

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    (async () => {
        console.log()
      const nfts = await nftModule
      const selectedNftItem = nfts.find((nft) => nft.metadata.id === router.query.nftId) 

      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(async () => {
    // if (!provider) return

    const sdk = new ThirdwebSDK(
      Sepolia,
      'https://sepolia.infura.io/v3/d52ef0a36cbf4e1fbdcca4b00cc4bc67'
    )
    
    const contract = await sdk.getContract("0xfd1f10f31759a9d0B63DcfD55f70b286140D1B77");
    return await contract.directListings.getAll();
  }, [])

  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings( await marketPlaceModule)
    })()
  }, [])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
