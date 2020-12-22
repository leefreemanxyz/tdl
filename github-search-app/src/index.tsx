import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { WindowProvider } from "./providers/WindowProvider";

// Create a client

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WindowProvider>
        <div>
          <CssBaseline />
          <App />
        </div>
      </WindowProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
