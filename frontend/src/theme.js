import { createMuiTheme }  from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#121212'
    },
    primary: {
      main: '#f70a35'
    },
    navbar: {
      main: '#272727'
    },
    text: {
      primary: '#d1d5db'
    }
  },
  typography: {
    h1: {
      fontWeight: 600
    },
    body1: {
      fontSize: '20px'
    }
  }
});

const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: '#eae0cc'
    },
    primary: {
      main: '#f70a35'
    },
    navbar: {
      main: '#272727'
    },
    text: {
      primary: '#d1d5db'
    }
  },
  typography: {
    body1: {
      fontSize: "20px"
    },
    h1: {
      fontWeight: 600
    }
  }
});

export { darkTheme, lightTheme }