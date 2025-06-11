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

  if (!currentProteins.protein1 || !currentProteins.protein2) {
    return null;
  }

  return (
    <Box className="proteinsAlignmentBox">
      <p className="alignmentTitle">Результаты сравнения:</p>
      <Box className="wrapper">
        <Box className="proteinsBox">
          <Box className="firstProteinRow">
            {currentProteins.protein1?.split("").map((acid, ind) => (
              <span
                key={ind}
                className="aminoAcidItem"
                style={getAminoAcidColor(acid)}
              >
                {acid}
              </span>
            ))}
          </Box>
          <Box className="secondProteinRow">
            {currentProteins.protein2?.split("").map((acid, ind) => (
              <span
                key={ind}
                className="aminoAcidItem"
                style={getColorForSecondProtein(ind)}
              >
                {acid}
              </span>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProteinAlignment;
