import logo from './logo.svg';
import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from 'reactfire';
import './App.css';

const firebase = require("firebase");
require("firebase/firestore");

function Game() {
  // lazy load the Firestore SDK and create a document reference
  const gameRef = useFirestore()
    .collection('6oMC55R6lnniZFzKn1UN')
    .doc('game');

  // subscribe to the doc. just one line!
  const game = useFirestoreDocData(gameRef);

  // get the value from the doc
  const state = game.player_turn;

  return <p>The game state is {state ? "qtop" : "qbot"}</p>;
}

function App() {
  return (
    <div className="App">
      {/*
        SuspenseWithPerf behaves the same as Suspense,
        but also automatically measures load times with the User Timing API
        and reports it to Firebase Performance Monitoring
      */}
      <SuspenseWithPerf fallback={'loading game status...'} traceId={'load-game-status'}>
        <Game />
      </SuspenseWithPerf>
    </div>
  );
}

export default App;
