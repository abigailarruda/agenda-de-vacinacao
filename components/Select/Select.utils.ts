import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
  control: (defaultStyles) => ({
    ...defaultStyles,
    'height': '2.5rem',
    'width': '100% !important',
    'border': '1px solid #E2E8F0',
    'display': 'flex',
    'borderRadius': '4px',
    'boxShadow': '0 !important',
    ':hover': {
      borderColor: '#E2E8F0',
    },
  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    padding: '0 1rem',
  }),
  indicatorsContainer: (defaultStyles) => ({
    ...defaultStyles,
    svg: {
      fill: '#A0AEC0',
    },
  }),
  indicatorSeparator: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: '#E2E8F0',
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#A0AEC0',
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    svg: {
      fill: '#A0AEC0',
    },
  }),
  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: '#1A202C',
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    borderRadius: '4px',
    boxShadow: '0 !important',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
  }),
  menuPortal: (defaultStyles) => ({
    ...defaultStyles,
    zIndex: 9999,
  }),
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    'color': '#1A202C',
    'backgroundColor': state.isSelected ? '#EDF2F7' : '#FFFFFF',
    ':active': {
      backgroundColor: '#EDF2F7 !important',
    },
  }),
};
