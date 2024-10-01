import { React, useEffect, useState } from "react";

const Feedback = ({ feedback, totalPercent }) => {
  return (
    <div>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total: {feedback.good + feedback.neutral + feedback.bad}</p>
      <p>Positive: {totalPercent}%</p>
    </div>
  );
};

export default Feedback;
