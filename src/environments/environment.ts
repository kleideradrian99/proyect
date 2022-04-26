// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  firebase: {
    projectId: 'medellin-store',
    appId: '1:497448462970:web:2ae1544e0c617423a469c3',
    storageBucket: 'medellin-store.appspot.com',
    apiKey: 'AIzaSyAMYJk3O_zUMGnIRqtFtedF7k3DSawJ02Q',
    authDomain: 'medellin-store.firebaseapp.com',
    messagingSenderId: '497448462970',
  },
  production: false,
  baseUrlimg:"https://firebasestorage.googleapis.com/v0/b/medellin-store.appspot.com/o/"
};
