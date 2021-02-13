import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Canvas = props => {

  const { draw, ...rest } = props
  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    const { width, height } = canvas.getBoundingClientRect()
    console.log(width)

     if (canvas.width !== width || canvas.height !== height) {
       const { devicePixelRatio:ratio=1 } = window
       const context = canvas.getContext('2d')
       canvas.width = width*ratio
       canvas.height = height*ratio
       context.scale(ratio, ratio)
     }

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])


  return <canvas style={{"width":"100%", "height":"50%"}} ref={canvasRef} {...rest}/>
}


class GateCardDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: ['H', 'X', 'Y', 'Z'],
        };
    }

    renderGateCard(type) {

        const gates = {
            'H': { 'name': 'H', 'style': {backgroundColor: '#99b898'} },
            'X': { 'name': 'X', 'style': {backgroundColor: "#feceab"} },
            'Y': { 'name': 'Y', 'style': {backgroundColor: "#ff847c" } },
            'Z': { 'name': 'Z', 'style': {backgroundColor: "#e84a5f" } }
        }

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
        'gates':'X',
        'test_color':null
      }
    }

    handleCardUse(){
      this.setState({'test_color':1});
      console.log(this.state.test_color);
    }

    render() {
        let draw = (ctx, frameCount) => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          ctx.fillStyle = "#000000";
          ctx.rect(20, 20, 150, 1);
          ctx.rect(40, 20, 150, 1);

          ctx.stroke()
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
