import React, { useEffect, useState } from "react";
import { Box, Snackbar } from "@mui/material";
import { TProteins } from "CommonTypes";
import { allAminoAcid } from "@utils/aminoAcid";
import "./ProteinAlignment.scss";

interface IProteinAlignmentProps {
  currentProteins: TProteins;
}

const ProteinAlignment = ({ currentProteins }: IProteinAlignmentProps) => {
  const [isOpenSnack, setIsOpenSnack] = useState(false);

  const getAminoAcidColor = (aminoAcid: string) => {
    return allAminoAcid[aminoAcid] || {};
  };

  const getColorForSecondProtein = (index: number) => {
    const acid1: string = currentProteins.protein1[index] || "";
    const acid2: string = currentProteins.protein2[index] || "";

    return acid1 !== acid2 ? getAminoAcidColor(acid2) : {};
  };

  useEffect(() => {
    const handleCopySequence = () => {
      const selection = window.getSelection();
      const proteinsWrapper = document.querySelector(".wrapper");

      if (selection && selection.toString().length > 0 && proteinsWrapper) {
        const range = selection.getRangeAt(0);
        if (proteinsWrapper.contains(range.startContainer)) {
          const sequence = selection.toString();
          navigator.clipboard
            .writeText(sequence)
            .then(() => {
              setIsOpenSnack(true);
            })
            .catch((err) => console.log(err));
        }
      }
    };

    document.addEventListener("mouseup", handleCopySequence);
    document.addEventListener("touchend", handleCopySequence);

    return () => {
      document.removeEventListener("mouseup", handleCopySequence);
      document.removeEventListener("touchend", handleCopySequence);
    };
  }, [currentProteins]);

  const handleCloseSnack = () => {
    setIsOpenSnack(false);
  };

  if (
    (!currentProteins.protein1 || !currentProteins.protein2) &&
    currentProteins.protein1?.length === currentProteins.protein2?.length
  ) {
    return null;
  }

  return (
    <>
      <Snackbar
        open={isOpenSnack}
        autoHideDuration={1000}
        message={"Последовательность аминокислот скопирована"}
        className="messageSnack"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnack}
      />
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
    </>
  );
};

export default ProteinAlignment;
