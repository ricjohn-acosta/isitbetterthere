/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Grouped({label, categories}) {
  const options = categories.map((option) => {
    const firstLetter = option.category[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.category}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
