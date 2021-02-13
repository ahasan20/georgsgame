import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Canvas from './canvas.js'
import './index.css';
import { render } from "react-dom";
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import Latex from 'react-latex'

import { Row, Col, Container, Button} from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from "firebase"

import "firebase/firestore";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore
} from "reactfire";


var _ = require('lodash');

let map = {"top":0, "bottom":1}
let reverseMap = {0:"top", 1:"bottom"}

const firebaseConfig = {
  apiKey: "AIzaSyDtKtCjmDGio_3jsEqsI0cIleqndvD4pJg",
  authDomain: "georgsgame-3d44e.firebaseapp.com",
  databaseId: "georgsgame-3d44e.firebaseio.com",
  projectId: "georgsgame-3d44e",
  storageBucket: "georgsgame-3d44e.appspot.com",
  messagingSenderId: "768069468543",
  appId: "1:768069468543:web:2b5b620699311106775a4a"
};

const gates = {
    'H': { 'name': 'H', 'style': {backgroundColor: '#99b898'} },
    'X': { 'name': 'X', 'style': {backgroundColor: "#feceab"} },
    'Y': { 'name': 'Y', 'style': {backgroundColor: "#ff847c" } },
    'Z': { 'name': 'Z', 'style': {backgroundColor: "#e84a5f" } },
    'S': { 'name': 'S', 'style': {backgroundColor: "#ffcc00" } },
    'S_dg': { 'name': 'S✝', 'style': {backgroundColor: "#ffcc00" } },
    'S✝': { 'name': 'S✝', 'style': {backgroundColor: "#ffcc00" } },
    'T': { 'name': 'T', 'style': {backgroundColor: "#00d9ff" } },
    'T_dg': { 'name': 'T✝', 'style': {backgroundColor: "#00d9ff" } },
    'T✝': { 'name': 'T✝', 'style': {backgroundColor: "#00d9ff" } },
    'CX0': { 'name': 'CX0', 'style': {backgroundColor: "#00a6ff" } },
    'CX1': { 'name': 'CX1', 'style': {backgroundColor: "#00a6ff" } },
    'CY0': { 'name': 'CY0', 'style': {backgroundColor: "#00a6ff" } },
    'CY1': { 'name': 'CY1', 'style': {backgroundColor: "#00a6ff" } },
    'CZ0': { 'name': 'CZ0', 'style': {backgroundColor: "#00a6ff" } },
    'CZ1': { 'name': 'CZ1', 'style': {backgroundColor: "#00a6ff" } },
    'CH0': { 'name': 'CH0', 'style': {backgroundColor: "#00a6ff" } },
    'CH1': { 'name': 'CH1', 'style': {backgroundColor: "#00a6ff" } },
    '_': { 'name': '', 'style': {backgroundColor: 'rgba(52, 52, 52, 0)' } },
}


const gate_distribution = {
    'H': { 'name': 'H', 'style': {backgroundColor: '#99b898'} },
    'H': { 'name': 'H', 'style': {backgroundColor: '#99b898'} },
    'H': { 'name': 'H', 'style': {backgroundColor: '#99b898'} },
    'X': { 'name': 'X', 'style': {backgroundColor: "#feceab"} },
    'Y': { 'name': 'Y', 'style': {backgroundColor: "#ff847c" } },
    'Z': { 'name': 'Z', 'style': {backgroundColor: "#e84a5f" } },
    'S': { 'name': 'S', 'style': {backgroundColor: "#ffcc00" } },
    'S_dg': { 'name': 'S✝', 'style': {backgroundColor: "#ffcc00" } },
    'T': { 'name': 'T', 'style': {backgroundColor: "#00d9ff" } },
    'T_dg': { 'name': 'T✝', 'style': {backgroundColor: "#00d9ff" } },
    'CX0': { 'name': 'CX0', 'style': {backgroundColor: "#00a6ff" } },
    'CX1': { 'name': 'CX1', 'style': {backgroundColor: "#00a6ff" } },
    // 'CY0': { 'name': 'CY0', 'style': {backgroundColor: "#00a6ff" } },
    // 'CY1': { 'name': 'CY1', 'style': {backgroundColor: "#00a6ff" } },
    // 'CZ0': { 'name': 'CZ0', 'style': {backgroundColor: "#00a6ff" } },
    // 'CZ1': { 'name': 'CZ1', 'style': {backgroundColor: "#00a6ff" } },
    // 'CH0': { 'name': 'CH0', 'style': {backgroundColor: "#00a6ff" } },
    // 'CH1': { 'name': 'CH1', 'style': {backgroundColor: "#00a6ff" } },
}




const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/qtop'>Player QTop</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/qbot'>Player QBottom</NavLink></li>
    </ul>
  </nav>
);

function QTopHands() {
  // easily access the Firestore library
  const gameRef = useFirestore().collection("games").doc("game");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(gameRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching Data...</p>;
  }

  let first_row = data.game[0].split(',');
  let second_row = data.game[1].split(',');
  let gameState = [first_row, second_row];

  let game = <Game gameState={gameState} turn={data.turn} playerType="top" probs={data.probs}/>

  return game;
}

function QBotHands() {
  // easily access the Firestore library
  const gameRef = useFirestore().collection("games").doc("game");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(gameRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching Data...</p>;
  }

  let first_row = data.game[0].split(',');
  let second_row = data.game[1].split(',');
  let gameState = [first_row, second_row];

  let game = <Game gameState={gameState} turn={data.turn} playerType="bottom" probs={data.probs}/>

  return game;
}


class GateCardDeck extends React.Component {

    constructor(props) {
        super(props);

        let names = _.sampleSize(Object.keys(gate_distribution), 6);
        // console.log("names");
        // console.log(names);
        // let hand = Array(5);
        // for(let i=0; i<names.length;i++){
        //   hand[i] = gates[names[i]]["name"];
        // }
        console.log("hand");
        console.log(names);
        // console.log(hand);

        this.state = {
            cards: names,
        };
    }

    renderGateCard(type) {
        const gate = gates[type];
        return (
        <GateCard name={gate['name']} style={gate['style']} handleCardUse={this.props.handleCardUse}/>
        );
    }

    render() {
        const cards = Array(5).fill(null);
        for(let i = 0; i < this.state.cards.length; i++) {
            cards.push(<div key={i}>{this.renderGateCard(this.state.cards[i])}</div>);
        }
        return (
            <Container>
              <Row>
                <Col className="deck">
                    <div style={{"color":"white", "padding":2, "marginBottom":5, "fontSize":25}}>Gate Cards</div>

                    <div id="card-space" style={{"marginLeft":50}}>
                    <Row className="cards">
                    {cards}
                    </Row>
                    </div>
                </Col>
                <Col className="deck">
                  <h1 style={{"color":"white"}}>Strategy cards coming soon</h1>
                </Col>

              </Row>
            </Container>

        );
    }
}

function GateCard(props) {
    // console.log(props.gateType);
    return (
      // <Col>
        <Col className="card" style={props.style} onClick={()=>{props.handleCardUse(props.name)}}>
            {props.name}
        </Col>
      // </Col>
    )
}

function Home () {
  return(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <center><h1>Georg's Game</h1></center>
    <Navigation />
  </FirebaseAppProvider>
)}

class Game extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        // gates:[['X','CZ0','CH1','CY0','H'],['X', 'CZ0', 'CH1', 'CY0', 'H']],
        gates: props.gameState,
        probs: props.probs,
      }

      this.handleCardUse = this.handleCardUse.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      // console.log("hello");
      // console.log("new gates");
      // console.log(this.props.gates)
      // this.setState({})
      // console.log("new_gates", this.props.gates);
      //
      if(prevState.gates !== this.props.gameState) {
        this.setState({gates: this.props.gameState})
        console.log("new_gates");
      }
    }

    resetGame(){
      const db=firebase.firestore();
      db.collection('games').doc("game").set({turn:0, game:["_,_,_,_,_", "_,_,_,_,_"], probs:["100%", "0%","0%", "0%"]});
    }

    handleCardUse(card){
      if(this.props.playerType == reverseMap[this.props.turn % 2]){
        let gameState = this.state.gates
        // console.log(this.state.gates);
        console.log(gameState);
        console.log()

        let qubitState = gameState[map[this.props.playerType]]

        for(let i = 0; i < qubitState.length; i++){
          console.log(">>>")
          console.log(i)
          console.log(qubitState[i]);
          console.log(">>>")

          if(qubitState[i]=="_"){
            qubitState[i]=card;
            break
          }
        }

        let first_row = gameState[0].join(',');
        let second_row = gameState[1].join(',');

        let newGameState = [first_row, second_row];

        const data = {
          "state": [gameState[0], gameState[1]]
        };

        console.log("data");
        console.log(data);

        const probs = `https://georgsgame.herokuapp.com/api/get/probabilities`;
        const statevector = `https://georgsgame.herokuapp.com/api/get/statevector`;

        axios.post(probs, { data }, {headers: {
          "Content-Type": "application/json",
        }})
          .then(res => {
            this.setState({probs:res.data})
            const db=firebase.firestore();
            db.collection('games').doc("game").set({turn:this.props.turn + 1, game:newGameState, probs:res.data }).then()

          })


      }
      else{
        alert("Not your turn, wait for the other player.")
      }

      if(this.props.turn == 9){
        alert("Game over!");

        let gameState = this.state.gates

        let first_row = gameState[0].join(',');
        let second_row = gameState[1].join(',');

        let newGameState = [first_row, second_row];

        const data = {
          "state": [gameState[0], gameState[1]]
        };

        const measurement = `https://georgsgame.herokuapp.com/api/get/measurement`;

        axios.post(measurement, { data }, {headers: {
          "Content-Type": "application/json",
        }})
          .then(res => {
            console.log("request successful!");
            console.log(res.data);
            if(parseInt(res.data[0]) - parseInt(res.data[1]) == 0){
              alert("Constant measurement " + res.data + ". Top wins");
            }
            else{
              alert("Balanced measurement  " + res.data + ". Bottom wins");
            }
            this.resetGame();
          })
      }
    }

    fillRect(ctx, x,y,width,height){
      ctx.fillRect(x, y, width, height);
      ctx.stroke()
    }

    fillRectCenter(ctx, x,y, width, height){
      ctx.fillRect(x-(width/2), y-(width/2), width, height);
      ctx.stroke()
    }

    fillCircle(ctx, x, y, r){
      ctx.fillStyle = "#00a6ff";
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    render() {
        let draw = (ctx, frameCount) => {
          ctx.font = "30px Arial";
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          ctx.fillStyle = "#000000";
          let cable_width = 225;
          let cable_heights = [30, 90]
          let starting_x = 20
          this.fillRect(ctx, starting_x, cable_heights[0], cable_width, 3)
          this.fillRect(ctx, starting_x, cable_heights[1], cable_width, 3)

          const box_size = 50

          const controlled_radii = [10, 50]

          for(let i=0; i<this.state.gates.length; i++){
            let y = cable_heights[i]
            for(let j=0; j<this.state.gates[0].length; j++){

              let x = j*(cable_width/(this.state.gates[0].length-1)) - starting_x
              let type = gates[this.state.gates[i][j]];

              ctx.strokeStyle = "white";


              if(!this.state.gates[i][j].includes("C")){

                ctx.fillStyle = type["style"].backgroundColor;
                this.fillRect(ctx, x+box_size/2, y-box_size/2, box_size, box_size)
                ctx.fillStyle = "#FFF";
                ctx.fillText(type["name"], x+40, y+10);
              }
              else{
                ctx.fillStyle = type["style"].backgroundColor;
                let order = null
                if(!this.state.gates[i][j].includes("0")){
                  order = [1, 0]
                }
                else{
                  order = [0, 1]
                }
                  // this.fillRect(ctx, x+box_size/2, y-box_size/2, radii[i], radii[i])
                if(i==0){
                  //cable
                  this.fillRectCenter(ctx, x+box_size, y, 2, cable_heights[1] - cable_heights[0])
                  //actual rectangle
                  this.fillRectCenter(ctx, x+box_size, y, controlled_radii[order[i]], controlled_radii[order[i]])
                }
                else{
                  this.fillRectCenter(ctx, x+box_size , y, controlled_radii[order[i]], controlled_radii[order[i]])
                }

                if(order[i]){
                  ctx.font = "25px Arial";
                  ctx.fillStyle = "#FFF";
                  ctx.fillText(type["name"], x+25, y+10);
                }
              }
            }
          }
        }

        let yourTurn = this.props.playerType == reverseMap[this.props.turn % 2] ? "your turn" : "opponent's turn"

        return (
            <div>
                <h1 className="game-title">Georg's Game: Circuit Showdown!</h1>
                <Container>
                <Row>
                  <Col>
                  Probabilities
                  <Container className="probabilites-box">
                    <Row>
                      <Col>
                      <Latex> $ p(| 00 \rangle ) = $</Latex>{this.state.probs[0]}
                      </Col>
                      <Col>
                      <Latex> $ p(| 01 \rangle ) = $</Latex>{this.state.probs[1]}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Latex> $ p(| 10 \rangle ) = $</Latex>{this.state.probs[2]}
                      </Col>
                      <Col>
                      <Latex> $ p(| 11 \rangle ) = $</Latex>{this.state.probs[3]}
                      </Col>
                    </Row>
                  </Container>
                  </Col>
                  <Col></Col>
                  <Col>
                  Turns
                  <Container className="turn-box">
                    <Row>Turn {this.props.turn + 1}/10 - {reverseMap[this.props.turn % 2]} ({yourTurn})</Row>
                  </Container>
                  </Col>
                </Row>
                </Container>

                <Canvas draw={draw}/>
                <GateCardDeck handleCardUse={this.handleCardUse}/>
                <Button onClick={()=>{this.resetGame()}}></Button>
            </div>
        )
    }
}

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/qtop' component={QTopHands}></Route>
      <Route exact path='/qbot' component={QBotHands}></Route>
    </Switch>
    </FirebaseAppProvider>
  );
}

// ========================================

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
