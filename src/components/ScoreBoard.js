import React from "react";
import { useDrag } from "react-dnd";

const Shape = ({ shapeData }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "SHAPE",
        item: { id: shapeData.id, shape: shapeData.shape },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="shape"
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {shapeData.shape.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    cell ? (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="shape-cell"
                        />
                    ) : null
                )
            )}
        </div>
    );
};

export default Shape;
