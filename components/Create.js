import React, { useRef, useState } from 'react';
import { MediaRenderer, useAddress } from "@thirdweb-dev/react";
import Header from '@/components/Header';
// import styles from "../styles/Home.module.css";

const Create = () => {
  const address = useAddress();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [mintingNFT, setMintingNFT] = useState(false);

  const styles = {
    container: `w-full max-w-[1440px] h-[80vh] mx-auto flex justify-center items-center`,
    minterContainer: `w-full flex justify-center flex-row -mt-6 h-3/5`,
    heading:"font-medium text-3xl",
    textdef:"font-thin text-lg text-orange-200",
    mintContainerSection: `flex justify-around items-start flex-col mx-4 w-[50%] h-full`,
    fileContainer: `relative rounded-md p-6 flex flex-col justify-center items-center w-full h-full`,
    metadataInput: `h-[48px] w-full rounded-md border-[1px solid #ccc] px-4 text-[1rem] mb-[1rem] bg-[#131313] text-white`,
    mintButton: `py-4 w-full rounded-md border-[1px solid royalblue] mt-8 bg-[#1e112a] text-[#9455d3] cursor-pointer transition-colors duration-200`,
    resetButton: `py-2 w-full rounded-md border-red-20 bg-red-900 text-white mt-6 text-xl cursor-pointer hover:bg-red-600 transition-colors duration-200`};
  

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file); 
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const reset = () => {
    setImageUrl(null);
  };

  const handleMint = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      console.error("No file selected");
      return;
    }
  
    setMintingNFT(true);
    try {
      const formData = new FormData();
      formData.append('name', nftName);
      formData.append('description', nftDescription);
      formData.append('image', fileInputRef.current.files[0]);
      formData.append('address', address || '');
  
      const response = await fetch("/api/mintNFT", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      // Handle successful response
      console.log("NFT minted:", data);
    } catch (error) {
      console.error("Minting error:", error);
    } finally {
      alert("NFT minted!");
      setMintingNFT(false);
      setImageUrl(null);
      setNftName("");
      setNftDescription("");
    }
  };
  

  return (<>
  <Header />
    <div className={styles.container}>
      {address ? (
        <div className={styles.minterContainer}>
          <div className={styles.mintContainerSection}>
            <h1 className={styles.heading}>NFT Media</h1>
            <div 
              className={styles.fileContainer} 
              onClick={handleFileSelect}
            >
              <input
                type="file" 
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              {!imageUrl ? (
                <div
                  style={{ 
                    border: '2px double grey', 
                    padding: '20px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',    
                  }}
                >
                  <p>Click to add file</p>
                </div>
              ) : (
                <div style={{ height: "100%" }}>
                  <MediaRenderer
                    src={imageUrl}
                    height='100%'
                    width='100%'
                  />
                  <button 
                    onClick={reset}
                    className={styles.resetButton}
                  >Reset</button>
                </div>
              )}
            </div>
          </div>
          <div className={`h-[29.5rem] ${styles.mintContainerSection}`}>
            <h1 className={styles.heading}>NFT Metadata</h1>
            <p className={styles.textdef}>NFT Name:</p>
            <input 
              type="text"
              placeholder="My NFT Name"
              onChange={(e) => setNftName(e.target.value)}
              value={nftName}
              className={styles.metadataInput}
            />
            <p className={styles.textdef}>NFT Description:</p>
            <input 
              type="text"
              placeholder="This NFT is about..."
              onChange={(e) => setNftDescription(e.target.value)}
              value={nftDescription}
              className={styles.metadataInput}
            />
            <button
              className={styles.mintButton}
              onClick={handleMint}
              disabled={mintingNFT}
            >{mintingNFT ? "Minting NFT..." : "Mint NFT"}</button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className={styles.heading}>Sign in to mint an NFT</h1>
        </div>
      )}
    </div>
    </>
  );
};

export default Create;
