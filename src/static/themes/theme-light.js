import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import '@openfonts/ubuntu-mono_latin';

const UbuntuMono = {
  fontFamily: '"Ubuntu Mono", monospace',
  fontStyle: 'normal',
  fontWeight: '400',
};

// palette taken from https://docs.mapbox.com
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4264FB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#3d4451',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#1F3952',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: UbuntuMono,
    fontSize: 16,
    h1: {
      fontSize: '3.5rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#1F3952',
      margin: '10px 0 30px',
    },
    h2: {
      fontSize: '2rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#1F3952',
      margin: '20px 0 20px',
    },
    h3: {
      fontSize: '1.8rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#1F3952',
      margin: '10px 0 20px',
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: '1.6',
      color: '#1F3952',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: '1.4',
      color: '#1F3952',
    },
    button: {
      fontSize: '1rem',
      lineHeight: '1.4',
      color: '#1F3952',
    },
    caption: {
      fontSize: '.8rem',
      lineHeight: '1',
      color: '#1F3952',
    },
  },
  spacing: factor => `${0.25 * factor}rem`, // (Bootstrap strategy)
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [UbuntuMono],
      },
    },
    MuiInput: {
      underline: {
        '&&&&:hover:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        },
      },
    },
  },
});
export default responsiveFontSizes(theme);
