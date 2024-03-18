import { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Router from 'next/router'

const style = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
}

const NFTCard = ({ nftItem, title, listings,provider }) => {
  // console.log(nftItem.metadata)
  const item=nftItem.metadata;
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)

  console.log(listings,"listings----NFT CARD-");
  useEffect(() => { 
    if(listings && listings.length>0){
    const listing = listings.find((data) => data.asset.id === item.id)  
    if (Boolean(listing)) {
      // console.log(listing.currencyValuePerToken.displayValue)
      setIsListed(true)
      setPrice(listing.currencyValuePerToken.displayValue)
    }
  }
  }, [listings, item])

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        Router.push({
          pathname: `/nfts/${item.id}`,
          query: { isListed: isListed },
        })
      }}
    >
      <div className={style.imgContainer}>
        <img src={item.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{item.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                  alt="eth image"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
        <div className={style.likes}>
          <span className={style.likeIcon}>
            <BiHeart />
          </span>{' '}
          {nftItem.likes}
        </div>
      </div>
    </div>
  )
}

export default NFTCard
