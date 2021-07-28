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

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
    env: {
        prod: "https://www.isitbetterthere.com",
        dev: "http://localhost:3000",
    }
}
