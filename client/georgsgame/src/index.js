import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Canvas = props => {
  
    const canvasRef = useRef(null);
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
    }
      
    useEffect(() => {
    
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
    
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
    
    return <canvas ref={canvasRef} {...props}/>
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
        <GateCard name={gate['name']} style={gate['style']} />
        );
    }

    render() {
        const cards = Array(5).fill(null);
        for(let i = 0; i < this.state.cards.length; i++) {
            cards.push(<div>{this.renderGateCard(this.state.cards[i])}</div>);
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
        <button className="card" style={props.style}>
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
    render() {
        return (
            <div style={{display: 'inline-block'}}>
                <Canvas/>
                <GateCardDeck/>
                {/* <StratCardDeck/> */}
            </div>
        )
    }
}

// ========================================

ReactDOM.render(<Game/>, document.getElementById('root'));