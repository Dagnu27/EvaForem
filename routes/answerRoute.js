const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { postAnswer, getAnswers } = require("../controller/answerController");

router.use(authMiddleware);

router.post("/", postAnswer);
router.get("/:question_id", getAnswers);

module.exports = router;