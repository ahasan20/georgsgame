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

export default Canvas
