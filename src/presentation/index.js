// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const domNode = document.getElementById("demoRoot");
const root = createRoot(domNode);

root.render(<App />);
