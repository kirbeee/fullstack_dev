const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const router = require("express").Router();

router.route("/api/stripe")
    .post(requireLogin,async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5credits',
            source: req.body.id
        });
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });

module.exports = router;