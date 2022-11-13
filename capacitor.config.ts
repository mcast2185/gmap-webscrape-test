import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
    scopes: ["profile","email", "https://www.googleapis.com/auth/cse"],
    serverClientId: "910305720717-7886debvklf4mkpmg9rdu93h71elsns0.apps.googleusercontent.com",
    forceCodeForRefreshToken: true,
    iosClientId: "customsearch-367418",
    androidClientId: "customsearch-367418",
    },
  }
};

export default config;
