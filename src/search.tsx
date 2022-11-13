import { 
  IonItem, 
  IonLabel, 
  IonList, 
  IonListHeader
} from '@ionic/react';
import React from 'react';
import { loadAuth2} from 'gapi-script';

const clientId = String(process.env.CUSTOM_SEARCH_CLIENT_ID);
const apiKey = String(process.env.CUSTOM_SEARCH_API_KEY);
const searchEngineId = String(process.env.CUSTOM_SEARCH_ENGINE_ID);
const input = {
  key: apiKey,
  cx: searchEngineId,
  q: "Barber Shops near me",
  start: 1
};


const SearchResults: React.FC = () => {  

  // const onLoadClientApi = () => {
  //   loadAuth2(gapi, clientId, "https://www.googleapis.com/auth/cse").then(res => {return res});
  //   gapi.client.setApiKey(apiKey);
  //   return gapi.load("client", ()=> {
  //     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch", "v1");
  //   });
  // };

  const queryHandler = ( async () => {
    const response = await gapi.client.request({
      path: `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`,
      method: "GET",
      params: input,
      body: JSON
    });
    if (response.status == 200){
      return JSON.parse(response.body);

    } else {
      console.error("GET request failed");
      // onLoadClientApi();
    };
  });

  return (
    <div >
    {/* <div onLoad={() => onLoadClientApi()} > */}
      <IonList>
        <IonListHeader>
          <IonLabel>Test deconstruct</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel>Custom search Title Api</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Custom search ratings api</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Custom search directions api</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Custom search contact api</IonLabel>
        </IonItem>
      </IonList>
    </div>
  );
};

export default SearchResults;