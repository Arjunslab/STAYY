import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    
    <GoogleOAuthProvider clientId="1086900472426-mebvk0svgnn2o7vhrfmupu9h5kge54sb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);