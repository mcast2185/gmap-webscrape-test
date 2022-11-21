import Map from '../components/GoogleComponents/map';
import { useLoadScript } from '@react-google-maps/api';
import { IonSpinner } from '@ionic/react';



const apiKey = String(process.env.CUSTOM_SEARCH_API_KEY);
const libraries: any = ["places"];

const Tab3 = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries
  });
IonSpinner
  if (!isLoaded) return <div>{IonSpinner({duration: 2000})}</div>;
  return <Map/>

}

export default Tab3;