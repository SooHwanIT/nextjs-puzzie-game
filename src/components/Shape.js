// Shape.jsx
import React, { useRef, useMemo } from "react";
import { useDrag } from "react-dnd";
import styles from "./Shape.module.css";
// ID 별 고정된 색상 배열
const shapeColors = [
    "#FF5733", // id: 1 - 빨간색
    "#33FF57", // id: 2 - 초록색
    "#3357FF", // id: 3 - 파란색
    "#F1C40F", // id: 4 - 노란색
    "#9B59B6", // id: 5 - 보라색
    "#1ABC9C", // id: 6 - 청록색
    "#E74C3C", // id: 7 - 연한 빨간색
    "#8E44AD", // id: 8 - 진한 보라색
    "#3498DB", // id: 9 - 밝은 파란색
    "#FF33A1", // id: 10 - 핑크색
    "#2ECC71", // id: 11 - 밝은 초록색
    "#1F618D", // id: 12 - 진한 파란색
    "#F39C12", // id: 13 - 주황색
    "#7D3C98", // id: 14 - 자주색
    "#117A65", // id: 15 - 어두운 청록색
    "#C0392B", // id: 16 - 짙은 빨간색
];


const Shape = ({ shapeData }) => {
    const ref = useRef(null);

    // ID 기반으로 색상 가져오기
    const color = shapeColors[shapeData.id - 1]; // id는 1부터 시작하므로 -1

    const [{ isDragging }, drag] = useDrag({
        type: "SHAPE",
        item: () => {
            return {
                id: shapeData.id,
                shape: shapeData.shape,
                previousPosition: shapeData.position, // 이전 위치 전달
            };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(ref);

    const positionStyle = shapeData.position
        ? {
            position: "absolute",
            top: `${shapeData.position[0] * 55}px`, // 셀 크기 + gap
            left: `${shapeData.position[1] * 55}px`,
        }
        : { position: "relative" };

    return (
        <div
            ref={ref}
            className={styles.shape}
            style={{
                ...positionStyle,
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {shapeData.shape.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((cell, colIndex) =>
                        cell ? (
                            <div
                                key={colIndex}
                                className={styles.shapeCell}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    backgroundColor: color, // 고정된 색상 사용
                                }}
                            />
                        ) : (
                            <div
                                key={colIndex}
                                className={styles.emptyCell}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                }}
                            />
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default Shape;
