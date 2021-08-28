import { StrictMode } from "react";
import ReactDOM from "react-dom";
import ".node_modules/bootrap/dist/bootstrap.min.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
