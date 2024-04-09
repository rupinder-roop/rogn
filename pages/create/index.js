import React from 'react'

import { useContract,useNFTs } from '@thirdweb-dev/react'
import { NFT_COLLECTION_ADDRESS } from '..'


const index = () => {
  const {contract}= useContract(NFT_COLLECTION_ADDRESS);
  const {data,isLoading}=useNFTs(contract);
  return (
    <div>
      nft:- 
      {/* < data={data} /> */}
    </div>
  )
}

export default index
