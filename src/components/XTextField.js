import React from "react";
import { TextField } from "@material-ui/core";

export default function XTextField(props) {
  const {
    name,
    label,
    value,
    error = null,
    placeholder,
    onChange,
    ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size="small"
      margin="dense"
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
