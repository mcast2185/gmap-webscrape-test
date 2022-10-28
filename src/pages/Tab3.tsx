import React from 'react';
import ClientOnly from '../components/ApiComponents/ClientSide';
import Search from '../components/ApiComponents/Search';



const Tab3 = () => {
  return (
    <ClientOnly>
      <Search/>
    </ClientOnly>
  )
}

export default Tab3;