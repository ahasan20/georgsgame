import React, { useRef, useEffect } from 'react';

const Canvas = props => {
  const { draw, ...rest } = props
  const canvasRef = useRef(null)
  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    const { width, height } = canvas.getBoundingClientRect()
    // console.log(width)

    // if(!rescaled){

    if(canvas.width){
      let ratio=5
      if(canvas.width < width){
        canvas.width = canvas.width*ratio
        canvas.height = canvas.height*ratio
        context.scale(ratio, ratio)
      }
    }
    // }
     // if (canvas.width !== width || canvas.height !== height) {
     //   const { devicePixelRatio:ratio=1 } = window
     //   const context = canvas.getContext('2d')
     //   canvas.width = width*ratio
     //   canvas.height = height*ratio
     //   console.log("resetting")
     //   context.setTransform(1, 0, 0, 1, 0, 0);
     //   context.scale(ratio, ratio)
     // }

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
  //asdfasdf
  return <canvas className="canvas" style={{"width":"700px", "height":"400px", "padding":"50px"}} ref={canvasRef} {...rest}/>
}

export default Canvas
