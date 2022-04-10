import InputMask from 'react-input-mask';
import { FormControl, FormHelperText, Input as FormInput, InputProps } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Props extends InputProps {
  name: string;
  placeholder: string;
  required?: boolean;
  mask?: string;
}

const Input = ({ name, placeholder, mask, required, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <FormControl isInvalid={!!error}>
      <FormInput
        borderRadius="4px"
        defaultValue={defaultValue}
        errorBorderColor="red.500"
        focusBorderColor="green.500"
        id={fieldName}
        name={name}
        placeholder={placeholder}
        ref={inputRef}
        width="100%"
        as={mask ? InputMask : 'input'}
        mask={mask ? mask : ''}
        {...rest}
      />

      {!!error && <FormHelperText color="red.500">{error}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
