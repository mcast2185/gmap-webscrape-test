import {google, GoogleApis} from 'googleapis';
import {gapi, loadAuth2, gapiComplete} from 'gapi-script';
import {Geolocation} from "@capacitor/geolocation";
import React, {useState, useEffect} from 'react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';



// custom search api key: AIzaSyDTy1ROsgIAaBRBCSYfJJg1FafgyUdLIU4
// search engine id: a30a9a3e8a7e24f73
// custom search clientid: 339917931891-4r4ml1gbsq16rmt3p7cs9tco0lu9i71n.apps.googleusercontent.com
// this is the Oauth scope: https://www.googleapis.com/auth/cse
// the HTTP request: GET https://customsearch.googleapis.com/customsearch/v1?
// the code used to render on HTML: <script async src="https://cse.google.com/cse.js?cx=a30a9a3e8a7e24f73"></script> <div class="gcse-search"></div>


const clientId = "339917931891-4r4ml1gbsq16rmt3p7cs9tco0lu9i71n.apps.googleusercontent.com";
const apiKey = "AIzaSyDTy1ROsgIAaBRBCSYfJJg1FafgyUdLIU4";
const searchEngineId = "a30a9a3e8a7e24f73"





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
    loadAuth2(gapi, clientId, "https://www.googleapis.com/auth/cse").then(res => {return res})
    gapi.load("client", ()=> {
      gapi.client.setApiKey(apiKey);
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest", "v1");
    })
  }


  useEffect(() => {
    loadClientApi();
  });


  const executeApiQuery = async () => {
    const input = {
      key: apiKey,
      cx: searchEngineId,
      q: "Barber Shops near me",
      start: 1
    }
    const responseQuery = await fetch(`https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`)
    return responseQuery.json().then((res) => {
      return res[0]
    })
  }
  // executeApiQuery().then(res => {return res})
  results = executeApiQuery()
  console.log(results);
  
  

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