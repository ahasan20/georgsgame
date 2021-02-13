import React from "react";
import { render } from "react-dom";
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import "firebase/firestore";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore
} from "reactfire";

/**
 * Add your own Firebase config to watch the burrito status
 * update in real time!
 *
 * Once you add your config, go to the Firestore tab of the
 * Firebase console and create a collection called
 * "tryreactfire", and create a document inside that
 * collection called "burrito" with key "yummy"
 * and value "good" or "bad"
 */
const firebaseConfig = {
  apiKey: "AIzaSyDtKtCjmDGio_3jsEqsI0cIleqndvD4pJg",
  authDomain: "georgsgame-3d44e.firebaseapp.com",
  databaseId: "georgsgame-3d44e.firebaseio.com",
  projectId: "georgsgame-3d44e",
  storageBucket: "georgsgame-3d44e.appspot.com",
  messagingSenderId: "768069468543",
  appId: "1:768069468543:web:2b5b620699311106775a4a"
};

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/qtop'>Player QTop</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/qbot'>Player QBottom</NavLink></li>
    </ul>
  </nav>
);

const GameBoard = () => {

}

function QTopHands() {
  // easily access the Firestore library
  const gameRef = useFirestore()
    .collection("games")
    .doc("game");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(gameRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching Data...</p>;
  }

  return <p> Your hand is: {data.qt}! </p>
}

function QBotHands() {
  // easily access the Firestore library
  const gameRef = useFirestore()
    .collection("games")
    .doc("game");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(gameRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching Data...</p>;
  }

  return <p>Your hand is: {data.qb}!</p>;
}

// Default Home Configuration
function MApp () { 
  return(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <center><h1>Georg's Game</h1></center>
    <Navigation />
  </FirebaseAppProvider>
)}

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Switch>
      <Route exact path='/' component={MApp}></Route>
      <Route exact path='/qtop' component={QTopHands}></Route>
      <Route exact path='/qbot' component={QBotHands}></Route>
    </Switch>
    </FirebaseAppProvider>
  );
}

render(<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById("root"));
export default App;
