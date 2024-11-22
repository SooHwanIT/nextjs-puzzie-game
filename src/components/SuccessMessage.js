import React from "react";

const SuccessMessage = ({ timer }) => {
    return (
        <div className="success-message">
            <h2>Congratulations!</h2>
            <p>You completed the puzzle in {timer} seconds.</p>
        </div>
    );
};

export default SuccessMessage;
