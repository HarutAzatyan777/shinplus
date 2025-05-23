import React, { useRef, useEffect } from 'react';

const CanvasDraw = ({ drawing, setDrawing }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const ctx = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 200;
    ctx.current = canvas.getContext('2d');

    if (drawing) {
      const img = new Image();
      img.onload = () => ctx.current.drawImage(img, 0, 0);
      img.src = drawing;
    }
  }, [drawing]);

  const start = (e) => {
    isDrawing.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
  };

  const end = () => {
    isDrawing.current = false;
    setDrawing(canvasRef.current.toDataURL());
  };

  const clearCanvas = () => {
    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawing('');
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', cursor: 'crosshair' }}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={end}
        onMouseLeave={end}
      />
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
};

export default CanvasDraw;
