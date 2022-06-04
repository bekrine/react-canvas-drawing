import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrowing, setIsDrowing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrowing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrowing(true);
  };
  const finichDrowing = () => {
    contextRef.current.closePath();
    setIsDrowing(false);
  };
  const drow = ({ nativeEvent }) => {
    if (!isDrowing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <canvas
      onMouseDown={startDrowing}
      onMouseUp={finichDrowing}
      onMouseMove={drow}
      ref={canvasRef}
    />
  );
}
