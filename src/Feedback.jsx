import { React, useEffect, useState } from "react";

const Feedback = (props) => {
  const { feedback } = props;
  const [totalFeedback, setTotalFeedback] = useState(0);
  useEffect(() => {
    setTotalFeedback(feedback.good + feedback.neutral + feedback.bad);
  }, [feedback]);
  return (
    <div>
      <p>Good:{feedback.good}</p>
      <p>Neutral:{feedback.neutral}</p>
      <p>Bad:{feedback.bad}</p>
      <p>Total:{totalFeedback}</p>
      <p>
        Positive:
        {Math.round((feedback.good / totalFeedback) * 100)}%
      </p>
    </div>
  );
};

export default Feedback;
