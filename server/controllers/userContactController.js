import pool from "../db.js";

export const getUserPhoneNumbers = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM user_contacts WHERE user_id = $1",
      [id]
    );
    if (result.rows.length == 0) {
      res.status(404).json({ error: `Not found` });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: `fetch phone number failed with error ${err.message}`,
    });
  }
};
