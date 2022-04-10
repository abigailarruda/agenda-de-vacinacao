export const customStyles = {
  headRow: {
    style: {
      minHeight: '3rem',
      borderBottomColor: '#E2E8F0',
    },
  },
  headCells: {
    style: {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
    },
  },
  head: {
    style: {
      color: '#38A169',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
  },
  rows: {
    style: {
      'fontSize': '1rem',
      'fontWeight': 400,
      'color': '#1A202C',
      'backgroundColor': '#FFFFFF',
      'minHeight': '3rem',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#E2E8F0',
      },
    },
  },
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1A202C',
      backgroundColor: '#FFFFFF',
    },
  },
  cells: {
    style: {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
    },
  },
  pagination: {
    style: {
      fontSize: '12px',
      minHeight: '3rem',
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: '#E2E8F0',
      color: '#718096',
      textTransform: 'uppercase',
    },
    pageButtonsStyle: {
      'borderRadius': '4px',
      'height': '3rem',
      'width': '3rem',
      'padding': '0.5rem',
      'color': '#38A169',
      'fill': '#38A169',
      'backgroundColor': 'transparent',
      '&:disabled': {
        cursor: 'unset',
        color: '#CBD5E0',
        fill: '#CBD5E0',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: 'transparent',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: 'transparent',
      },
    },
  },
};
