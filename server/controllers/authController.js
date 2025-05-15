import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { handleLogin } from "./loginlogController.js";
import { createDoctor } from "./doctorController.js";
import { createPatient } from "./patientController.js";
import { createHospitalAdmin } from "./hospitalAdminController.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, "user"]
    );
    res.status(201).json({ user: result.rows[0] });
    handleLogin(result.rows[0].user_id);
    createPatient(result.rows[0].user_id);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Registration failed with error: ${err.message}` });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!result.rows) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    if (result.rows.length == 0)
      return res.status(400).json({ error: "Invalid Email" });

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    handleLogin(result.rows[0].user_id);
  } catch (err) {
    res.status(500).json({ error: `Login Failed with error: ${err.message}` });
  }
};

export const registerDoctor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, "doctor"]
    );
    res.status(201).json({ user: result.rows[0] });
    handleLogin(result.rows[0].user_id);
    createDoctor(result.rows[0].user_id);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Registration failed with error: ${err.message}` });
  }
};

export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!result.rows) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    if (result.rows.length == 0)
      return res.status(400).json({ error: "Invalid Email" });

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    handleLogin(result.rows[0].user_id);
  } catch (err) {
    res.status(500).json({ error: `Login Failed with error: ${err.message}` });
  }
};

export const registerHospitalAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, "hospital_admin"]
    );
    res.status(201).json({ user: result.rows[0] });
    handleLogin(result.rows[0].user_id);
    createHospitalAdmin(result.rows[0].user_id);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Registration failed with error: ${err.message}` });
  }
};

export const loginHospitalAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!result.rows) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    if (result.rows.length == 0)
      return res.status(400).json({ error: "Invalid Email" });

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    handleLogin(result.rows[0].user_id);
  } catch (err) {
    res.status(500).json({ error: `Login Failed with error: ${err.message}` });
  }
};
