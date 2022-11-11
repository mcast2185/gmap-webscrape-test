import React from 'react';
import {
  IonPage,
  IonContent,
  isPlatform
} from '@ionic/react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {GoogleLogin, GoogleLogout} from "react-google-login";
import { gapi, loadAuth2 } from 'gapi-script';
import SearchResults from '../search';

const clientId = "910305720717-7886debvklf4mkpmg9rdu93h71elsns0.apps.googleusercontent.com";


const Home: React.FC<{}> = () => {
  // let user: any;
  
  if (!isPlatform('capacitor')){
    GoogleAuth.initialize({
      clientId: clientId,
      scopes: ["profile", "email"]
    });
  };


  // alternative way to sign in, we get back a user object
  // const signIn = async () => {
  //   user = await GoogleAuth.signIn();
  //   console.log("user: ", user);
  // };

  const onSuccess = (res: any) => {
    console.log("Current User: ", res.profileObj);
  };
  const onFailure = (res: any) => {
    console.log("Login failed: ", res);
  };

  // we get back an access and id token
  // const refresh = async () => {
  //   const authCode = await GoogleAuth.refresh();
  //   console.log("refresh: ", authCode);
  // };

  // alternative way to sign out
  // const signOut = async () => {
  //   await GoogleAuth.signOut();
  //   user = null;
  //   console.log("user: signed out");
  // };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <GoogleLogin
          clientId={clientId}
          buttonText="Login to Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
          isSignedIn={true}/>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout of Google"
          onLogoutSuccess={() => 
            console.log("Logged out of Google Account")}/>
      </IonContent>
      <IonContent>
        <SearchResults/>
      </IonContent>
    </IonPage>
  );
};

export default Home;