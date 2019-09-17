import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCzSM-EZ1QgSfe3178_aX_KEYefMvedI7U",
    authDomain: "itrade-8e6c0.firebaseapp.com",
    databaseURL: "https://itrade-8e6c0.firebaseio.com",
    projectId: "itrade-8e6c0",
    storageBucket: "itrade-8e6c0.appspot.com",
    
    messagingSenderId: "176181488819",
    appId: "1:176181488819:web:9fdb416e67a6e7fc78d4c6"
};

/*const devConfig = {
    apiKey: "***************",
    authDomain: "***************",
    databaseURL: "***************",
    projectId: "***************",
    storageBucket: "***************",
    messagingSenderId: "***************"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;
*/
export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();