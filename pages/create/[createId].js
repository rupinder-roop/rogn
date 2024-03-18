import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Header from "@/components/Header";

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
  title: `text-5xl  font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Create = () => {
  const [nftData, setNftData] = useState({
    title: '',
    description: '',
    image: '',
    attributes: [],
    // Add more fields as needed for NFT creation
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData({
      ...nftData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nftData)
    // Implement NFT creation logic using web3 here
    // Example: Call a function to create NFT on blockchain
  };
  const router = useRouter();
  const address = useAddress();
  const { contract } = useContract(
    "0xfd1f10f31759a9d0B63DcfD55f70b286140D1B77",
    "marketplace-v3"
  );

  return (
    <>
      <Header></Header>
      
      <div className={style.infoContainer}>
      <form onSubmit className={style.statsContainer}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={nftData.title}
          onChange={handleInputChange}
          className={style.title}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={nftData.description}
          onChange={handleInputChange}
          className={style.description}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            // Handle image upload
          }}
        />
        {/* Add more input fields for NFT attributes */}
        <button type="submit" className={style.socialIconsContent} onClick={handleSubmit}>Create NFT</button>
      </form>
    </div>
    </>
  );
};

export default Create;
