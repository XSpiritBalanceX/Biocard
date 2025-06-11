import React from "react";
import ProteinForm from "@components/proteinForm/ProteinForm";
import ProteinAlignment from "@components/proteinAlignment/ProteinAlignment";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { allAminoAcid } from "@utils/aminoAcid";
import "./App.scss";

const App = () => {
  const allowedCharacters = Object.keys(allAminoAcid).join("") + "-";

  const allowedCharactersRegex = new RegExp(`^[${allowedCharacters}]+$`);

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
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <ProteinForm
        control={control}
        handleSubmit={handleSubmit}
        reset={reset}
        errors={errors}
      />
      {Object.keys(errors).length === 0 && (
        <ProteinAlignment currentProteins={getValues()} />
      )}
    </>
  );
};

export default App;
