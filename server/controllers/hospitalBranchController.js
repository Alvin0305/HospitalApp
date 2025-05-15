import pool from "../db.js";

export const createBranch = async (req, res) => {
  const { id } = req.params;
  const { branch_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO 
        hospital_branches (head_hospital_id, branch_hospital_id)
        VALUES ($1, $2)
        RETURNING *`,
      [id, branch_id]
    );
    if (result.rowCount === 0)
      return res.status(400).json({ error: "Cannot insert" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `create branch error ${err.message}` });
  }
};

export const deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM hospital_branches 
      WHERE branch_hospital_id = $1`,
      [id]
    );
    res.json({ message: "hospital branch deleted succesfully" });
  } catch (err) {
    res.status(500).json({ error: `delete branch error ${err.message}` });
  }
};

export const deleteHeadHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM hospital_branches 
        WHERE head_hospital_id = $1`,
      [id]
    );
    res.json({ message: "hospital hea deleted succesfully" });
  } catch (err) {
    res.status(500).json({ error: `delete head hospital error ${err.message}` });
  }
};

export const getAllBranches = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM hospital_branches
      JOIN hospitals ON hospital_branches.branch_hospital_id = hospitals.hospital_id
      WHERE head_hospital_id = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: `get branch error ${err.message}` });
  }
};
