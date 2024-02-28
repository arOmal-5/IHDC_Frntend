import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// # REMOTE ONE


const firebaseConfig = {
  apiKey: "AIzaSyC5mnnM8o2gQJ-qCNxtmrFSNFZ7k8ovljs",
  authDomain: "ihdc-community.firebaseapp.com",
  projectId: "ihdc-community",
  storageBucket: "ihdc-community.appspot.com",
  messagingSenderId: "773009942738",
  appId: "1:773009942738:web:d298538d07cb5dbb47250b",
  measurementId: "G-2XGGLSY8J3"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDQnhqrD2O4wH6xNk2tg6WgVCQDQBGe8jA",
//   authDomain: "affiliate-phone-otp.firebaseapp.com",
//   projectId: "affiliate-phone-otp",
//   storageBucket: "affiliate-phone-otp.appspot.com",
//   messagingSenderId: "1063066458925",
//   appId: "1:1063066458925:web:e74d2f0b9c9af4b226d1a4",
//   measurementId: "G-4XZBWT56CL"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDyuLsP0UruFVVdTpk4jQRKJO5xtQi3NT0",
//   authDomain: "olx-p-32ea4.firebaseapp.com",
//   projectId: "olx-p-32ea4",
//   storageBucket: "olx-p-32ea4.appspot.com",
//   messagingSenderId: "904135096310",
//   appId: "1:904135096310:web:45654b0096ca157e2239d7",
//   measurementId: "G-1GLJKFC8JG"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyADp1lOS95LL4tf2xYw9m0fRzy8SP9YkMw",
//   authDomain: "ihdc2-ba22b.firebaseapp.com",
//   projectId: "ihdc2-ba22b",
//   storageBucket: "ihdc2-ba22b.appspot.com",
//   messagingSenderId: "755492614634",
//   appId: "1:755492614634:web:99dde4465eb44acf010293"
// };


// const firebaseConfig = {
//   apiKey: "AIzaSyA_LqjOXfNYztv5VSTuaASdOz5NlfTqWJE",
//   authDomain: "find-c0199.firebaseapp.com",
//   projectId: "find-c0199",
//   storageBucket: "find-c0199.appspot.com",
//   messagingSenderId: "690553601916",
//   appId: "1:690553601916:web:5f7206ae166e409e926ef9",
//   measurementId: "G-L9B700ER9L"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCiqR-BVBYYTBXTG7-DjZvbTjnwjYHZ_EU",
//   authDomain: "ihdc-a626e.firebaseapp.com",
//   projectId: "ihdc-a626e",
//   storageBucket: "ihdc-a626e.appspot.com",
//   messagingSenderId: "611548612716",
//   appId: "1:611548612716:web:8d46d9c5ace6ae8b6a7049",
//   measurementId: "G-Z7Y1JP0266"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCiqR-BVBYYTBXTG7-DjZvbTjnwjYHZ_EU",
//   authDomain: "ihdc-a626e.firebaseapp.com",
//   projectId: "ihdc-a626e",
//   storageBucket: "ihdc-a626e.appspot.com",
//   messagingSenderId: "611548612716",
//   appId: "1:611548612716:web:6780f6bc7b83af0f6a7049",
//   measurementId: "G-MZYMG6LC3E"
// };





const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);









// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyCiqR-BVBYYTBXTG7-DjZvbTjnwjYHZ_EU",
//   authDomain: "ihdc-a626e.firebaseapp.com",
//   projectId: "ihdc-a626e",
//   storageBucket: "ihdc-a626e.appspot.com",
//   messagingSenderId: "611548612716",
//   appId: "1:611548612716:web:8d46d9c5ace6ae8b6a7049",
//   measurementId: "G-Z7Y1JP0266"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
