import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
}

const FormInput = ({ control, name, label }: IProps) => {
  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <TextField
            sx={{ m: 2 }}
            error={!!error}
            label={label}
            value={value}
            onChange={onChange}
            helperText={error?.message}
          />
        </FormControl>
      )}
      name={name}
      control={control}
    />
  );
};

export default FormInput;
