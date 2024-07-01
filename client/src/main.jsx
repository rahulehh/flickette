import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import { AppThemeProvider } from "./context/AppThemeProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/profile.css";
import "./styles/get-started.css";
import "./styles/card.css";
import "./styles/modals.css";
import "./styles/movie.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </AppThemeProvider>
  </React.StrictMode>
);
