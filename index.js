const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
require("./models/User");
require("./services/passport");
const keys = require("./config/keys")

mongoose.connect(keys.mongoURI)

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/billingRoutes"));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


