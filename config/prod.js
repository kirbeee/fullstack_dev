// prof.js - Production keys here

module.exports = {
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
    stripSecretKey:process.env.STRIPE_SECRET_KEY,
    mailgunKey:process.env.MAILGUN_KEY,
    mailgunDomain:process.env.MAILGUN_DOMAIN,
    redirectDomain : process.env.REDIRECT_DOMAIN,
}