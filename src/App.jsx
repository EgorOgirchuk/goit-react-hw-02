import { useEffect, useState } from "react";
import Feedback from "./components/Feedback";
import "./App.css";
import Options from "./components/Options";
import Description from "./components/Description";

const App = () => {
  const [feedback, setFeedback] = useState(null);

  const [isFeedbackEmpty, setIsFeedbackEmpty] = useState(true);

  const getIsFeedbackEmpty = (feedback) => {
    if (!feedback) {
      return true;
    }
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

  useEffect(() => {
    if (!feedback) {
      return;
    }
    setIsFeedbackEmpty(getIsFeedbackEmpty(feedback));
    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  useEffect(() => {
    const feedbackString = window.localStorage.getItem("feedback");
    console.log(feedbackString);
    if (!feedbackString) {
      setFeedback({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    } else {
      const feedback = JSON.parse(feedbackString);
      setFeedback(feedback);
    }
  }, []);

  return { feedback } ? (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        reset={reset}
        isFeedbackEmpty={isFeedbackEmpty}
      />
      <div>
        {!isFeedbackEmpty ? (
          <Feedback feedback={feedback} />
        ) : (
          "No feedback yet"
        )}
      </div>
    </div>
  ) : (
    ""
  );
};
export default App;
