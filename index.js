const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
require("./models/User");
require("./services/passport");
const keys = require("./config/keys")

mongoose.connect(keys.mongoURI)

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


