import { React } from "react";

const Options = ({ updateFeedback, reset, isFeedbackEmpty }) => {
  return (
    <>
      <button onClick={() => updateFeedback("good")}>Good</button>
      <button onClick={() => updateFeedback("neutral")}>Neutral</button>
      <button onClick={() => updateFeedback("bad")}>Bad</button>
      {!isFeedbackEmpty ? <button onClick={() => reset()}>Reset</button> : null}
    </>
  );
};

export default Options;
