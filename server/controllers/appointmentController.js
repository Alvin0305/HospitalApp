import pool from "../db.js";
import { addLog } from "./auditlogController.js";

export const createAppointment = async (req, res) => {
  const { patient_id, doctor_id } = req.params;
  const { start_time, end_time, notes } = req.body;
  const date = start_time.split("T")[0];

  try {
    const doctor = await pool.query(
      `SELECT allow_direct_booking FROM doctors WHERE doctor_id = ${doctor_id}`
    );
    let status = "requested";
    if (doctor.rows[0].allow_direct_booking) {
      status = "scheduled";
    }

    const result = await pool.query(
      `INSERT INTO 
        appointments (patient_id, doctor_id, start_time, end_time, notes, status, date)
        values ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
      [patient_id, doctor_id, start_time, end_time, notes, status, date]
    );
    res.json(result.rows[0]);
    addLog(
      patient_id,
      "insert",
      "appointments",
      "patient requested for appointment"
    );
  } catch (err) {
    res
      .status(500)
      .json({ error: `error in creating appointment: ${err.message}` });
  }
};

export const changeAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE appointments 
      SET status = $1
      WHERE appointment_id = $2
      RETURNING *
          `,
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `error in changing appointment status: ${err.message}` });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  const { id } = req.params;
  const { status, date, comparison } = req.body;
  console.log(date);

  try {
    let query = `SELECT * FROM appointments WHERE patient_id = $1`;
    const params = [id];
    let paramIndex = 2;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (date && comparison) {
      let comparisonOperator;
      if (comparison === "equal") comparisonOperator = "=";
      else if (comparison === "less") comparisonOperator = "<";
      else if (comparison === "greater") comparisonOperator = ">";
      else return res.status(400).json({ error: "Invalid comparison type" });

      query += ` AND date::date ${comparisonOperator} $${paramIndex}::date`;
      params.push(date);
      paramIndex++;
    }

    query += ` ORDER BY date DESC`;
    console.log(query);
    console.log(params);

    const result = await pool.query(query, params);

    if (result.rowCount == 0)
      return res.status(404).json({ error: "No appointments" });
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `error in getting user appointment: ${err.message}` });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  const { id } = req.params;
  const { status, date, comparison } = req.body;
  console.log(date);

  try {
    let query = `SELECT * FROM appointments WHERE doctor_id = $1`;
    const params = [id];
    let paramIndex = 2;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (date && comparison) {
      let comparisonOperator;
      if (comparison === "equal") comparisonOperator = "=";
      else if (comparison === "less") comparisonOperator = "<";
      else if (comparison === "greater") comparisonOperator = ">";
      else return res.status(400).json({ error: "Invalid comparison type" });

      query += ` AND date::date ${comparisonOperator} $${paramIndex}::date`;
      params.push(date);
      paramIndex++;
    }

    query += ` ORDER BY date DESC`;
    console.log(query);
    console.log(params);

    const result = await pool.query(query, params);

    if (result.rowCount == 0)
      return res.status(404).json({ error: "No appointments" });
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `error in getting doctor appointment: ${err.message}` });
  }
};
