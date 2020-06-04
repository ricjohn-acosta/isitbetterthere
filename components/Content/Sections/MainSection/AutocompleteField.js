/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Grouped({
  label,
  categories,
  onFromValueChange,
  onToValueChange,
  parentToValue,
  parentFromValue,
  isSelected,
}) {
  const [fromValue, setFromValue] = React.useState("");
  const [toValue, setToValue] = React.useState(parentFromValue);

  const options = categories.map((option) => {
    const firstLetter = option.category[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleSelect = (category, event) => {
    if (label === "to") {
      onToValueChange(category);
      setToValue(category);
    } else {
      setFromValue(category);
      onFromValueChange(category);
    }
  };

  const handleInputChange = (to) => {
    if (to) {
      return toValue;
    } else {
      return fromValue
    }
  };

  console.log("FROM VALUE: ", fromValue)
  return (
    <Autocomplete
      id="grouped-demo"
      key={isSelected}
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.category}
      getOptionSelected={(option, value) => option.category === value.category}
      onChange={(event, value) => {
        value === null ? handleSelect("") : handleSelect(value.category);
      }}
      onInputChange={(event, value) => {
        label === "to" ? handleInputChange(true) : handleInputChange(false)
      }}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
