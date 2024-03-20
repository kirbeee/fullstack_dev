const passport = require("passport");
const router = require("express").Router();

router.route("/auth/google")
    .get(
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

router.route("/auth/google/callback")
    .get(
        passport.authenticate('google', {
        })
    );
router.route("/api/logout")
    .get((req, res) => {
        req.logout();
        res.send(req.user);
    });
router.route("/api/current_user")
    .get((req, res) => {
        res.send(req.user);
    });
module.exports = router;