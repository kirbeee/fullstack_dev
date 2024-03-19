const express = require("express")
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("./config/keys")

const app = express();

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    }, (accessToken) => {
        console.log(accessToken)
    }
));
// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
// response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
// scope=profile%20email&
// client_id=348756261817-udt4180h6qra0u3clrle0kgtj07gm767.apps.googleusercontent.com&service=lso&
// o2v=2&
// theme=mn&ddm=0&
// flowName=GeneralOAuthFlow
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


