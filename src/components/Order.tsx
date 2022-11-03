import React, { 
  useCallback,
  useEffect, 
  useLayoutEffect, 
  useMemo, 
  useReducer, 
  useRef, 
  useState 
} from 'react';
// import { 
//   GoogleMap, 
//   Autocomplete,
//   useJsApiLoader
// } from "@react-google-maps/api";
import {Geolocation} from "@capacitor/geolocation";
import { 
  IonContent, 
  IonButton, 
  IonInput, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonListHeader
} from '@ionic/react';

import {
  LatLit,
  DirectionsResult,
  MapOptions
} from './Type';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  Filesystem,
  Directory,
  Encoding
} from '@capacitor/filesystem';
import {gapi, loadAuth2} from 'gapi-script'




// custom search api key: AIzaSyDTy1ROsgIAaBRBCSYfJJg1FafgyUdLIU4
// search engine id: a30a9a3e8a7e24f73
// custom search clientid: 339917931891-4r4ml1gbsq16rmt3p7cs9tco0lu9i71n.apps.googleusercontent.com
// this is the Oauth scope: https://www.googleapis.com/auth/cse
// the HTTP request: GET https://customsearch.googleapis.com/customsearch/v1?
// the code used to render on HTML: <script async src="https://cse.google.com/cse.js?cx=a30a9a3e8a7e24f73"></script> <div class="gcse-search"></div>

const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);
const clientId = "910305720717-7886debvklf4mkpmg9rdu93h71elsns0.apps.googleusercontent.com";

const Order: React.FC = () => {
  loadAuth2(gapi,clientId, "https://apis.google.com/js/platform.js?onload=init").then(res => {return res})
  // GoogleAuth.initialize({
  //   'clientId': clientId
  // });




  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const myLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
    return;
  };
  myLocation().then(res => {
    return res
  });

  
  useEffect(() => {
    const gapiCall = () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        scope: 'https://www.googleapis.com/auth/cloud-platform',
      })
    };

    gapi.load("client:auth2", gapiCall)
  })

  



  return (
    <IonList>
    <IonListHeader>
      <IonLabel>Video Games</IonLabel>
    </IonListHeader>
    <IonItem>
      <IonLabel>Pokémon Yellow</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel>Mega Man X</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel>The Legend of Zelda</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel>Pac-Man</IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel>Super Mario World</IonLabel>
    </IonItem>
  </IonList>
  )
}


export default Order;

