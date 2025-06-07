import React, { useState } from "react";
import Select from "react-select";

type ColourOption = {
  value: string;
  label: string;
};

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
  options: {id: number; name:string}[];
};

function ColourTagsInput({ onChange, options }: ColourTagsInputProps) {
  const [selectedColours, setSelectedColours] = useState<ColourOption[]>([]);

  const colourOptions: ColourOption[] = options.map((colour) => ({
    value: colour.id.toString(),
    label: colour.name,
  }));

  const handleChange = (selected: any) => {
    const updated = selected || [];
    setSelectedColours(updated);
    onChange(updated.map((colour: ColourOption) => colour.value));
  };

  return (
    <Select
      isMulti
      required
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
