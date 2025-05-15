import pool from "../db.js";
import { addLog } from "./auditlogController.js";

export const sendNotification = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO 
        notifications (user_id, message)
        VALUES ($1, $2)
        RETURNING *`,
      [id, message]
    );
    if (result.rowCount === 0)
      return res.status(400).json({ error: "Notification failed to send" });
    res.json(result.rows[0]);
    addLog(id, "insert", "notifications", `notification send to ${id}`);
  } catch (err) {
    res
      .status(500)
      .json({ error: `error creating notification: ${err.message}` });
  }
};

export const readNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE notifications
      SET status = 'read'
      WHERE notification_id = $1
          RETURNING *`,
      [id]
    );
    if (result.rowCount === 0)
      return res.status(400).json({ error: "Notification failed to update" });
    res.json(result.rows[0]);
    addLog(id, "update", "notifications", "notification read");
  } catch (err) {
    res
      .status(500)
      .json({ error: `error updating notification: ${err.message}` });
  }
};
