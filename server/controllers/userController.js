import pool from "../db.js";

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(`fetching users with id ${id}`);
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (result.rows.length == 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch user by id failed with error ${err.message}` });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log("updating user ", id);
  const {
    password,
    role,
    dob = null,
    gender = null,
    willing_to_donate_blood = false,
    height = null,
    weight = null,
  } = req.body;
  try {
    const update = await pool.query(
      `UPDATE users 
        SET password = $1,
        role = $2,
        dob = $3, 
        gender = $4,
        willing_to_donate_blood = $5,
        height = $6,
        weight = $7
        WHERE user_id = $8
        RETURNING *`,
      [password, role, dob, gender, willing_to_donate_blood, height, weight, id]
    );
    if (update.rows.length == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(update.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `update user error: ${err.message}` });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json({ message: "user deleted succesfully" });
  } catch (err) {
    res.status(500).json({ error: `delete user error: ${err.message}` });
  }
};

export const getUsersWhoDonatesBlood = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE willing_to_donate_blood = true"
    );
    console.log(result);
    if (result.rows.length == 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch user by id failed with error ${err.message}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    if (result.rows.length == 0) {
      res.status(404).json({ error: "No users in database" });
    }
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetch user by id failed with error ${err.message}` });
  }
};

export const getUserByBloodGroup = async (req, res) => {
  const { blood_group } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE blood_group = $1",
      [blood_group]
    );
    if (result.rows.length == 0) {
      res
        .status(404)
        .json({ error: `No user with ${blood_group} blood group in database` });
    }
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({
        error: `fetch user by blood group failed with error ${err.message}`,
      });
  }
};
