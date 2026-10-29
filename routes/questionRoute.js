const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

router.use(authMiddleware); // every question route requires login

router.get("/", getAllQuestions);
router.post("/", postQuestion);
router.get("/:question_id", getSingleQuestion);

module.exports = router;