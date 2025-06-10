import React from "react";
import { Box } from "@mui/material";
import { TProteins } from "CommonTypes";
import { allAminoAcid } from "@utils/aminoAcid";
import "./ProteinAlignment.scss";

interface IProteinAlignmentProps {
  currentProteins: TProteins;
}

const ProteinAlignment = ({ currentProteins }: IProteinAlignmentProps) => {
  const getAminoAcidColor = (aminoAcid: string) => {
    return allAminoAcid[aminoAcid] || {};
  };

  const getColorForSecondProtein = (index: number) => {
    const acid1: string = currentProteins.protein1[index] || "";
    const acid2: string = currentProteins.protein2[index] || "";

    return acid1 !== acid2 ? getAminoAcidColor(acid2) : {};
  };

  return (
    <Box className="proteinsAlignmentBox">
      {(currentProteins.protein1 || currentProteins.protein2) && (
        <p className="alignmentTitle">Результаты сравнения:</p>
      )}
      <Box className="proteinsBox">
        <Box className="proteinRowBox">
          {currentProteins.protein1?.split("").map((el, ind) => (
            <span
              key={ind}
              className="aminoAcidItem"
              style={getAminoAcidColor(el)}
            >
              {el}
            </span>
          ))}
        </Box>
        <Box className="proteinRowBox">
          {currentProteins.protein2?.split("").map((el, ind) => (
            <span
              key={ind}
              className="aminoAcidItem"
              style={getColorForSecondProtein(ind)}
            >
              {el}
            </span>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProteinAlignment;
