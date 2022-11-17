import React from 'react';
import {
  IonPage,
  isPlatform,
  IonHeader,
  IonTitle,
  IonButton,
  IonIcon,
  IonCard
} from '@ionic/react';
import { logoApple, logoGoogle } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {SignInWithApple} from '@capacitor-community/apple-sign-in';
import axios from "axios";
import { gapi } from 'gapi-script';
import config from '../../capacitor.config';



const clientId = String(process.env.CLIENT_ID);
const API_URL = "http://localhost:5050";
const API_URL_IOS = "capacitor://localhost:5050";
const ANDROID = isPlatform('android');
const IOS = isPlatform('ios');

const parseAttemptLogin = async (res: any, provider: "apple" | "google") => {
  const response = await axios
    .post(API_URL + "/login", {
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


const Home: React.FC<{}> = () => {
  if (!isPlatform('capacitor')){
    GoogleAuth.initialize({
      clientId: clientId,
      scopes: ["profile", "email", "maps", "places"]
    });
  };

  const AppleSignIn = async () => {
    await SignInWithApple.authorize()
      .then((res: any) => {
        parseAttemptLogin(res, "apple")
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  const GoogleSignIn = async () => {
    const response = await GoogleAuth.signIn();
    console.log("Google login", response);

    parseAttemptLogin(response, "google");
  };


  return (
    <div>
      <IonHeader collapse="condense">
        <IonTitle size="large">GoogleApi Test</IonTitle>
      </IonHeader>
      <IonCard>
      {IOS && (
        <>
        <IonButton expand='block' onClick={AppleSignIn}>
          <IonIcon slot='start' icon={logoApple}/>
            Login With Apple
        </IonButton>
        </>
      )}
      </IonCard>
      <IonCard>
      {ANDROID && (
        <>
        <IonButton expand='block' onClick={GoogleSignIn}>
          <IonIcon slot='start' icon={logoGoogle}/>
            Login With Google
        </IonButton>
        </>
      )}
      </IonCard>
    </div>
  );
};

export default Home;