import React, { useState } from "react";
import ProteinForm from "@components/proteinForm/ProteinForm";
import ProteinAlignment from "@components/proteinAlignment/ProteinAlignment";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { allAminoAcid } from "@utils/aminoAcid";
import { TProteins } from "CommonTypes";
import "./App.scss";

const App = () => {
  const [currentProteins, setCurrentProteins] = useState<null | TProteins>(
    null
  );

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
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <>
      <ProteinForm
        control={control}
        handleSubmit={handleSubmit}
        reset={reset}
        errors={errors}
        cbHandleSetProteins={setCurrentProteins}
      />
      {currentProteins && Object.keys(errors).length === 0 && (
        <ProteinAlignment currentProteins={currentProteins} />
      )}
    </>
  );
};

export default App;
