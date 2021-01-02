const express = require("express");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const router = express.Router()
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const QuestionSchema = require("../schemas/Question");
const config = require("config");
const isValidDate = require("../helpers/validations");

// GET Method
router.get(
    '/questions/:id?',
    async (req, res) => {
        try {
            let { id } = req.params;
            const page = parseInt(req.query.page) || 1;
            const startIndex = (page - 1) * 20;
            const endIndex = page * 20;

            const results = {};
            results.hasNext = true;
            results.hasPrev = true;

            if (id) {
                let question = await QuestionSchema.findById(id);
                res.send(question)
            }
            else {
                let questions = await QuestionSchema.find()
                results.resultQuestions = questions.slice(startIndex, endIndex);
                if (endIndex >= questions.length) {
                    results.hasNext = false
                }
                if (startIndex === 0) {
                    results.hasPrev = false
                }
                res.send(results)
            }

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." })
        }
    }
)

// POST METHOD
router.post(
    '/questions',
    [
        check("email", "Type proper email").isEmail(),
        check("email", "E-mail is required").notEmpty(),
        check("name", "Name is required").notEmpty(),
        check("name", "Name is not valid").isString(),
        check("obs", "Observation is not valid").isString(),
        check("questionDate", "Date is not valid").isDate().custom(isValidDate)
    ],
    async (req, res) => {
        console.log("req", req.body);
        try {
            let { name, email, obs, questionDate } = req.body;
            let question = await QuestionSchema.findOne({ email });

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({ errors: errors.array() })
            }

            if (question) {
                return res.status(401).json({ msg: "There is already a question with this email" })
            }

            question = new QuestionSchema({
                email, name, obs, questionDate
            });

            await question.save();

            const payload = {
                question: {
                    id: question.id
                }
            }

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            )

            res.send(question)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." })
        }
    }
)

module.exports = router