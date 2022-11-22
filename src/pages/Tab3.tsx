import Map from '../components/GoogleComponents/map';
import { useLoadScript } from '@react-google-maps/api';
import { useEffect } from 'react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { gapi } from 'gapi-script';


const clientId = String(process.env.CUSTOM_SEARCH_CLIENT_ID);
const apiKey = String(process.env.CUSTOM_SEARCH_API_KEY);
const libraries: any = ["places", "geometry"];
const mapScriptSource = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPa1wqOPt0PLcNNASP_r_aZZ1IFVVVcBM&callback=initMap&libraries=places,geometry&solution_channel=GMP_QB_commutes_v2_c`;

const loadGoogleScript = ({src, id, onLoad}: any) => {
  const exist = document.getElementById(id)
  if (exist) {
    console.log("Script already exist");
    return;
  } else {
    const script = document.createElement("script");
    script.setAttribute("id", id);
    script.src = src;
    script.defer = true;
    script.onload = () => {
      onLoad && onLoad();
      console.log("Script is loaded");
    };

    document.head.appendChild(script);
  }
};


const Tab3 = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries
  });


  useEffect(() => {
    loadGoogleScript({
      src: mapScriptSource,
      id: "custom_gmap_distance_matrix",
      onLoad: () => console.log("Distance matrix script is loaded")
    })
  })

  if (!isLoaded) return <div>Loading...</div>;
  return <Map/>

}

export default Tab3;