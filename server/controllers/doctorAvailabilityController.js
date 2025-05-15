import pool from "../db.js";

export const addDoctorAvailability = async (req, res) => {
  const { id } = req.params;
  const { day_of_week, start_time, end_time } = req.body;
  console.log(id, day_of_week, start_time, end_time);
  try {
    const result = await pool.query(
      `INSERT INTO
        doctor_availability (doctor_id, day_of_week, start_time, end_time)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [id, day_of_week, start_time, end_time]
    );
    if (result.rowCount === 0)
      return res.status(400).json({ error: "Cannot insert into table" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: `creating doctor availability failed due to ${err.message}`,
    });
  }
};

export const getDoctorAvailabilityByDoctorId = async (req, res) => {
  const { id } = req.params;

  try {
    let result;
    if (req.body) {
      result = await pool.query(
        `SELECT * FROM doctor_availability WHERE doctor_id = $1 AND day_of_week = $2`,
        [id, req.body.day_of_week]
      );
    } else {
      result = await pool.query(
        `SELECT * FROM doctor_availability WHERE doctor_id = $1`,
        [id]
      );
    }

    if (result.rowCount === 0)
      return res.status(400).json({ error: "No schedule" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: `fetching doctor availability failed due to ${err.message}`,
    });
  }
};

export const updateDoctorAvailability = async (req, res) => {
  const { id } = req.params;
  let { doctor_id, day_of_week, start_time, end_time } = req.body;

  try {
    const prevSchedule = await pool.query(
      `SELECT * FROM doctor_availability WHERE doctor_availability_id = $1`,
      [id]
    );
    if (!doctor_id) doctor_id = prevSchedule.rows[0].doctor_id;
    if (!day_of_week) day_of_week = prevSchedule.rows[0].day_of_week;
    if (!start_time) start_time = prevSchedule.rows[0].start_time;
    if (!end_time) end_time = prevSchedule.rows[0].end_time;

    const result = await pool.query(
      `UPDATE doctor_availability SET
        doctor_id = $1,
        day_of_week = $2,
        start_time = $3,
        end_time = $4
        WHERE doctor_availability_id = $5
        RETURNING *`,
      [doctor_id, day_of_week, start_time, end_time, id]
    );

    if (result.rowCount === 0)
      return res.status(400).json({ error: "No schedule" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: `updating doctor availability failed due to ${err.message}`,
    });
  }
};

export const deleteDoctorAvailability = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM doctor_availability
          WHERE doctor_availability_id = $1`,
      [id]
    );

    if (result.rowCount === 0)
      return res.status(400).json({ error: "No schedule" });
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: `deleting doctor availability failed due to ${err.message}`,
    });
  }
};

export const getDoctorsAvailableInRange = async (req, res) => {
  const { day_of_week, start_time, end_time } = req.body;

  try {
    let result;
    if (day_of_week) {
      result = await pool.query(
        `SELECT * FROM doctor_availability
        JOIN doctors ON doctor_availability.doctor_id = doctors.doctor_id
        JOIN users ON doctors.doctor_id = users.user_id
            WHERE 
            day_of_week = $1
            AND (start_time <= $2
            OR end_time >= $3)`,
        [day_of_week, start_time, end_time]
      );
    } else {
      result = await pool.query(
        `SELECT * FROM doctor_availability
        JOIN doctors ON doctor_availability.doctor_id = doctors.doctor_id
        JOIN users ON doctors.doctor_id = users.user_id
                  WHERE start_time <= $1
                  OR end_time >= $2`,
        [start_time, end_time]
      );
    }

    if (result.rowCount === 0)
      return res.status(400).json({ error: "No schedule" });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: `fetching doctors available in range failed due to ${err.message}`,
    });
  }
};
