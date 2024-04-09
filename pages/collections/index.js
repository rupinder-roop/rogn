import Header from "@/components/Header";
import React, { useEffect, useState, useMemo } from "react";
import { client } from "../../lib/sanityClient";
import MarketCard from "@/components/MarketCard";

const collections = () => {
  // const { collectionId } = router.query;
  const { collectionId } = "0xA5Eb0Ce0bFFCD1923F41FD036EaD74bda2CB7AfC";
  const [collection, setCollection] = useState([]);
  const address=0
  
 // Update your styles with a refined color scheme, typography, and spacing
const style = {
    wrapper: `bg-[#1A1523] min-h-screen `,
    bannerImageContainer: `w-screen overflow-hidden flex-col flex-rev mt-10 justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-full px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4 text-white`,
    createdBy: `text-lg mb-4 text-white`,
    statsContainer: `w-full flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center text-white`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1 text-white`,
    description: `text-[#8a939b] text-xl w-full flex-wrap mt-4 text-white`,
  };
  
  const fetchAddress=['0xA5Eb0Ce0bFFCD1923F41FD036EaD74bda2CB7AfC','0xB81B03b97AED8CC831295764E18DC3353621CdAb']
  
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems"]{
    "imageUrl":profileImage.asset->url,
        "bannerImageUrl":bannerImage.asset->url,
      volumeTraded,createdBy,contractAddress,
      "creator":createdBy->userName,
      title,floorPrice,
      "allOwners":owners[]->,
      description
  }`;

    const collectionData = await client.fetch(query);

    console.log(collectionData, "🔥"); //object

    // the query returns 1 object inside of an array
    setCollection(collectionData);
  };

  useEffect(() => {
    for(let i=0;i<fetchAddress.length;i++){
      fetchCollectionData(fetchAddress[i]);
    }
    
  }, [collectionId]);
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.bannerImageContainer}>
        {collection.map((item, index) => (
          <MarketCard
          key={index}
          bannerImage={item?.bannerImageUrl}
          profileImage={item?.imageUrl}
          title={item?.title}
          description={item?.description}
          createdBy={item?.creator}
          address={item?.contractAddress}
          by={item?.createdBy._ref}
           />
        ))}
      </div>
    </div>
  );
};

export default collections;
