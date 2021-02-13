import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Canvas from './canvas.js'
import './index.css';
import { render } from "react-dom";
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import Latex from 'react-latex'

import { Row, Col, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';



import "firebase/firestore";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore
} from "reactfire";

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
  const gameRef = useFirestore()
    .collection("games")
    .doc("game");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(gameRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching Data...</p>;
  }

  let first_row = data.game_state[0].split(',');
  let second_row = data.game_state[1].split(',');
  let gameState = [first_row, second_row];

  let game = <Game gameState={gameState} turn={data.turn} playerType="top"/>

  return game;
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

  let first_row = data.game_state[0].split(',');
  let second_row = data.game_state[1].split(',');
  let gameState = [first_row, second_row];

  let game = <Game gameState={gameState} turn={data.turn} playerType="bottom"/>
}


class GateCardDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: ['H', 'X', 'Y', 'Z', 'CX0'],
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
                    <div style={{"color":"white", "padding":2, "margin-bottom":5, "font-size":25}}>Gate Cards</div>
                    <Row className="cards">
                    {cards}
                    </Row>
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
        gates: props.gameState
      }
    }

    componentDidUpdate(prevProps, prevState) {
      // console.log("hello");
      // console.log("new gates");
      // console.log(this.props.gates)
      // this.setState({})
      // console.log("new_gates", this.props.gates);
      console.log(">>>");
      console.table(prevState.gates);
      console.table(this.props.gameState)
      console.log(">>>");
      //
      if(prevState.gates !== this.props.gameState) {
        this.setState({gates: this.props.gameState})
        console.log("new_gates");
      }
    }

    handleCardUse(card){
      console.log(card);
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
          let cable_width = 225
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

        return (
            <div>
                <h1 className="game-title">Georg's Game: Circuit Showdown!</h1>
                <Container>
                <Row>
                  <Col>
                  Probabilities
                  <Container className="probabilites-box">
                    <Row>top:   <Latex> $ 0.707 | 0 \rangle $ + $0.707 | 1 \rangle$ </Latex></Row>
                    <Row>bottom:  <Latex> $ 0.707 | 0 \rangle $ - $0.707 | 1 \rangle$</Latex></Row>
                  </Container>
                  </Col>
                  <Col></Col>
                  <Col>
                  Turns
                  <Container className="turn-box">
                    <Row>Turn 3/4</Row>
                  </Container>
                  </Col>
                </Row>
                </Container>

                <Canvas draw={draw}/>
                <GateCardDeck handleCardUse={this.handleCardUse}/>
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
