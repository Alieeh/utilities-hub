// components/CanvasConfetti.js
import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CanvasConfetti = ({ active, config } : any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (active && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      myConfetti(config || { particleCount: 200, spread: 70, origin: { y: 0.6 } });

      // No built-in way to know when the animation finishes with this library directly.
      // You might need to manage the 'active' state with a timeout in the parent component.
    }
  }, [active, config]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
};

export default CanvasConfetti;