import PropTypes from "prop-types";
import {Provider as AuthProvider} from "next-auth/client";
import {ThemeProvider} from "styled-components";
import {createGenerateClassName, StylesProvider,} from "@material-ui/core/styles";
import {ThemeProvider as MuiProvider} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../lib/theme";
import App from "next/app";
import {Router} from "next/dist/client/router";
import NProgress from "nprogress";
import "../public/nprogress.css";
import {useStore} from '../store/store'
import {Provider as ReduxProvider} from 'react-redux'
import {useEffect} from "react";

NProgress.configure({
    showSpinner: false,
    trickleRate: 0.1,
    trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});

Router.events.on("routeChangeError", () => {
    NProgress.done();
});

const generateClassName = createGenerateClassName({
    productionPrefix: "myclasses-",
});

export default function MyApp({ Component, pageProps }) {

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, [])
    const store = useStore(pageProps.initialReduxState)

    return (
        <AuthProvider
            options={{
                clientMaxAge: 0,
                keepAlive: 0,
            }}
            session={pageProps.session}
        >
            <StylesProvider injectFirst>
                <MuiProvider theme={theme}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <ReduxProvider store={store}>
                            <Component {...pageProps} />
                        </ReduxProvider>
                    </ThemeProvider>
                </MuiProvider>
            </StylesProvider>
        </AuthProvider>
    )
}

// class MyApp extends App {
//
//     componentDidMount() {
//         // Remove the server-side injected CSS.
//         const jssStyles = document.querySelector("#jss-server-side");
//         if (jssStyles) {
//             jssStyles.parentElement.removeChild(jssStyles);
//         }
//     }
//
//     render() {
//         const {Component, pageProps} = this.props;
//         const store = useStore(pageProps.initialReduxState)
//
//         return (
//             <AuthProvider
//                 options={{
//                     clientMaxAge: 0,
//                     keepAlive: 0,
//                 }}
//                 session={pageProps.session}
//             >
//                 <StylesProvider injectFirst>
//                     <MuiProvider theme={theme}>
//                         <ThemeProvider theme={theme}>
//                             <CssBaseline/>
//                             <ReduxProvider store={store}>
//                                 <Component {...pageProps} />
//                             </ReduxProvider>
//                         </ThemeProvider>
//                     </MuiProvider>
//                 </StylesProvider>
//             </AuthProvider>
//         );
//     }
// }
//
// export default MyApp;
