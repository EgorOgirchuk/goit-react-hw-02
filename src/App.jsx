import { useState } from "react";
import Feedback from "./Feedback";
import "./App.css";

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const isFeedbackEmpty = (feedback) => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;
    return total == 0;
  };
  const updateFeedback = (feedbackType) => {
    if (feedbackType == "good") {
      setFeedback((prevState) => ({
        ...prevState,
        good: prevState.good + 1,
      }));
    } else if (feedbackType == "neutral") {
      setFeedback((prevState) => ({
        ...prevState,
        neutral: prevState.neutral + 1,
      }));
    } else if (feedbackType == "bad") {
      setFeedback((prevState) => ({ ...prevState, bad: prevState.bad + 1 }));
    }
  };

  const reset = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div>
      <button onClick={() => updateFeedback("good")}>Good</button>
      <button onClick={() => updateFeedback("neutral")}>Neutral</button>
      <button onClick={() => updateFeedback("bad")}>Bad</button>
      {!isFeedbackEmpty(feedback) ? (
        <button onClick={() => reset()}>Reset</button>
      ) : null}
      <div>
        {!isFeedbackEmpty(feedback) ? (
          <Feedback feedback={feedback} />
        ) : (
          "No feedback yet"
        )}
      </div>
    </div>
  );
};
export default App;
