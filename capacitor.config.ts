import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pandagarde.familyhub',
  appName: 'Privacy Panda Family Hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: ['*'],
    cleartext: false
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined
    },
    minVersion: 22,
    targetVersion: 34
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#16a34a',
      showSpinner: false
    }
  }
};

export default config;
