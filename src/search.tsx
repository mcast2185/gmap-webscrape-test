import { loadAuth2} from 'gapi-script';
import { 
  IonItem, 
  IonLabel, 
  IonList, 
  IonListHeader
} from '@ionic/react';










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


const SearchResults = () => {  
  let arr: any[] = [];


  const test = (obj: any) => {
    const dict: any = {};
    try {
      for (let key in obj) {
        const value = obj[key];
        const type = typeof value;
        if (["string", "boolean"].includes(type) || (type === "number" && !isNaN(value) || !undefined)){
          dict[key] = value;
          debugger;
        } else if ( type === "object") {
          Object.assign(dict, test(value))
          debugger;
        } else if ( type === undefined) {
          Object.assign(dict, test(Object.values(obj)))
          debugger;
        }
      }
    } catch(err) {
      console.log(err);
      
    }
    return dict['title']
  }


  const loadClientApi = () => {
    loadAuth2(gapi, clientId, "https://www.googleapis.com/auth/cse").then(res => {return res});
    gapi.client.setApiKey(apiKey)
    return gapi.load("client", ()=> {
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch", "v1");
    });
  };

  const executeApiQuery = () => {
    const query = new Promise((res, rej) => {
      res((res: any) => {
        if (res.ok){
          return loadClientApi();

        } else {
          rej((err: any) => {
            console.error(err);
          });
        };
      });
    })
    .then( async () => {
      const response: gapi.client.HttpRequest<any> | any = await gapi.client.request({
        path: `https://www.googleapis.com/customsearch/v1?key=${input.key}&cx=${input.cx}&q=${input.q}&start=${input.start}`,
        method: "GET",
        params: input,
        body: JSON
      });
      if (response.status == 200){
        
        // create a function that parses through each of the values response.body returns and loop it through our test function callback
        // the test function we created will have to filter and reassign the types through its loop

        // return test(JSON.parse(response.body))
        Object.values(JSON.parse(response.body)).forEach(el => {
          arr.push(el)
        })
        return JSON.parse(response.body)
      };
    })
    .catch(err => err);
    return query;
  };


  console.log(executeApiQuery());
  console.log(arr);
  

  


  
  



  return (
    <IonList>
    <IonListHeader>
      <IonLabel>Test deconstruct<div>{}</div></IonLabel>
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
  )
}

export default SearchResults;


 



