import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyDtKtCjmDGio_3jsEqsI0cIleqndvD4pJg",
  authDomain: "georgsgame-3d44e.firebaseapp.com",
  projectId: "georgsgame-3d44e",
  storageBucket: "georgsgame-3d44e.appspot.com",
  messagingSenderId: "768069468543",
  appId: "1:768069468543:web:2b5b620699311106775a4a"
};

ReactDOM.unstable_createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
);

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
