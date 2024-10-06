import { useEffect, useState } from "react";
import Feedback from "./components/Feedback";
import "./App.css";
import Options from "./components/Options";
import Description from "./components/Description";
import Notification from "./components/Notification";

const App = () => {
  const initFeedback = () => {
    const feedbackString = window.localStorage.getItem("feedback");
    if (!feedbackString) {
      return {
        good: 0,
        neutral: 0,
        bad: 0,
      };
    } else {
      return JSON.parse(feedbackString);
    }
  };

  const [feedback, setFeedback] = useState(initFeedback);

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

    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const isFeedbackEmpty =
    feedback.good === 0 && feedback.neutral === 0 && feedback.bad === 0;

  const totalPercent = Math.round(
    (feedback.good / (feedback.good + feedback.neutral + feedback.bad)) * 100
  );

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        reset={reset}
        isFeedbackEmpty={isFeedbackEmpty}
      />
      <div>
        {!isFeedbackEmpty ? (
          <Feedback feedback={feedback} totalPercent={totalPercent} />
        ) : (
          <Notification />
        )}
      </div>
    </div>
  );
};
export default App;
