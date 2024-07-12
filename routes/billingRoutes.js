
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripSecretKey);
const router = require("express").Router();

router.route("/api/stripe")
    .post(async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5credits',
            source: req.body.id
        });

        console.log(charge)
    });

module.exports = router;