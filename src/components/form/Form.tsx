import React from "react";
import { Box, Button } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledInput from "@components/field/ControlledInput";
import "./Form.scss";

const Form = () => {
  const allowedCharacters = [
    "A",
    "R",
    "N",
    "D",
    "C",
    "E",
    "Q",
    "G",
    "H",
    "I",
    "L",
    "K",
    "M",
    "F",
    "P",
    "S",
    "T",
    "W",
    "Y",
    "V",
    "-",
  ];

  const allowedCharactersRegex = new RegExp(
    `^[${allowedCharacters.join("")}]+$`
  );

  const validationSchema = Yup.object().shape({
    protein1: Yup.string()
      .required("Введите последовательность аминокислот")
      .test(
        "is-valid",
        "Введено недопустимое значение в аминокислотной последовательности",
        (value) => allowedCharactersRegex.test(value!)
      ),
    protein2: Yup.string()
      .required("Введите последовательность аминокислот")
      .test(
        "is-valid",
        "Введено недопустимое значение в аминокислотной последовательности",
        (value) => allowedCharactersRegex.test(value!)
      )
      .test("match", "Длина последовательностей отличается", function (value) {
        const { protein1 } = this.parent;
        return value && protein1 ? value.length === protein1.length : true;
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitProteins = (data: { protein1: string; protein2: string }) => {
    console.log(data);
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
        <Button type="submit" className="submitButton">
          Сравнить
        </Button>
      </form>
    </Box>
  );
};

export default Form;
