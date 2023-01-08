import { useState } from 'react';
import './app.css';

function App() {
  const [points, setPoints] = useState([]);
  const [deletedPoints, setDeletedPoints] = useState([]);

  function click(event) {
    const newPoint = {
      x: event.clientX,
      y: event.clientY,
    };

    setPoints((prev) => [...prev, newPoint]);
  }

  function undo(event) {
    event.stopPropagation();

    if (points.length == 0) return;

    const lastItem = points[points.length - 1];
    setDeletedPoints((prev) => [...prev, lastItem]);

    setPoints((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    });
  }

  function redo(event) {
    event.stopPropagation();

    const lastItem = deletedPoints[deletedPoints.length - 1];

    if (points.length == 0) {
      return;
    }

    setPoints((prev) => [...prev, lastItem]);
  }

  return (
    <div className='app' onClick={click}>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      {points.map((point) => {
        return (
          <span
            key={point.x}
            className='dot'
            style={{ left: point.x, top: point.y }}
          ></span>
        );
      })}
    </div>
  );
}

export default App;
