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

import {} from ""


const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);
const clientId = String(process.env.ClIENT_ID);



const Order: React.FC = () => {
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  // const [jsonText, setJsonText] = useState<any>()
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
        'apiKey': apiKey,
        'clientId': clientId,
        'scope': 'https://www.googleapis.com/auth/cloud-platform',
      })
      .then(() => {
        return gapi.client.request({
          'path': 'https://www.google.com/search?q=barber+shop+near+me',
          'method': "GET"
        })
      })
      .then((response) => {
        console.log(JSON.stringify(response.body));
        }, (err) => {
          console.log('Error: ' + err);
      });
    }
    gapiCall();
    // gapi.client.load('REST', 'v3', gapiCall)
    // gapi.load('Rest', gapiCall)

  });





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


    // await googleApi?.discoverAPI("https://www.google.com/search?q=barber+shop+near+me&oq=barber+shop+near+me&aqs=chrome..69i57j69i59j0i512l8.4644j0j7&sourceid=chrome&ie=UTF-8",     {  
    //   method: 'GET',    
    //   mode: 'no-cors'    
    // }).then(res => {
    //   JSON.stringify(res._options.data)
    // })

    // await gapi.client.setApiKey(apiKey);
    // return gapi.client.load("https://www.google.com/search?q=barber+shop+near+me&oq=barber+shop+near+me&aqs=chrome..69i57j69i59j0i512l8.4644j0j7&sourceid=chrome&ie=UTF-8", "v2")
    //     .then(function() { console.log("GAPI client loaded for API"); },
    //           function(err: any) { console.error("Error loading GAPI client for API", err); });