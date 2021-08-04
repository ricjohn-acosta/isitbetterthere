export const API_SERVER = process.env.NODE_ENV === "production" ? process.env.ENVIRONMENT === 'production' ? "https://www.isitbetterthere.com" : "https://isitbetterthere-dev.herokuapp.com" : "http://localhost:3000"


