import React, { useState } from "react";
import ProteinForm from "@components/proteinForm/ProteinForm";
import ProteinAlignment from "@components/proteinAlignment/ProteinAlignment";
import { TProteins } from "CommonTypes";
import "./App.scss";

const App = () => {
  const [currentProteins, setCurrentProteins] = useState<null | TProteins>(
    null
  );

  return (
    <>
      <ProteinForm cbHandleSetProteins={setCurrentProteins} />
      {currentProteins && <ProteinAlignment />}
    </>
  );
};

export default App;
