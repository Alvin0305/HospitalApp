import pool from "../db.js";

export const createDepartment = async (req, res) => {
  const { hospital_id, name, head_doctor_id } = req.body;
  console.log(hospital_id, name, head_doctor_id);
  try {
    let result;
    if (head_doctor_id) {
      result = await pool.query(
        `INSERT INTO 
            departments (hospital_id, name, head_doctor_id)
            VALUES ($1, $2, $3) RETURNING *`,
        [hospital_id, name, head_doctor_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO 
            departments (hospital_id, name)
            VALUES ($1, $2) RETURNING *`,
        [hospital_id, name]
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `creating department failed with error ${err.message}` });
  }
};

export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  let { name, head_doctor_id } = req.body;
  console.log(name, head_doctor_id);
  try {
    const previousDept = await pool.query(
      `SELECT * FROM departments WHERE department_id = $1`,
      [id]
    );
    if (!name) name = previousDept.rows[0].name;
    if (!head_doctor_id) head_doctor_id = previousDept.rows[0].head_doctor_id;
    const result = await pool.query(
      `UPDATE departments 
      SET name = $1, 
      head_doctor_id = $2
      WHERE department_id = $3
       RETURNING *`,
      [name, head_doctor_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `updating department failed with error ${err.message}` });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM departments WHERE department_id = $1`,
      [id]
    );
    if (result.rowCount == 0)
      return res.status(404).json({ error: "department not found" });
    res.json({ message: "Department deleted succesfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `deleting department failed with error ${err.message}` });
  }
};

export const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM departments WHERE department_id = $1`,
      [id]
    );
    if (result.rowCount == 0)
      return res.status(404).json({ error: "department not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetching department failed with error ${err.message}` });
  }
};

export const getAllDepartment = async (req, res) => {
  const { hospital_id } = req.body;
  try {
    let result;
    if (hospital_id) {
      result = await pool.query(
        `SELECT * FROM departments WHERE hospital_id = $1`,
        [hospital_id]
      );
    } else {
      result = await pool.query(`SELECT * FROM departments`);
    }

    if (result.rowCount == 0)
      return res.status(404).json({ message: "no departments found" });
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetching department failed with error ${err.message}` });
  }
};
