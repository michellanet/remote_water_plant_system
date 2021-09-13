import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Plants from "./components/Plants.js";

import "./styles/app.css";
import { AppProvider } from "./contextProvider/AppProvider.js";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
function App() {
  return (
    <div className="p-5">
      <Container className="rounded background-grey p-5 d-flex justify-content-center">
        <AppProvider>
          <Plants />
        </AppProvider>
      </Container>
    </div>
  );
}

export default App;
