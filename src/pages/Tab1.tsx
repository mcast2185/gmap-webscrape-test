import React from 'react';
import {useLoadScript} from "@react-google-maps/api";

import Map from '../components/map';

const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);


const Tab1: React.FC = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"]
  });

  if (!isLoaded) return <div>Loading...</div>;


  return (
    <Map/>
  );
};

export default Tab1;