import React, { useState } from "react";
import Select from "react-select";
import { colourMap } from "../../../../../Assets";

type ColourOption = {
  value: string;
  label: string;
};

const colourOptions: ColourOption[] = Object.entries(colourMap).map(
  ([name]) => ({
    value: name,
    label: name
  })
);

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
    backgroundColor: state.isFocused ? state.data.color : 'white',
    cursor: 'pointer',
  }),
};

type ColourTagsInputProps = {
  onChange: (selectedColours: string[]) => void;
};

function ColourTagsInput({ onChange }: ColourTagsInputProps) {
  const [selectedColours, setSelectedColours] = useState<ColourOption[]>([]);

  const handleChange = (selected: any) => {
    const updated = selected || [];
    setSelectedColours(updated);
    onChange(updated.map((colour: ColourOption) => colour.value)); // send array of names
  };

  return (
    <Select
      isMulti
      options={colourOptions}
      value={selectedColours}
      onChange={handleChange}
      placeholder="Search and select colours..."
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
    />
  );
}

export default ColourTagsInput;
