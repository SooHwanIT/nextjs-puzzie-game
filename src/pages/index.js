// HomePage.jsx
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameBoard from "../components/GameBoard";
import Shape from "../components/Shape";
import styles from "./HomePage.module.css";

const initialShapes = [
    { id: 1, shape: [[1, 1], [1, 1]], position: null }, // 4칸: 정사각형
    { id: 2, shape: [[1, 1, 1]], position: null }, // 3칸: 직선
    { id: 3, shape: [[1, 1, 1]], position: null }, // 3칸: 직선
    { id: 4, shape: [[1, 1, 1], [0, 1, 0]], position: null }, // 4칸: T자
    { id: 5, shape: [[1, 1], [1, 0]], position: null }, // 3칸: L 모양
    { id: 6, shape: [[1, 1], [0, 1]], position: null }, // 3칸: 반대 L 모양
    { id: 7, shape: [[1, 1, 1], [0, 0, 1]], position: null }, // 4칸: ㄱ 모양
    { id: 8, shape: [[1, 1], [1, 1]], position: null }, // 4칸: 정사각형
    { id: 9, shape: [[1, 1]], position: null }, // 2칸: 작은 직선
    { id: 10, shape: [[1, 1]], position: null }, // 2칸: 작은 직선
    { id: 11, shape: [[1]], position: null }, // 1칸: 단일 블록
    { id: 12, shape: [[1]], position: null }, // 1칸: 단일 블록
    { id: 13, shape: [[1]], position: null }, // 1칸: 단일 블록
    { id: 14, shape: [[1]], position: null }, // 1칸: 단일 블록
];
const HomePage = () => {
  const [gridState, setGridState] = useState(
      Array.from({ length: 6 }, () => Array(6).fill(null))
  );
  const [shapes, setShapes] = useState(initialShapes);

  const handleShapeDrop = (id, newPosition) => {
    setShapes((prevShapes) =>
        prevShapes.map((shape) =>
            shape.id === id ? { ...shape, position: newPosition } : shape
        )
    );

    // gridState 업데이트
    setGridState((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      // 이전 위치 초기화
      const shape = initialShapes.find((s) => s.id === id);
      if (shape.position) {
        const [prevY, prevX] = shape.position;
        shape.shape.forEach((row, i) =>
            row.forEach((cell, j) => {
              if (cell === 1) {
                newGrid[prevY + i][prevX + j] = null;
              }
            })
        );
      }

      // 드랍된 블록을 새로운 위치에 배치
      const [y, x] = newPosition;
      const droppedShape = shapes.find((s) => s.id === id);
      droppedShape.shape.forEach((row, i) =>
          row.forEach((cell, j) => {
            if (cell === 1) {
              newGrid[y + i][x + j] = id; // 블록 ID를 사용해 식별
            }
          })
      );

      return newGrid;
    });
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <h1>Jigsaw Puzzle Game</h1>
          <div className={styles.gameWrapper}>
            <GameBoard
                gridState={gridState}
                setGridState={setGridState}
                onShapeDrop={handleShapeDrop}
                shapes={shapes}
            />
            <div className={styles.shapesContainer}>
              {shapes.map((shape) =>
                  !shape.position ? (
                      <Shape key={shape.id} shapeData={shape} />
                  ) : null
              )}
            </div>
          </div>
        </div>
      </DndProvider>
  );
};

export default HomePage;
