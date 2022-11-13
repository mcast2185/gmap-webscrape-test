import {
  IonApp,
  IonIcon,
  IonTabs,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  setupIonicReact,
  isPlatform
} from '@ionic/react';
import React, { 
  Component, 
  useState, 
  useEffect 
} from 'react';
import { Route } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import { IonReactRouter } from '@ionic/react-router';
import { search, home, trophy } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { gapi } from 'gapi-script';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';



////


// what we are aiming to do here in the app componenet is figure out whats the best functionality
// we can execute to initialize our script, scope, client id and api key to the session.
// as for whats going to be displayed here, we are aiming to deploy the login for both apple and google.
// the component containing those logins should be placed within a conditional stating that as long as there
// is no one successfully logged in that jsx can be rendered, once logged we fade them out to black.


////




setupIonicReact();

const clientId = String(process.env.CLIENT_ID);
const apiKey = String(process.env.REACT_APP_GOOGLE_API_KEY);
const libraries: any = ["places", "customsearch" ];

!isPlatform("capacitor") ? GoogleAuth.initialize({
  clientId: clientId,
  scopes: ["profile", "email", "https://www.googleapis.com/auth/cse"]
}) : console.log("GoogleAuth failed to initialize");
 
const loadGoogleScript = () => {
  if (!document.querySelector("gapiScript")) {
    const script = document.createElement("script");
    script.setAttribute('id', 'gapiScript');
    script.src = `"https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap"`;
    script.onload = () => {
      console.log("Script is loaded");
    };
    document.head.appendChild(script);
  } else if (document.querySelector("gapiScript")) {
    console.log("Script already exist");
  };
  return;
};


const App: Component | any = () =>{
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries
  });

  const onLoadClientApi = () => {
    gapi.client.setApiKey(apiKey);
    return gapi.load("client", ()=> {
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch", "v1");
    });
  }; 


  if (isLoaded) {
    console.log("useLoadScript() was successfully called.");
    return loadGoogleScript();
  } else if (!isLoaded) {

    return;
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route exact path="/tab3">
              <Tab3 />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={search} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={trophy} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;