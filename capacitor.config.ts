import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.limfei.Usrisan',
  appName: 'Usrisan',
  webDir: 'dist',
  plugins: {
     SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#09111f',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
   },
};

export default config;
