export const API_SERVER = process.env.NODE_ENV === "production" ? process.env.ENVIRONMENT === 'production' ? "https://www.isitbetterthere.com" : "https://isitbetterthere-dev.herokuapp.com" : "http://localhost:3000"

// export const API_SERVER = process.env.NODE_ENV === "production" && process.env.HEROKU_ENV === 'development' ? "https://isitbetterthere-dev.herokuapp.com" : process.env.NODE_ENV === 'development' ? process.env.local : "https://www.isitbetterthere.com"

// export const API_SERVER = process.env.HEROKU_ENV === 'development' ? "https://isitbetterthere-dev.herokuapp.com" : process.env.NODE_ENV === 'development' ? process.env.local : "https://www.isitbetterthere.com"