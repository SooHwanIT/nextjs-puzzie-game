// GameBoard.jsx
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Shape from "./Shape"; // Shape 컴포넌트 임포트
import styles from "./GameBoard.module.css";

const GameBoard = ({ gridState, setGridState, onShapeDrop, shapes }) => {
    const [previewPosition, setPreviewPosition] = useState(null); // 프리뷰 위치

    const [, drop] = useDrop({
        accept: "SHAPE",
        hover: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const boardRect = document
                .querySelector(`.${styles.gameBoard}`)
                .getBoundingClientRect();
            const position = getGridPosition(offset, boardRect);

            if (position && canPlaceShape(item.shape, gridState, position)) {
                setPreviewPosition({ shape: item.shape, position });
            } else {
                setPreviewPosition(null); // 드랍 불가능한 위치는 프리뷰 제거
            }
        },
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const boardRect = document
                .querySelector(`.${styles.gameBoard}`)
                .getBoundingClientRect();
            const position = getGridPosition(offset, boardRect);

            if (position && canPlaceShape(item.shape, gridState, position)) {
                placeShape(item.shape, position, item.previousPosition); // 퍼즐 배치
                onShapeDrop(item.id, position); // 부모 상태 업데이트
            }
            setPreviewPosition(null);
        },
    });

    const getGridPosition = (offset, boardRect) => {
        if (!offset || !boardRect) return null;

        const cellSize = 50; // 셀 크기 (CSS와 동일하게 설정)
        const gapSize = 5; // grid-gap 크기 (CSS와 동일하게 설정)

        // 보드 내 실제 드랍 가능한 영역 계산
        const adjustedX = offset.x - boardRect.left;
        const adjustedY = offset.y - boardRect.top;

        // 보드 내 드랍 위치를 셀 기준으로 변환
        const x = Math.floor(adjustedX / (cellSize + gapSize));
        const y = Math.floor(adjustedY / (cellSize + gapSize));

        // 보드 범위 초과 확인
        if (x < 0 || y < 0 || x >= 6 || y >= 6) {
            return null; // 보드 범위를 초과하면 null 반환
        }

        return [y, x];
    };

    const canPlaceShape = (shape, grid, position) => {
        if (!position) return false;

        const [y, x] = position;
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === 1) {
                    if (
                        y + i >= grid.length ||
                        x + j >= grid[0].length ||
                        (grid[y + i][x + j] !== null && grid[y + i][x + j] !== "preview")
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const placeShape = (shape, position, previousPosition) => {
        const [y, x] = position;
        const newGrid = gridState.map((row) => [...row]);

        // 기존 위치 초기화
        if (previousPosition) {
            const [prevY, prevX] = previousPosition;
            shape.forEach((row, i) =>
                row.forEach((cell, j) => {
                    if (cell === 1) {
                        newGrid[prevY + i][prevX + j] = null;
                    }
                })
            );
        }

        // 새로운 위치에 배치
        shape.forEach((row, i) =>
            row.forEach((cell, j) => {
                if (cell === 1) {
                    newGrid[y + i][x + j] = 1;
                }
            })
        );

        setGridState(newGrid);
    };

    return (
        <div ref={drop} className={styles.gameBoard}>
            {gridState.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isPreview =
                        previewPosition &&
                        previewPosition.position[0] <= rowIndex &&
                        rowIndex < previewPosition.position[0] + previewPosition.shape.length &&
                        previewPosition.position[1] <= colIndex &&
                        colIndex < previewPosition.position[1] + previewPosition.shape[0].length &&
                        previewPosition.shape[rowIndex - previewPosition.position[0]][
                        colIndex - previewPosition.position[1]
                            ] === 1;

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`${styles.gridCell} ${
                                cell ? styles.gridCellFilled : isPreview ? styles.gridCellPreview : ""
                            }`}
                        />
                    );
                })
            )}
            {/* 보드 위에 조각을 절대 위치로 렌더링 */}
            {shapes.map((shape) =>
                shape.position ? (
                    <Shape key={shape.id} shapeData={shape} />
                ) : null
            )}
        </div>
    );
};

export default GameBoard;
