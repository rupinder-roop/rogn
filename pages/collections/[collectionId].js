import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useNFTs,useContract ,useActiveListings,useDirectListings } from "@thirdweb-dev/react";

import { Sepolia } from "@thirdweb-dev/chains";
import { client } from "../../lib/sanityClient";
import Header from "../../components/Header";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import NFTCard from "../../components/NFTCard";

const style = {
  bannerImageContainer: `h-[30vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-fill`,
  infoContainer: `w-screen px-[3.5rem]`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

//infura api sepolia
//https://eth-sepolia.g.alchemy.com/v2/sIo7ED3fUpai0DRLR8_7lqcnGZSa4dH2

const Collection = () => {
  const router = useRouter();
  const { contract } = useContract(
    "0xfd1f10f31759a9d0B63DcfD55f70b286140D1B77",
    "marketplace-v3"
  );
  console.log(contract);
  const {data : webnfts,isLoading}= useDirectListings(contract);
  // console.log(webnfts)
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);

  const nftModule = useMemo(async () => {
    // if (!provider) return

    const sdk = new ThirdwebSDK(
      Sepolia,
      "https://sepolia.infura.io/v3/d52ef0a36cbf4e1fbdcca4b00cc4bc67"
    );
    const contract = await sdk.getContract(collectionId);
    return contract.erc721.getAll();
  }, []);
  // get all NFTs in the collection

  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule;

      setNfts(nfts);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(async () => {
    // if (!provider) return

    const sdk = new ThirdwebSDK(
      Sepolia,
      'https://sepolia.infura.io/v3/d52ef0a36cbf4e1fbdcca4b00cc4bc67'
    )
    
    const contract = await sdk.getContract("0xfd1f10f31759a9d0B63DcfD55f70b286140D1B77");
    console.log(contract.directListings);
    return await contract.directListings.getAll();
  }, [])

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return;
    (async () => {
      setListings(await marketPlaceModule);
    })();
  }, []);


  // const query = `*[_type == "marketItems" && contractAddress == "0xA5Eb0Ce0bFFCD1923F41FD036EaD74bda2CB7AfC"]{
  //   "imageUrl":profileImage.asset->url,
  //       "bannerImageUrl":bannerImage.asset->url,
  //     volumeTraded,createdBy,contractAddress,
  //     "creator":createdBy->userName,
  //     title,floorPrice,
  //     "allOwners":owners[]->,
  //     description
  // }`;

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  // return <div>collection {router.query.collectionId}</div>;
  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by{" "}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              {/* <div className={style.statValue}>0</div> */}
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ""}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="flex flex-wrap ">
          {webnfts && nfts.map((nftItem, id) => (
            <NFTCard
              key={id}
              nftItem={nftItem}
              title={collection?.title}
              listings={listings}
            />
          ))}
      </div>
    </div>
  );
};

export default Collection;
