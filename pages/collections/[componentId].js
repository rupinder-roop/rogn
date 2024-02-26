import { useRouter } from 'next/router';
import React from 'react';


const collection = () => {
    const router=useRouter();
  return (

    <div>collection{router.query.componentId}</div>
  )
}

export default collection;