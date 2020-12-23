import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationProvider } from "./providers/LocationContext";
// Create a client
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <LocationProvider>
          <div>
            <CssBaseline />
            <App />
          </div>
        </LocationProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
