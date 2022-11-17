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
//   const response = await axios
//     .post(API_URL + "/data_handler", {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         provider, res
//       })
//     }, {withCredentials: true})
//     .then((res: any) => res.json());
//   console.log("Result: ", response);
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
//     const response = await gapi.client.request({
//       path: `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`,
//       method: "GET",
//       params: input,
//       body: JSON
//     });
//     if (response.status == 200){
//       const data = JSON.parse(response.body);
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
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import  axios from 'axios';




// by loading the api and checking it with an if statement we were able to chain that along with a .then method
// that allowed us to request from our gapi. we now have access to the results.
// <span class="MvDXgc">   // document.querySelector("#tsuid_32 > div > div > div > a > div > div > div:nth-child(2) > span")



// custom search api key: AIzaSyDTy1ROsgIAaBRBCSYfJJg1FafgyUdLIU4
// search engine id: a30a9a3e8a7e24f73
// custom search clientid: 339917931891-4r4ml1gbsq16rmt3p7cs9tco0lu9i71n.apps.googleusercontent.com
// this is the Oauth scope: https://www.googleapis.com/auth/cse
// the HTTP request: GET https://customsearch.googleapis.com/customsearch/v1?
// the code used to render on HTML: <script async src="https://cse.google.com/cse.js?cx=a30a9a3e8a7e24f73"></script> <div class="gcse-search"></div>


const clientId = "339917931891-4r4ml1gbsq16rmt3p7cs9tco0lu9i71n.apps.googleusercontent.com";
const apiKey = "AIzaSyDTy1ROsgIAaBRBCSYfJJg1FafgyUdLIU4";
const searchEngineId = "a30a9a3e8a7e24f73";
const API_URL = "http://localhost:5050"
const input = {
  key: apiKey,
  cx: searchEngineId,
  q: "Barber Shops near me",
  start: 1
}




const SearchResults = ({results}: any) => {

  const loadClientApi = () => {
    loadAuth2(gapi, clientId, "https://www.googleapis.com/auth/cse").then(res => {return res});
    return gapi.load("client", ()=> {
      gapi.client.setApiKey(apiKey);
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest", "v1");
    });
  };

  const executeApiQuery = () => {
    const handlePromise = new Promise((res, rej) => {
      res((res: any) => {
        if (res.ok){
          return loadClientApi();

        } else {
          rej((err: any) => {
            console.error(err);
          });
        };
      });
    }).then( async () => {
      const response = await gapi.client.request({
        path: `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`,
        method: "GET",
        params: input 
      }) 
      if (response.status == 200){
      console.log( response.body);
      // return Promise.resolve(response.body);
      const post = await axios
        .post(API_URL + "/data_handler");
      return post
      } else {
        Promise.reject(response);
        console.error();

      };
    });
    return handlePromise;
  };


  // executeApiQuery().then(res => {
  //   return JSON.parse(JSON.stringify(res))
  // });

  
    // let queryHandler = JSON.stringify(res).normalize()
    // const queryParse = JSON.parse(queryHandler)
    // return Object.values(queryParse).forEach(el => {
    //   if (el === undefined) {
    //     el = Symbol(el).description?.substring(0)
    //     queryResults.push(el)
    //   }
    // })
    

  // console.log(queryResults.entries().next());
  

  
  

  // queryResults.forEach(el => {
  //   queryResults.at(el)
  //   console.log(String(queryResults.at(el)));
  //   return String(queryResults.at(1))
  // })
  // console.log(queryResults)
  
  

  return (
    <div id="csAPI">
      <button onClick={()=> executeApiQuery()}>click</button>
    </div>
  )
}

export default SearchResults;

// export async function getServerSideProps({key,cx,q,start}: any) {
//   const responseQuery = await customSearch.cse.list({
//     key: apiKey,
//     cx: searchEngineId,
//     q: "Barber Shops near me",
//     start: 1
//   }).then(response => {

//     if (response) {
//       console.log(response.data);
//     }
//     return response.data
//   });
//   return {
//     props: {
//       results: responseQuery
//     }
//   }
// }


 
