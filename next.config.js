// const withCSS = require("@zeit/next-css");
// // const webpack = require('webpack');
//
// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: false,
//   },
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: "empty",
//       };
//     }
//     return config;
//   },
//   env: {
//     prod: "https://www.isitbetterthere.com",
//     dev: "http://localhost:3000",
//   }
// });
//
require('dotenv').config()

module.exports = {
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
    env: {
        // prod: "https://www.isitbetterthere.com",
        // local: "http://localhost:3000",
        ENVIRONMENT: process.env.ENVIRONMENT,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        MONGODB_URI: process.env.MONGODB_URI,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        GOOGLE_USER: process.env.GOOGLE_USER,
        GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
    }
}
