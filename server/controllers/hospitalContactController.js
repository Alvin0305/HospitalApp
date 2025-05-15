import pool from "../db.js";

export const addPhoneNumber = async (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO 
        hospital_contacts (hospital_id, phone)
        VALUES ($1, $2) RETURNING *`,
      [id, phone]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: `creating hospital contact failed with error ${err.message}`,
    });
  }
};

export const deletePhoneNumber = async (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  try {
    const result = await pool.query(
      `DELETE FROM hospital_contacts 
        WHERE hospital_id = $1
        AND phone = $2`,
      [id, phone]
    );

    res.json({ message: "hospital contact deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: `deleting hospital contact failed with error ${err.message}`,
    });
  }
};

export const getAllPhoneNumberByHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM hospital_contacts 
          WHERE hospital_id = $1`,
      [id]
    );
    if (result.rowCount === 0)
      return res
        .status(400)
        .json({ message: "No Contact number for the hospital" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: `fetching hospital contact failed with error ${err.message}`,
    });
  }
};

export const getAllPhoneNumbers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM hospital_contacts`);
    if (result.rowCount === 0)
      return res.status(400).json({ message: "No Contact numbers" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: `fetching hospital contact failed with error ${err.message}`,
    });
  }
};
