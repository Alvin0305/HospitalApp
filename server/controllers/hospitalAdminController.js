import pool from "../db.js";

export const createHospitalAdmin = async (id) => {
  try {
    const result = await pool.query(
      `INSERT INTO 
            hospital_admins (hospital_admin_id)
            VALUES ($1) RETURNING *`,
      [id]
    );
    console.log(result.rows[0]);
  } catch (err) {
    console.log("error while creating hospital admin", err.message);
  }
};

export const getAllHospitalAdmins = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM hospital_admins`);
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch hospital admin error ${err.message}` });
  }
};

export const getHospitalAdmin = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await pool.query(
      `SELECT * FROM hospital_admins
        WHERE hospital_admin_id = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch hospital admin error ${err.message}` });
  }
};

export const updateHospitalAdmin = async (req, res) => {
  const { id } = req.params;
  const { hospital_id } = req.body;
  console.log(id);
  try {
    const result = await pool.query(
      `UPDATE hospital_admins
      SET hospital_id = $1
        WHERE hospital_admin_id = $2 
        RETURNING *`,
      [hospital_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch hospital admin error ${err.message}` });
  }
};

export const deleteHospitalAdmin = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await pool.query(
      `DELETE FROM hospital_admins
        WHERE hospital_admin_id = $1 `,
      [id]
    );
    res.json({ message: "Hospital Admin deleted succesfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch hospital admin error ${err.message}` });
  }
};
