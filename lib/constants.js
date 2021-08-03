// export const API_SERVER = process.env.NODE_ENV === "production" ? process.env.HEROKU_ENV === 'production' ? "https://www.isitbetterthere.com" : "https://isitbetterthere-dev.herokuapp.com" : process.env.local

export const API_SERVER = process.env.NODE_ENV === "production" && process.env.HEROKU_ENV === 'development' ? "https://isitbetterthere-dev.herokuapp.com" : process.env.NODE_ENV === 'development' ? process.env.local : "https://www.isitbetterthere.com"

// export const API_SERVER = process.env.HEROKU_ENV === 'development' ? "https://isitbetterthere-dev.herokuapp.com" : process.env.NODE_ENV === 'development' ? process.env.local : "https://www.isitbetterthere.com"