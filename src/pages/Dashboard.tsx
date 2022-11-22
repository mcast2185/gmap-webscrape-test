import React, { useState } from 'react';
import {
  isPlatform,
  IonButton,
  IonIcon,
  IonCard,
  IonContent,
  IonPage,
  IonHeader,
  IonCardContent
} from '@ionic/react';
import { logoApple, logoGoogle } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {SignInWithApple} from '@capacitor-community/apple-sign-in';
import axios from "axios";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';


const clientId = "339917931891-4r4ml1gbsq16rmt3p7cs9tco0lu9i71n.apps.googleusercontent.com";
const API_URL = "http://localhost:5050";
const API_URL_IOS = "capacitor://localhost:5050";
const ANDROID = isPlatform('android');
const IOS = isPlatform('ios');


const parseAttemptLogin = async (res: any, provider: "apple" | "google") => {
  const response = await axios
    .post(API_URL_IOS + "/login", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider, res
      })
    }, {withCredentials: true})
    .then((res: any) => res.json());
  console.log("Result: ", response);
};


const Dashboard: React.FC<{}> = () => {
  const [googleAccessToken, setAccessToken] = useState()
  useEffect(()=> {
    const start = () => {
      GoogleAuth.initialize({
        clientId: clientId,
        scopes: ["profile", "email"]
      })
    };
    gapi.load('client:auth2', start);

  })

  // Appears with IOS devices
  const AppleSignIn = async () => {
    await SignInWithApple.authorize({clientId: "io.ionic.starter", redirectURI: "capacitor://localhost:5050"})
    .then((res: any) => {
        parseAttemptLogin(res, "apple")
      })

  }
  
  // Appears with Android devices
  const GoogleSignIn = async () => {
    const response = await GoogleAuth.signIn();
    console.log("Google login", response);

    parseAttemptLogin(response, "google");
  };

  // alternative way to sign in, we get back a user object
  const signIn = async () => {
    let user = await GoogleAuth.signIn();
    console.log("user: ", user);
  };

  const onSuccess = (res: any) => {
    setAccessToken(res.accessToken);
    // console.log("Current User: ", res.profileObj);
  };
  const onFailure = (res: any) => {
    console.log("Login failed: ", res);
  };

  // we get back an access and id token
  const refresh = async () => {
    const authCode = await GoogleAuth.refresh();
    console.log("refresh: ", authCode);
  };

  // alternative way to sign out
  const signOut = async () => {
    await GoogleAuth.signOut();
    let user = null;
    console.log("user: signed out");

  };

  const test = () => {
    console.log(googleAccessToken);
  }

  return (
    <IonContent>
      <IonCard className="ion-padding" style={{width: "400px", height: "250px"}}>
        <IonCardContent>
          <IonHeader>Google Sign-in</IonHeader>
          <IonButton type="button" onClick={()=> signIn()}>
            <IonIcon slot='start' icon={logoGoogle}/>
              Login With Google
          </IonButton>
        </IonCardContent>
        <IonCardContent>
          <IonHeader>Apple Sign-in</IonHeader>
          <IonButton type="button" onClick={AppleSignIn}>
            <IonIcon slot='start' icon={logoApple}/>
              Login With Apple
          </IonButton>
          <IonButton type="button" onClick={()=> test()}>
            <IonIcon slot='start' icon={logoApple}/>
            test
          </IonButton>
        </IonCardContent>
      </IonCard>

        <IonContent className="ion-padding">
          <IonCard>
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
          </IonCard>
        </IonContent>



        {IOS && (
          <IonButton expand='block' onClick={AppleSignIn}>
            <IonIcon slot='start' icon={logoApple}/>
              Login With Apple
          </IonButton>

        )}


        {ANDROID && (
          <IonButton expand='block' onClick={GoogleSignIn}>
            <IonIcon slot='start' icon={logoGoogle}/>
              Login With Google
          </IonButton>

        )}

    </IonContent>
  );
};

export default Dashboard;
