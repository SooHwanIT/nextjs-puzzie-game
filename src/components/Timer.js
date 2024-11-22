import React, { useEffect, useState } from "react";

const Timer = ({ gameOver }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
            return () => clearInterval(interval);
        }
    }, [gameOver]);

    return <div className="timer">Time: {time}s</div>;
};

export default Timer;
