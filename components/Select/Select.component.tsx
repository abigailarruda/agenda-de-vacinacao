import Select, { Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { customStyles } from './Select.utils';
import { useRef, useEffect } from 'react';

export interface Option {
  label: string | number;
  value: string | number;
}

interface Props extends SelectProps {
  name: string;
  options: Option[];
  placeholder: string;
  onChange?: (option: Option) => void;
}

const SelectInput = ({ name, options, placeholder, onChange, ...rest }: Props) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.selectValue) {
            return [];
          }

          return ref.state.selectValue.map((option: Option) => option.value);
        }

        if (!ref.state.selectValue) {
          return '';
        }

        return ref.state.selectValue[0]?.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Select
      defaultValue={defaultValue}
      maxMenuHeight={150}
      name={name}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      ref={selectRef}
      styles={customStyles}
      {...rest}
    />
  );
};

export default SelectInput;
