import React, { useState } from "react";
import male from "./component/img/male.png";
import female from "./component/img/female.png";
import bravo from "./component/img/bravo.gif";
import biking from "./component/img/biking.gif";
import heart from "./component/img/heart.gif";
import vegetable from "./component/img/vegetable.gif";
import "./App.css";

export default function App() {
  const [inputHeight, setInputHeight] = useState(170);
  const [inputWeight, setInputWeight] = useState(65);
  const [BMI, setBMI] = useState(0);
  const [message, setMessage] = useState("");
  const [showNextPage, setShowNextPage] = useState();
  const [showBtnState, setShowBtnState] = useState("start-100");
  const [mode, setMode] = useState("Metric");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [minHeight, setMinHeight] = useState(120);
  const [maxHeight, setMaxHeight] = useState(200);
  const [stepHeight, setStepHeight] = useState(1);
  const [minWeight, setMinWeight] = useState(40);
  const [maxWeight, setMaxWeight] = useState(150);
  const [stepWeight, setStepWeight] = useState(1);

  const time = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  function getInputHeight(e) {
    if (mode === "Metric") {
      setMinHeight(120);
      setMaxHeight(200);
      setStepHeight(1);
      setInputHeight(e.target.value);
    }

    if (mode === "Imperial") {
      let temp = e.target.value;
      setMinHeight(3.9);
      setMaxHeight(6.6);
      setStepHeight(0.1);
      setInputHeight(temp);
    }
  }

  function getInputWeight(e) {
    if (mode === "Metric") {
      setMinWeight(40);
      setMaxWeight(150);
      setStepWeight(0.5);
      setInputWeight(e.target.value);
    }

    if (mode === "Imperial") {
      let temp = e.target.value;
      setMinWeight(88);
      setMaxWeight(331);
      setStepWeight(0.5);
      setInputWeight(temp);
    }
  }

  function calculateBMI() {
    let index = 0;
    if (mode === "Metric") {
      index = ((inputWeight * 10000) / (inputHeight * inputHeight)).toFixed(1);
    }

    if (mode === "Imperial") {
      index = (
        (inputWeight * 0.45359237 * 10000) /
        Math.pow(inputHeight * 30.48, 2)
      ).toFixed(1);
    }

    let newMessage = "";

    if (index <= 18.5) {
      newMessage = (
        <>
          <img
            className="d-block mx-auto mb-2"
            src={biking}
            alt="biking"
            width="100px"
          />
          <p className="text-center h5">
            You are <span className="text-primary fw-bold">underweight </span>.
            Let's follow a healthful diet and do more excercises.
          </p>
        </>
      );
      setMessage(newMessage);
    }

    if (index > 18.5 && index <= 25) {
      newMessage = (
        <>
          <img
            className="d-block mx-auto mb-2"
            src={bravo}
            alt="good-health"
            width="100px"
          />
          <p className="text-center h5">
            <span className="text-success fw-bold">
              You are in a good shape.
            </span>{" "}
            Keep up maintaining your perfect body!
          </p>
        </>
      );
      setMessage(newMessage);
    }

    if (index > 25 && index <= 30) {
      newMessage = (
        <>
          <img
            className="d-block mx-auto mb-2"
            src={vegetable}
            alt="vegetable"
            width="100px"
          />
          <p className="text-center h5">
            You are <span className="App-color fw-bold">overweight</span>. Let's
            start a healthy diet, be more physically active, and making changes
            to your usual habits.
          </p>
        </>
      );
      setMessage(newMessage);
    }

    if (index > 30) {
      newMessage = (
        <>
          <img
            className="d-block mx-auto mb-2"
            src={heart}
            alt="heart"
            width="100px"
          />
          <p className="text-center h5">
            You are facing with{" "}
            <span className="text-danger fw-bold">obesity</span>. Please contact
            doctor or health consultant for advice as soon as possible.
          </p>
        </>
      );
      setMessage(newMessage);
    }

    setBMI(index);
    setShowNextPage("end-0");
  }

  function backHomePage() {
    setShowNextPage("end-100");
    setBMI(0);
    setMessage("");
  }

  function showBtnMode() {
    setShowBtnState("end-0");
  }

  function hideBtnMode() {
    setShowBtnState("start-100");
  }

  function changeMode() {
    if (mode === "Metric") {
      let newHeight = (inputHeight * 0.032808399).toFixed(1);
      let newWeight = (inputWeight * 2.20462262).toFixed(1);
      setInputHeight(newHeight);
      setInputWeight(newWeight);

      setMode("Imperial");
      setHeightUnit("ft");
      setWeightUnit("lb");
      setMinHeight(3.9);
      setMaxHeight(6.6);
      setStepHeight(0.1);
      setMinWeight(88);
      setMaxWeight(331);
      setStepWeight(0.5);
    } else {
      let newHeight = (inputHeight * 30.48).toFixed(0);
      let newWeight = (inputWeight * 0.45359237).toFixed(1);
      setInputWeight(newWeight);
      if (newHeight < 120) {
        setInputHeight(120);
      } else {
        setInputHeight(newHeight);
      }

      setMode("Metric");
      setHeightUnit("cm");
      setWeightUnit("kg");
      setMinHeight(120);
      setMaxHeight(200);
      setStepHeight(1);
      setMinWeight(40);
      setMaxWeight(150);
      setStepWeight(0.5);
    }

    setTimeout(() => setShowBtnState("start-100"), 1500);
  }

  return (
    <div className="App">
      <div className="App-container overflow-hidden my-3 px-2 py-5 position-relative mx-auto col-12 col-md-6 d-flex flex-column">
        <div className="App-notch bg-dark position-absolute top-0 start-50 translate-middle"></div>
        <div className="App-time position-absolute top-0 start-0">
          <p className="text-center">{time}</p>
        </div>
        <button
          className={`btn App-measurement-modal-show text-white position-absolute ${showBtnState}`}
          onClick={changeMode}
          onMouseOut={hideBtnMode}
        >
          {mode}
        </button>
        <button
          className="btn App-measurement-modal-hide text-white position-absolute"
          onClick={showBtnMode}
        >
          +
        </button>

        <div className="App-bar bg-dark position-absolute start-50 translate-middle"></div>
        <div
          className={`App-result position-absolute top-0 px-2 py-4 ${showNextPage}`}
        >
          <p className="btn text-secondary m-0" onClick={backHomePage}>
            &lt; Back
          </p>
          <div className="App-result-container bg-light mx-auto p-3 my-5">
            <p className="h2 text-center">Your BMI</p>
            <p className="App-result-bmi text-center App-color fw-bolder">
              {BMI}
            </p>
          </div>
          <div className="py-1">{message}</div>
          <div className="w-100 py-5 d-flex">
            <button
              className="App-button-back btn rounded-pill text-white mx-auto mb-0 mt-auto"
              onClick={backHomePage}
            >
              Back to Home
            </button>
          </div>
        </div>
        <p className="h2 text-center pt-2">
          <span className="App-logo">BMI</span>&nbsp;Calculator
        </p>
        <p className="pt-3 text-secondary">
          Body Mass Index (BMI) is a measure of adult body fat based on height
          and weight. Select your <strong>gender</strong>,{" "}
          <strong>height</strong> and <strong>weight</strong> to get the result.
        </p>
        <div className="d-flex flex-column py-2 flex-grow-1 flex-shrink-1 align-content-between">
          <div className="App-image py-2 d-flex flex-row justify-content-around">
            <div>
              <label htmlFor="male">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  defaultChecked={true}
                />
                <img src={male} width="100px" alt="male" />
                <p className="text-center pt-2 m-0"> Male</p>
              </label>
            </div>
            <div>
              <label htmlFor="female">
                <input type="radio" id="female" name="gender" value="female" />
                <img src={female} width="100px" alt="female" />
                <p className="text-center pt-2 m-0"> Female</p>
              </label>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="h6 App-color fw-bolder">&#9656; Height:</p>
              <p className="App-color">
                <span className="App-color fs-3 fw-bold">{inputHeight}</span>
                &nbsp;{heightUnit}
              </p>
            </div>
            <div>
              <input
                type="range"
                className="App-slider"
                min={minHeight}
                max={maxHeight}
                value={inputHeight}
                onChange={getInputHeight}
                step={stepHeight}
              />
            </div>
          </div>
          <div className="py-4">
            <div className="d-flex align-items-center justify-content-between">
              <p className="h6 App-color fw-bolder">&#9656; Weight:</p>
              <p className="App-color">
                <span className="App-color fs-3 fw-bold">{inputWeight}</span>
                &nbsp;{weightUnit}
              </p>
            </div>
            <div>
              <input
                type="range"
                className="App-slider"
                min={minWeight}
                max={maxWeight}
                step={stepWeight}
                value={inputWeight}
                onChange={getInputWeight}
              />
            </div>
          </div>
          <button
            className="App-button text-white btn w-100 rounded-pill my-3 mx-auto"
            onClick={calculateBMI}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Show BMI
          </button>
        </div>
      </div>
    </div>
  );
}
