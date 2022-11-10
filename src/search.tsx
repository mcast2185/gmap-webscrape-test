import { GoogleApis, google, customsearch_v1 } from 'googleapis';
import { loadAuth2, gapiComplete} from 'gapi-script';
import {Geolocation} from "@capacitor/geolocation";
import React, {useState, useEffect} from 'react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';




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
const searchEngineId = "a30a9a3e8a7e24f73"
const input = {
  key: apiKey,
  cx: searchEngineId,
  q: "Barber Shops near me",
  start: 1
}




const SearchResults = ({results}: any) => {
  loadAuth2(gapi, clientId, "https://www.googleapis.com/auth/cse").then(res => {return res})
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
      
        return Promise.resolve(response.body);

      } else {
        Promise.reject(response);
        console.error();

      };
      // console.log( typeof response.result);
      
      // const responseQuery = await fetch(
      //   `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`);
      // if (responseQuery.ok){
      //   return Promise.resolve(responseQuery.json());

      // } else {
      //   Promise.reject(responseQuery);
      //   console.error();

      // };
    });
    return handlePromise
  };


  // executeApiQuery().then(res => {
  //   return JSON.parse(JSON.stringify(res))
  // });
  console.log(executeApiQuery());

  
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
      <p>
        heyyy
      </p>
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


 



