import pool from "../db.js";

export const applyForLeave = async (req, res) => {
  const { id } = req.params;
  const { date, reason } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO 
        doctor_leaves (doctor_id, date, reason)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [id, date, reason]
    );

    if (result.rowCount === 0)
      return res.status(400).json({ error: "Cannot add leave" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `adding leave failed due to ${err.message}` });
  }
};

export const cancelLeaveaApplication = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  try {
    const result = await pool.query(
      `DELETE FROM doctor_leaves 
          WHERE doctor_id = $1 
          AND date = $2
          `,
      [id, date]
    );

    if (result.rowCount === 0)
      return res.status(400).json({ error: "Not Found" });
    res.json({ message: "Leave cancelled successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `cancelling leave failed due to ${err.message}` });
  }
};

export const updateLeaveaApplication = async (req, res) => {
  const { id } = req.params;
  let { date, reason, status } = req.body;
  try {
    const prevLeave = await pool.query(
      `SELECT * FROM doctor_leaves WHERE doctor_id = $1 AND date = $2`,
      [id, date]
    );
    if (!reason) reason = prevLeave.rows[0].reason;
    if (!status) status = prevLeave.rows[0].status;

    const result = await pool.query(
      `UPDATE doctor_leaves 
            SET reason = $1,
            status = $2
            WHERE doctor_id = $3 
            AND date = $4
            RETURNING *
            `,
      [reason, status, id, date]
    );

    if (result.rowCount === 0)
      return res.status(400).json({ error: "Not Found" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `updating leave failed due to ${err.message}` });
  }
};

export const getLeaveApplications = async (req, res) => {
  let { id, date, status } = req.body;

  try {
    let baseQuery = `SELECT * FROM doctor_leaves`;
    let conditions = [];
    let values = [];

    if (id) {
      values.push(id);
      conditions.push(`doctor_id = $${values.length}`);
    }

    if (date) {
      values.push(date);
      conditions.push(`date = $${values.length}`);
    }

    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    const result = await pool.query(baseQuery, values);
    if (result.rowCount === 0)
      return res.status(400).json({ error: "Not Found" });
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetching leave failed due to ${err.message}` });
  }
};
