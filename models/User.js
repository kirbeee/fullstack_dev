const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const userSchema = new Schema({
    googleId: String
});

mongoose.model("users", userSchema);