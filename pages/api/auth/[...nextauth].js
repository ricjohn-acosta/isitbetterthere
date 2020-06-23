// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";

// const options = {
//   site: "http://localhost:3000",
//   providers: [
//     Providers.Email({
//       // SMTP connection string or nodemailer configuration object https://nodemailer.com/
//       server: process.env.EMAIL_SERVER,
//       // Email services often only allow sending email from a valid/verified address
//       from: process.env.EMAIL_FROM,
//     }),
//     // When configuring oAuth providers make sure you enabling requesting
//     // permission to get the users email address (required to sign in)
//     Providers.Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     // Providers.Facebook({
//     //   clientId: process.env.FACEBOOK_ID,
//     //   clientSecret: process.env.FACEBOOK_SECRET,
//     // }),
//     // Providers.Twitter({
//     //   clientId: process.env.TWITTER_ID,
//     //   clientSecret: process.env.TWITTER_SECRET,
//     // }),
//     // Providers.GitHub({
//     //   clientId: process.env.GITHUB_ID,
//     //   clientSecret: process.env.GITHUB_SECRET,
//     // }),
//   ],
//   // The 'database' option should be a connection string or TypeORM
//   // configuration object https://typeorm.io/#/connection-options
//   //
//   // Note: You need to install an appropriate node_module for your database
//   database: process.env.DATABASE_URL,
//   // Use JSON Web Tokens instead of database sessions
//   session: {
//     jwt: true,
//     maxAge: 30 * 24 * 60 * 60,
//     updateAge: 24 * 60 * 60,
//     get: async (session, jwt) => {
//       console.log(JSON.parse(JSON.stringify({ jwt })));
//       const jwtObject = JSON.parse(JSON.stringify({ jwt }));
//       session.user.uid = jwtObject.jwt.account.id;
//       return session;
//     },
//   },

//   // Add custom page when next-auth is more stable
//   // pages: {
//   //   signin: "http://localhost:3000/signup",
//   // },

//   // Additional options
//   //
//   // secret: 'abcdef123456789' // Recommended. Used to encode data and to sign cookies. Auto-generated if not specified.
//   // sessionMaxAge: 30*24*60*60*1000, // Expire sessions after 30 days of being idle
//   // sessionUpdateAge: 24*60*60*1000, // Update session expiry only if session was updated more recently than the last 24 hours
//   // verificationMaxAge: 24*60*60*1000, // Expire verification links (for email sign in) after 24 hours
//   // debug: true, // Use this option to enable debug messages in the console
// };

// export default (req, res) => NextAuth(req, res, options);

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// For more information on options, go to
// https://next-auth.js.org/configuration/options
const options = {
  site: "http://localhost:3000",
  providers: [
    // https://next-auth.js.org/providers/email
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // https://next-auth.js.org/configuration/providers
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // Providers.Twitter({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET
    // }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // }),
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   domain: process.env.AUTH0_DOMAIN
    // })
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/database
  //
  // Notes:
  // * You must to install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web Token options
  // JSON Web tokens are only used for sessions if the `jwt: true` option is set
  // (or by default if no database is specified).
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // The JWT secret is used to encrypt and sign the JWT.
    // It is auto-generated at startup if not specified.
    // secret: 'my-secret-123',
    // Custom encode/decode functions for signing + encryption can be specified.
    // if you want to override what is in the JWT or how it is signed.
    // encode: async ({ secret, key, token, maxAge }) => {},
    // decode: async ({ secret, key, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in pages.
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signin: '/api/auth/signin',  // Displays signin buttons
    // signout: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    session: async (session, token) => {
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/options#events
  events: {},

  // Eenable debug messages in the console if you are having problems
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
