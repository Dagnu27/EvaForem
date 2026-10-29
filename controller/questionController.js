const dbconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

const serverError = (res, error) => {
  console.log(error.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
  });
};

// POST /api/question
async function postQuestion(req, res) {
  const { title, description } = req.body;
  const userid = req.user.userid;

  if (!title?.trim() || !description?.trim()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
  if (title.length > 200) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Title must not exceed 200 characters",
    });
  }

  try {
    await dbconnection.query(
      "INSERT INTO questions (userId, title, description) VALUES (?,?,?)",
      [userid, title.trim(), description.trim()]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Question created successfully" });
  } catch (error) {
    return serverError(res, error);
  }
}

// GET /api/question  (newest first)
async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbconnection.query(
      `SELECT q.questionId AS question_id, q.title, q.description AS content,
              u.username AS user_name, q.created_at
       FROM questions q
       JOIN users u ON q.userId = u.userId
       ORDER BY q.created_at DESC, q.questionId DESC`
    );
    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    return serverError(res, error);
  }
}

// GET /api/question/:question_id
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;
  try {
    const [rows] = await dbconnection.query(
      `SELECT q.questionId AS question_id, q.title, q.description AS content,
              q.userId AS user_id, u.username AS user_name, q.created_at
       FROM questions q
       JOIN users u ON q.userId = u.userId
       WHERE q.questionId = ?`,
      [question_id]
    );
    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }
    return res.status(StatusCodes.OK).json({ question: rows[0] });
  } catch (error) {
    return serverError(res, error);
  }
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };