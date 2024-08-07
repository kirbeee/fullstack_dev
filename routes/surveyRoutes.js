const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const route = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");

route.route("/api/surveys")
    .post(requireLogin,requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            console.log(err)
            res.status(422).send
        }

    })

route.route("/api/surveys/:surveyId/:choice")
    .get((req, res) => {
        res.send("Thanks for voting!");
    })

route.route("/api/surveys/webhooks")
    .post( (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
        .map((item) => {
            const email = item.recipient;
            const url = item.url;
            if (url) {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            }
        })
        .compact()
        .uniqBy("email", "surveyId")
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false },
                    },
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { "recipients.$.responded": true },
                    lastResponded: new Date(),
                }
            ).exec();
        })
        .value();

    res.send({});
});

// version of the sendgrid webhook handler that uses lodash chain
route.route('api/surveys/webhooks')
.post((req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false },
                    },
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date(),
                }
            ).exec();
        })
        .value();
});

module.exports = route;