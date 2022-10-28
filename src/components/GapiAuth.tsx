
import { IonItem, IonContent } from '@ionic/react';
import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet';

// const clientId = String(process.env.ClIENT_ID);

// const GapiAuth = () => {
//   const onLoad = () => {
//     gapi.client.load("client:auth2", "v3", function() {
//       gapi.auth.authorize({
//         client_id: clientId
//       }, () => gapi.client.getToken())
//     });
//   };

//   useEffect(() => {
//     console.log(onLoad());
//     onLoad();
//   });

//   return (
//     <Helmet>
//       <script src="https://apis.google.com/js/platform.js?onload=onLoad"/>
//     </Helmet>
//   )
// };

// export default GapiAuth;