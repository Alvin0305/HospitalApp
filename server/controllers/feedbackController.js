import pool from "../db.js";

export const createFeedBack = async (req, res) => {
  const { user_id, doctor_id } = req.params;
  const { rating, comment } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO feedbacks (user_id, doctor_id, rating, comment)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, doctor_id, rating, comment]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `error creating feedback due to ${err.message}` });
  }
};

export const deleteFeedBack = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM feedbacks WHERE feedback_id = $1`,
      [id]
    );
    res.json({ message: "Feedback deleted succesfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `error creating feedback due to ${err.message}` });
  }
};

export const updateFeedBack = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const result = await pool.query(
      `UPDATE feedbacks SET rating = $1, comment = $2 WHERE feedback_id = $3 RETURNING *`,
      [rating, comment, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `error creating feedback due to ${err.message}` });
  }
};
