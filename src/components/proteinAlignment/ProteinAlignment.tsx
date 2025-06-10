import React from "react";
import { Box } from "@mui/material";
import { TProteins } from "CommonTypes";
import "./ProteinAlignment.scss";

interface IProteinAlignmentProps {
  currentProteins: TProteins | null;
}

const ProteinAlignment = ({ currentProteins }: IProteinAlignmentProps) => {
  return (
    <Box className="proteinsAlignmentBox">
      {currentProteins && (
        <p className="alignmentTitle">Результаты сравнения:</p>
      )}
      <Box className="proteinsBox">
        <Box className="proteinRowBox">
          {currentProteins?.protein1.split("").map((el, ind) => (
            <span key={ind} className="aminoAcidItem">
              {el}
            </span>
          ))}
        </Box>
        <Box className="proteinRowBox">
          {currentProteins?.protein2.split("").map((el, ind) => (
            <span key={ind} className="aminoAcidItem">
              {el}
            </span>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProteinAlignment;
