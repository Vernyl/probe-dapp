import React from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom"
import $ from 'jquery';

import { StateContextProvider } from './context';
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

//Import CSS
// import './assets/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/owl.carousel.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/flaticon.css";
import "./assets/css/meanmenu.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

// This is the chainId your dApp will work on.
const activeChain = "mumbai";
const CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
        activeChain={activeChain}
        clientId={CLIENT_ID}
    >
      <Router>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
