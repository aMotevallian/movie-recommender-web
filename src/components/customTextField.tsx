import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      InputLabelProps={{
        ...(props.InputLabelProps || {}), // Spread existing props
        style: { color: "white", ...(props.InputLabelProps?.style || {}) }, // Merge styles
      }}
      InputProps={{
        ...(props.InputProps || {}), // Spread existing props
        style: { color: "white", ...(props.InputProps?.style || {}) }, // Merge styles
      }}
      variant="standard"
      sx={{
        "& .MuiInput-underline:before": {
          borderBottomColor: "white", // Bottom line before focus
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "white", // Bottom line after focus
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "white", // Bottom line on hover
        },
        ...(props.sx || {}), // Merge sx styles
      }}
    />
  );
};

export default CustomTextField;
