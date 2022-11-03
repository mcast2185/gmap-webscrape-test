import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
    scopes: ["profile","email", "BigQuery"],
    serverClientId: "910305720717-7886debvklf4mkpmg9rdu93h71elsns0.apps.googleusercontent.com",
    forceCodeForRefreshToken: true
    }
  }
};

export default config;
