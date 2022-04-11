import Select, { Props as SelectProps } from 'react-select';

import { customStyles } from '../Select/Select.utils';

export interface Option {
  label: string | number;
  value: string | number;
}

interface Props extends SelectProps {
  name: string;
  options: Option[];
  placeholder: string;
  onChange?: (option: Option) => void;
  disabled?: boolean;
}

const CommonSelectInput = ({ name, options, placeholder, onChange, disabled, ...rest }: Props) => {
  return (
    <Select
      isDisabled={disabled}
      maxMenuHeight={200}
      menuPosition={'fixed'}
      name={name}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      {...rest}
    />
  );
};

export default CommonSelectInput;
