import React, { 
  useCallback,
  useEffect, 
  useLayoutEffect, 
  useMemo, 
  useReducer, 
  useRef, 
  useState 
} from 'react';
import {
  useLoadScript, 
  GoogleMap, 
  Autocomplete
} from "@react-google-maps/api";
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


const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);


const Order = () => {
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
  

  const urlQuery = () => {
    const url = fetch('https://www.google.com/search?q=barber%20shop%20near%20me&oq=barber&aqs=chrome.1.69i57j35i39l2j0i433i457i512j0i402l2j46i175i199i512j0i433i512j46i175i199i512l2.2931j0j7&sourceid=chrome&ie=UTF-8&rflfq=1&tbm=lcl&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e3!2m4!1e2!5m2!2m1!2e9!3sIAE,lf:1,lf_ui:14&ved=2ahUKEwiN2bSL0v36AhVuIDQIHTipCsAQwywoAXoECBQQBg&rlst=f#rlfi=hd:;si:;mv:[[39.871139199999995,-104.95535910000001],[39.769417,-105.0597061]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m5!1u2!3m2!2m1!2e9!4e2!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:14', 
    {  
      method: 'GET',    
      mode: 'no-cors'    
    }
    )
    // url.then((response) => response)
    // .then((data) => console.log(data));
    
  }


  useEffect(() => {
    return urlQuery
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