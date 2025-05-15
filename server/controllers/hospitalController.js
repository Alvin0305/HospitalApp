import pool from "../db.js";

export const createHospital = async (req, res) => {
  const { name, district, address, type } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO 
        hospitals (name, district, address, type)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [name, district, address, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `error creating hospital: ${err.message}` });
  }
};

export const getAllHospitals = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM hospitals`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: `error fetching hospital: ${err.message}` });
  }
};

export const getHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM hospitals WHERE hospital_id = $1`,
      [id]
    );
    if (result.rowCount == 0)
      return res.status(404).json({ error: "Hospital not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `error fetching hospital: ${err.message}` });
  }
};

export const deleteHospitalById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM hospitals WHERE hospital_id = $1`,
      [id]
    );
    if (result.rowCount == 0)
      return res.status(404).json({ error: "Hospital not found" });
    res.json({ message: "Hospital succesfully deleted" });
  } catch (err) {
    res.status(500).json({ error: `error fetching hospital: ${err.message}` });
  }
};

export const updateHospital = async (req, res) => {
  const { id } = req.params;
  let { name, district, address, type } = req.body;
  try {
    const prev = await pool.query(
      "SELECT * FROM hospitals WHERE hospital_id = $1",
      [id]
    );

    if (prev.rowCount === 0)
      return res.status(404).json({ error: "hospital not found" });

    if (!name) name = prev.rows[0].name;
    if (!district) district = prev.rows[0].district;
    if (!address) address = prev.rows[0].address;
    if (!type) type = prev.rows[0].type;

    const result = await pool.query(
      `UPDATE hospitals SET
      name = $1,
      district = $2,
      address = $3, 
      type = $4
      WHERE hospital_id = $5
      RETURNING *
      `,
      [name, district, address, type, id]
    );
    if (result.rowCount == 0)
      return res.status(404).json({ error: "Hospital not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `error fetching hospital: ${err.message}` });
  }
};
