import React from "react";
import { TextField, FormHelperText, Box, InputAdornment } from "@mui/material";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import classNames from "classnames";
import "./Fields.scss";

interface IControlledInputProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  placeholder?: string;
  error: React.ReactNode;
  classNameField?: string;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  placeholder,
  error,
  classNameField,
}: IControlledInputProps<T>) => {
  const classBoxInput: string = classNames("controlledFieldBox", {
    errorField: error,
  });

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field }) => {
        return (
          <Box className={classBoxInput}>
            <TextField
              {...field}
              error={!!error}
              className={`controlledField ${classNameField}`}
              placeholder={placeholder ?? ""}
              slotProps={{
                input: {
                  endAdornment: !!error && (
                    <InputAdornment position="end" className="errorIcon">
                      <WarningAmberRoundedIcon />
                    </InputAdornment>
                  ),
                },
              }}
              multiline
              maxRows={8}
            />
            <FormHelperText className="errorMessage">{error}</FormHelperText>
          </Box>
        );
      }}
    />
  );
};

export default ControlledInput;
