import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";


//STYLES
import {
  PlantHomeContent,
} from "./styles";

const Plants: React.FC = () => {
  const history = useHistory();
  
  return (
    <PlantHomeContent>
        {/* <h1>corpo do conteudo</h1> */}
    </PlantHomeContent>
  );
};

export default Plants;