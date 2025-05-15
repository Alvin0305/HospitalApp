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
