const dbconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

const serverError = (res, error) => {
  console.log(error.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
  });
};

const questionNotFound = (res) =>
  res.status(StatusCodes.NOT_FOUND).json({
    error: "Not Found",
    message: "The requested question could not be found.",
  });

// POST /api/answer
async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
  const userid = req.user.userid;

  if (!questionid || !answer?.trim()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide answer",
    });
  }

  try {
    const [q] = await dbconnection.query(
      "SELECT questionId FROM questions WHERE questionId = ?",
      [questionid]
    );
    if (q.length === 0) return questionNotFound(res);

    await dbconnection.query(
      "INSERT INTO answers (questionId, userId, answer) VALUES (?,?,?)",
      [questionid, userid, answer.trim()]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Answer posted successfully" });
  } catch (error) {
    return serverError(res, error);
  }
}

// GET /api/answer/:question_id
async function getAnswers(req, res) {
  const { question_id } = req.params;
  try {
    const [q] = await dbconnection.query(
      "SELECT questionId FROM questions WHERE questionId = ?",
      [question_id]
    );
    if (q.length === 0) return questionNotFound(res);

    const [answers] = await dbconnection.query(
      `SELECT a.answerId AS answer_id, a.answer AS content,
              u.username AS user_name, a.created_at
       FROM answers a
       JOIN users u ON a.userId = u.userId
       WHERE a.questionId = ?
       ORDER BY a.created_at DESC, a.answerId DESC`,
      [question_id]
    );
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    return serverError(res, error);
  }
}

module.exports = { postAnswer, getAnswers };