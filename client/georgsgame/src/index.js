import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Canvas from './canvas.js'
import './index.css';


const gates = {
    'H': { 'name': 'H', 'style': {backgroundColor: '#99b898'} },
    'X': { 'name': 'X', 'style': {backgroundColor: "#feceab"} },
    'Y': { 'name': 'Y', 'style': {backgroundColor: "#ff847c" } },
    'Z': { 'name': 'Z', 'style': {backgroundColor: "#e84a5f" } },
    'CX0': { 'name': 'CX0', 'style': {backgroundColor: "#00a6ff" } },
    'CX1': { 'name': 'CX1', 'style': {backgroundColor: "#00a6ff" } },
}


class GateCardDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: ['H', 'X', 'Y', 'Z'],
        };
    }

    renderGateCard(type) {
        const gate = gates[type];
        return (
        <GateCard name={gate['name']} style={gate['style']} handleCardUse={()=>{this.props.handleCardUse()}}/>
        );
    }

    render() {
        const cards = Array(5).fill(null);
        for(let i = 0; i < this.state.cards.length; i++) {
            cards.push(<div key={i}>{this.renderGateCard(this.state.cards[i])}</div>);
        }
        return (
            <div className="deck">
                {cards}
            </div>
        );
    }
}

function GateCard(props) {
    // console.log(props.gateType);
    return (
        <button className="card" style={props.style} onClick={()=>{props.handleCardUse()}}>
            {props.name}
        </button>
    )
}

// class StratCardDeck extends React.Component {
//     render() {
//         return (
//             <div className="deck"> Coming Soon -- Apler
//             </div>
//         );
//     }
// }

class Game extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        gates:[['X','CX0','CX1','X','X'],['X', 'CX0', 'CX1', 'X', 'H']],
      }
    }

    handleCardUse(){
      console.log(this.state.test_color);
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
          let cable_width = 500
          let cable_heights = [60, 180]
          this.fillRect(ctx, 40, cable_heights[0], cable_width, 3)
          this.fillRect(ctx, 40, cable_heights[1], cable_width, 3)

          const box_size = 50

          const controlled_radii = [10, 50]

          for(let i=0; i<this.state.gates.length; i++){
            let y = cable_heights[i]
            for(let j=0; j<this.state.gates[0].length; j++){

              let x = j*(cable_width/(this.state.gates[0].length-1))

              let type = gates[this.state.gates[i][j]];

              ctx.strokeStyle = "white";
              if(!this.state.gates[i][j].includes("C")){
                ctx.fillStyle = type["style"].backgroundColor;
                this.fillRect(ctx, x+box_size/2, y-box_size/2, 50, 50)
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

          // ctx.fillStyle = this.state.test_color ? '#000000' : '#FFFFFF'
          // console.log(ctx.fillStyle);
          // ctx.beginPath()
          // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
          // ctx.fill()
        }

        return (
            <div style={{display: 'inline-block'}}>
                <Canvas draw={draw}/>
                <GateCardDeck handleCardUse={() => {this.handleCardUse()}}/>
                {/* <StratCardDeck/> */}
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<Game/>, document.getElementById('root'));
