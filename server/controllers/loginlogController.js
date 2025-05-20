import pool from "../db.js";

export const handleLogin = async (userId, ip = "") => {
  try {
    const result = await pool.query(
      "INSERT INTO login_logs (user_id, ip_address, status) VALUES ($1, $2, $3) RETURNING *",
      [userId, ip, "active"]
    );
    console.log(result.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

export const handleLogout = async (userId, ip = "") => {
  try {
    const result = await pool.query(
      "INSERT INTO login_logs (user_id, ip_address, status) VALUES ($1, $2, $3) RETURNING *",
      [userId, ip, "inactive"]
    );
    console.log(result.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

export const getLastLoginDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await pool.query(
      `SELECT * FROM login_logs
      WHERE user_id = $1
      ORDER BY time DESC
      LIMIT 1`,
      [id]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ error: `fetching login log failed due to ${err.message}` });
  }
};
