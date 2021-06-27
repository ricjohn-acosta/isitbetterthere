import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {session} from "next-auth/client";
import dbConnect from "../../../server/mongodbConnect";
import {getUserById} from "../../../server/models/user";
import {getUserExperiences} from "../../../server/models/experiences";
import {storeUserData} from "../../../store/actions/users";
import {useDispatch} from "react-redux";

// For more information on options, go to
// https://next-auth.js.org/configuration/options
const options = {
    // site:
    //   process.env.NODE_ENV === "production" ? process.env.prod : process.env.dev,
    providers: [
        // https://next-auth.js.org/providers/email
        // Providers.Email({
        //   server: process.env.EMAIL_SERVER,
        //   from: process.env.EMAIL_FROM,
        // }),
        // https://next-auth.js.org/configuration/providers
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

        // Providers.Facebook({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
        // Providers.Twitter({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        // }),
        // Providers.GitHub({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        // Providers.Discord({
        //     clientId: process.env.DISCORD_CLIENT_ID,
        //     clientSecret: process.env.DISCORD_CLIENT_SECRET,
        // }),
        // Providers.Slack({
        //     clientId: process.env.SLACK_CLIENT_ID,
        //     clientSecret: process.env.SLACK_CLIENT_SECRET,
        // }),
        // Providers.Twitch({
        //     clientId: process.env.TWITCH_CLIENT_ID,
        //     clientSecret: process.env.TWITCH_CLIENT_SECRET,
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
    // database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a seperate secret is defined explicitly for encrypting the JWT.
    // secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
        // maxAge: 10,

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
        signIn: "/signup", // Displays signin buttons
        // signout: '/api/auth/signout', // Displays form with sign out button
        // error: '/api/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/api/auth/verify-request', // Used for check email page
        newUser: "/account-setup", // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        session: async (session, token) => {
            return Promise.resolve({
                ...session,
                ...token,
            });
        },

        jwt: async (token, profile) => {
            const isSignIn = !!profile;
            if (isSignIn) {
                token.id = profile.id;
            }
            return Promise.resolve(token);
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/options#events
    events: {},

    // Eenable debug messages in the console if you are having problems
    debug: false,
};

export default (req, res) => NextAuth(req, res, options);
