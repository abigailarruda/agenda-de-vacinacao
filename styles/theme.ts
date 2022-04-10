import { extendTheme } from '@chakra-ui/react';

import Button from './button';

const theme = extendTheme({
  fonts: {
    body: 'Work Sans, sans-serif',
    heading: 'Work Sans, sans-serif',
    mono: 'Work Sans, sans-serif',
  },
  components: {
    Button,
  },
});

export default theme;
