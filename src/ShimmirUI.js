import React from "react";
import "./ShimmirUI.css";

function ShimmirUI() {
  return (
    <React.Fragment>
      {Array(15)
        .fill("")
        .map((e, index) => (
          <div class="shimmer">
            <div key={index} class="shimmer-image"></div>
            <div key={index} class="shimmer-line"></div>
            <div key={index} class="shimmer-line"></div>
            <div key={index} class="shimmer-line"></div>
            <div key={index} class="shimmer-line last"></div>
          </div>
        ))}
    </React.Fragment>
  );
}
export default ShimmirUI;
