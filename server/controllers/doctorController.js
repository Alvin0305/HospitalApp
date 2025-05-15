import pool from "../db.js";

export const createDoctor = async (doctor_id) => {
  try {
    const result = await pool.query(
      "INSERT INTO doctors(doctor_id) VALUES ($1) RETURNING *",
      [doctor_id]
    );
    console.log("doctor succesfully created:", result.rows[0]);
  } catch (err) {
    console.log("creation of doctor error:", err.message);
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * from 
                  users JOIN doctors
                  ON users.user_id = doctors.doctor_id
                  `
    );
    if (result.rows.length == 0)
      return res.status(404).json({ error: "No doctors yet" });
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `get doctors failed due to: ${err.message}` });
  }
};

export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * 
        from users 
        JOIN doctors ON users.user_id = doctors.doctor_id
        JOIN user_contacts ON doctors.doctor_id = user_contacts.user_id
        WHERE users.user_id = $1
        `,
      [id]
    );
    if (result.rows.length == 0)
      return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `get doctor failed due to: ${err.message}` });
  }
};

export const getDoctorsBySpeciality = async (req, res) => {
  const { speciality } = req.body;

  try {
    const result = await pool.query(
      `SELECT * from 
                users JOIN doctors
                ON users.user_id = doctors.doctor_id
                WHERE speciality = $1
                `,
      [speciality]
    );
    if (result.rows.length == 0)
      return res.status(404).json({ error: "No doctors in this speciality" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: `get doctor failed due to: ${err.message}` });
  }
};
