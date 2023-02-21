import React from "react";
import Question from "./Question";

export default function Loader(){


    return (
    < >
        <div className="question-card">
            <div className="question-card-title loading-bg">
                <div className="loading-bg-masker"></div>
            </div>
            <div className="choices-container">
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
            </div>
          </div>

          <div className="question-card">
            <div className="question-card-title loading-bg">
                <div className="loading-bg-masker"></div>
            </div>
            <div className="choices-container">
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
            </div>
          </div>
          
          <div className="question-card">
            <div className="question-card-title loading-bg">
                <div className="loading-bg-masker"></div>
            </div>
            <div className="choices-container">
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
                <div className="choice loading-choices"></div>
            </div>
          </div>
    </>
    )
}