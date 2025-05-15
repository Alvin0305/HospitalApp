import pool from "../db.js";

export const createPatient = async (patient_id) => {
  try {
    const result = await pool.query(
      "INSERT INTO patients(patient_id) VALUES ($1) RETURNING *",
      [patient_id]
    );
    console.log("patient succesfully created:", result.rows[0]);
  } catch (err) {
    console.log("creation of patient error:", err.message);
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * from 
                users JOIN patients
                ON users.user_id = patients.patient_id
                `
    );
    if (result.rows.length == 0)
      return res.status(404).json({ error: "No patients yet" });
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `get patients failed due to: ${err.message}` });
  }
};

export const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT *
        FROM users
        JOIN patients ON users.user_id = patients.patient_id 
        JOIN user_contacts ON users.user_id = user_contacts.user_id
        WHERE users.user_id = $1
            `,
      [id]
    );
    if (result.rows.length == 0)
      return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `get patient failed due to: ${err.message}` });
  }
};
