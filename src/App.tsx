import {
  IonApp,
  IonIcon,
  IonTabs,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  setupIonicReact,
  isPlatform,
  IonContent,
  IonItem
} from '@ionic/react';
import React, { 
  useMemo,
  Component, 
  useState, 
  useEffect 
} from 'react';
import { Route } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import { IonReactRouter } from '@ionic/react-router';
import { search, home, trophy } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


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
import Dashboard from './pages/Dashboard';
import { gapi } from 'gapi-script';



////


// what we are aiming to do here in the app componenet is figure out whats the best functionality
// we can execute to initialize our script, scope, client id and api key to the session.
// as for whats going to be displayed here, we are aiming to deploy the login for both apple and google.
// the component containing those logins should be placed within a conditional stating that as long as there
// is no one successfully logged in that jsx can be rendered, once logged we fade them out to black.


////




setupIonicReact();
  
const clientId = String(process.env.CUSTOM_SEARCH_CLIENT_ID);
const apiKey = String(process.env.CUSTOM_SEARCH_API_KEY);
const libraries: any = ["places"];
const scriptSource = "https://apis.google.com/js/client.js";
// const scriptSource = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;


// this should be a redux function-->
const loadGoogleScript = ({src, id, onLoad}: any) => {
  const exist = document.getElementById(id)
  if (exist) {
    console.log("Script already exist: App*");
    return;
  } else {
    const script = document.createElement("script");
    script.setAttribute("id", id);
    script.src = src;
    script.defer = true;
    script.onload = () => {
      onLoad && onLoad();
      console.log("Script is loaded: App*");
    };
    // console.log(document.head.appendChild(script));

    document.head.appendChild(script);
  }
};
// --|

const App: Component | any = () =>{
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries
  });

  
  useEffect(()=> {
    const start = () => {
      GoogleAuth.initialize({
        clientId: clientId,
        scopes: ["profile", "email"]
      })
    };

    gapi.load('client:auth2', start);

  })

  if (isLoaded) {
    loadGoogleScript({
      src: scriptSource,
      id: 'gapiScript',
      onLoad: () => console.log("Places library is loaded: App*"),
    });
  } else {
    console.log("Libraries are not loaded");
  };

  return (
  <IonApp>
    {/* <IonContent style={{zIndex: "50"}} >
      <Dashboard/>
    </IonContent> */}
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

export default React.memo(App);