import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import {
  MuiThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../lib/theme";
import { Provider } from "react-redux";
import App from "next/app";
import withReduxStore from "../lib/with-redux-store";

const generateClassName = createGenerateClassName({
  productionPrefix: "myclasses-",
});

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { key: 0 };
    this.setKey = this.setKey.bind(this);
  }

  setKey(key) {
    this.setState({ key: key });
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    this.setKey(1);
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <StylesProvider
          injectFirst
          key={this.state.key}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);
