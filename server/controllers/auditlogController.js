import pool from "../db.js";

export const addLog = async (
  action_by,
  action,
  affected_table,
  remarks = ""
) => {
  try {
    const result = await pool.query(
      `INSERT INTO 
            audit_logs (action_by, action, affected_table, remarks)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
      [action_by, action, affected_table, remarks]
    );
    console.log(result.rows[0]);
  } catch (err) {
    console.log(`error in adding log ${err.message}`);
  }
};
