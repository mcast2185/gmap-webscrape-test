// import { 
//   IonButton,
//   IonItem, 
//   IonLabel, 
//   IonList, 
//   IonListHeader
// } from '@ionic/react';
// import React from 'react';
// import { loadAuth2} from 'gapi-script';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useLoadScript } from '@react-google-maps/api';


// const clientId = String(process.env.CUSTOM_SEARCH_CLIENT_ID);
// const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);
// const searchEngineId = String(process.env.CUSTOM_SEARCH_ENGINE_ID);
// const API_URL = "http://localhost:5050";

// const input = {
//   key: apiKey,
//   cx: searchEngineId,
//   q: "Barber Shops near me",
//   start: 1
// };

// https://cse.google.com/cse.js?cx=a30a9a3e8a7e24f73
// https://customsearch.googleapis.com/customsearch/v1/
// https://cse.google.com/cse.js?cx=a30a9a3e8a7e24f73
// https://customsearch.googleapis.com/

// const parseAttemptPost = async (res: any, provider: "apple" | "google") => {
//   const data = await axios
//     .post(API_URL + "/data_handler", {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       result: JSON.stringify({
//         provider, res
//       })
//     }, {withCredentials: true})
//     .then((res: any) => res.json());
//   console.log("Result: ", data);
// };
// const libraries: any = ["places", "https://content.googleapis.com/discovery/v1/apis/customsearch"];

// const SearchResults: React.FC | any = () => {  
//   const {isLoaded} = useLoadScript({
//     googleMapsApiKey: apiKey,
//     libraries: libraries
//   });

//   const onLoadClientApi = () => {
//     loadAuth2(gapi, clientId, "https://www.googleapis.com/auth/cse").then(res => {return res});
//     return gapi.load("client", ()=> {
//       gapi.client.setApiKey(apiKey);
//       return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch", "v1");
//     });
//   };

//   const queryHandler = ( async () => {
//     const data = await gapi.client.request({
//       path: `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`,
//       method: "GET",
//       params: input,
//       result: JSON
//     });
//     if (data.status == 200){
//       const data = JSON.parse(data.result);
//       console.log(data);
      

//     } else {
//       console.error("GET request failed");
//       onLoadClientApi();
//     };
    
//   });

//   if (isLoaded) {
//     console.log("script is loaded in search");
    
//   };

//   return (
//     // <div onLoad={() => onLoadClientApi()} >
//     <div >
//       <IonList>
//         <IonListHeader>
//           <IonLabel>Test deconstruct
//             <IonButton onClick={() => queryHandler()}>Click me</IonButton>
//           </IonLabel>
//         </IonListHeader>
//         <IonItem>
//           <IonLabel>Custom search Title Api</IonLabel>
//         </IonItem>
//         <IonItem>
//           <IonLabel>Custom search ratings api</IonLabel>
//         </IonItem>
//         <IonItem>
//           <IonLabel>Custom search directions api</IonLabel>
//         </IonItem>
//         <IonItem>
//           <IonLabel>Custom search contact api</IonLabel>
//         </IonItem>
//       </IonList>
//     </div>
//   );
// };

// export default SearchResults;


import { GoogleApis, google, customsearch_v1 } from 'googleapis';
import { loadAuth2, gapiComplete} from 'gapi-script';
import {Geolocation} from "@capacitor/geolocation";
import React, {useState, useEffect} from 'react';
import { GoogleAuth, GoogleAuthPlugin,  } from '@codetrix-studio/capacitor-google-auth';
import  axios from 'axios';
import { isPlatform } from '@ionic/core';


const clientId = String(process.env.CUSTOM_SEARCH_CLIENT_ID);
const apiKey = String(process.env.CUSTOM_SEARCH_API_KEY);
const searchEngineId = "a30a9a3e8a7e24f73";
const API_URL = "http://localhost:5050"
const input = {
  key: apiKey,
  cx: searchEngineId,
  q: "Barber Shops near me",
  start: 1
}

if (!isPlatform('capacitor')){
  GoogleAuth.initialize({
    clientId: clientId,
    scopes: ["profile", "email", "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest"]
  });
  console.log("GoogleAuth initialized");
};



const SearchResults = ({results}: any) => {

  const executeApiQuery = async () => {
    let data: any = await gapi.client.request({
            path: `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`,
            method: "GET",
            params: input
          })
    if (data.status === 200 ) {
      console.log("Query successful", data.result);
      axios
        .post(API_URL + "/data_handler", {
          kind: data.result.kind,
          context: data.result.context,
          items: data.result.items,
          url: data.result.url,
          queries: data.result.queries
        }, {withCredentials: true})
        .then(res => {
          console.log("Post data: ",res)
          return res.data
        })
        .catch(err => err)
    }


  }

//  let one = () => {
//   console.log(executeApiQuery());
  
//  }

  return (
    <div id="csAPI">
      <button onClick={()=> executeApiQuery()}>click</button>
    </div>
  )
}

export default SearchResults;


 
