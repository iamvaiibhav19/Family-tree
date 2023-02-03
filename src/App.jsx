import "./App.css";
import React from "react";
import FamilyTree from "./components/FamilyTree/FamilyTree";
import Buttons from "./components/Buttons/Buttons";
import FamilyDetails from "./components/FamilyDetails/FamilyDetails";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Box className="box">
        <FamilyTree />
        <Buttons />
        <FamilyDetails />
      </Box>
    </div>
  );
}

export default App;
