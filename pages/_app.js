import PropTypes from "prop-types";
import { Provider as AuthProvider } from "next-auth/client";
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
import wrapper from "../store/store"

const generateClassName = createGenerateClassName({
  productionPrefix: "myclasses-",
});

class MyApp extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, session } = this.props;
    return (
      // <Provider store={store}>
      <AuthProvider session={session}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </AuthProvider>
      // </Provider>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
