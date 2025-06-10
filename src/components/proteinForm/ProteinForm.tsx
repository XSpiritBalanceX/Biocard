import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import {
  UseFormReset,
  Control,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import ControlledInput from "@components/field/ControlledInput";
import { TProteins } from "CommonTypes";
import "./ProteinForm.scss";

interface IProteinFormProps {
  control: Control<TProteins>;
  handleSubmit: UseFormHandleSubmit<TProteins>;
  reset: UseFormReset<TProteins>;
  errors: FieldErrors<TProteins>;
}

const ProteinForm = ({
  control,
  handleSubmit,
  reset,
  errors,
}: IProteinFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitProteins = (data: TProteins) => {
    setIsSubmitted(true);
    sessionStorage.setItem("proteins", JSON.stringify(data));
  };

  const handleResetForm = () => {
    reset();
    setIsSubmitted(false);
    sessionStorage.removeItem("proteins");
  };

  const proteinFields = [
    {
      name: "protein1",
      label: "Последовательность аминокислот",
      error: errors?.protein1?.message,
    },
    {
      name: "protein2",
      label: "Последовательность аминокислот",
      error: errors?.protein2?.message,
    },
  ];

  return (
    <Box className="formContainer">
      <p className="formTitle">
        Введите последовательности аминокислот для сравнения
      </p>
      <form onSubmit={handleSubmit(submitProteins)}>
        {proteinFields.map((el, ind) => (
          <ControlledInput
            key={ind}
            control={control}
            name={el.name}
            placeholder={el.label}
            error={el.error}
          />
        ))}
        <Box className="controlsButtonsBox">
          <Button type="submit" className="submitButton">
            Сравнить
          </Button>
          {isSubmitted && (
            <Button
              type="button"
              onClick={handleResetForm}
              className="resetButton"
            >
              Сбросить
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ProteinForm;
