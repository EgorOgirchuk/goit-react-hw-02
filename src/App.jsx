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

  const [isFeedbackEmpty, setIsFeedbackEmpty] = useState(true);

  const [totalPercent, setTotalPercent] = useState();

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

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

    const totalPercent = Math.round((feedback.good / totalFeedback) * 100);
    setTotalPercent(totalPercent);
  }, [feedback]);

  return feedback != null ? (
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
          <Notification title="No feedback yet" />
        )}
      </div>
    </div>
  ) : (
    ""
  );
};
export default App;
