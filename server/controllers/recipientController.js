import pool from "../db.js";

export const createRecipient = async (req, res) => {
  const { id } = req.params;
  const { amount_of_blood } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO
        recipients (user_id, amount_of_blood)
        VALUES ($1, $2)
        RETURNING *
        `,
      [id, amount_of_blood]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `creating recipient failed with error ${err.message}` });
  }
};

export const getAllRecipients = async (req, res) => {
  const { status } = req.body;
  try {
    let result;
    if (status) {
      result = await pool.query(
        `SELECT * from recipients
              JOIN users ON recipients.user_id = users.user_id
              WHERE status = $1
                `,
        [status]
      );
    } else {
      result = await pool.query(
        `SELECT * from recipients
              JOIN users ON recipients.user_id = users.user_id
                `
      );
    }

    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: `fetching recipient failed with error ${err.message}` });
  }
};

export const updateRecipient = async (req, res) => {
  const { id } = req.params;
  let { status, amount_of_blood } = req.body;
  try {
    const currentRecipient = await pool.query(
      `SELECT * FROM recipients WHERE user_id = $1`,
      [id]
    );
    if (!status) status = currentRecipient.rows[0].status;
    if (!amount_of_blood)
      amount_of_blood = currentRecipient.rows[0].amount_of_blood;

    const result = await pool.query(
      `UPDATE recipients
        SET status = $1, amount_of_blood = $2
        WHERE user_id = $3
        RETURNING *
                `,
      [status, amount_of_blood, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: `update recipient failed with error ${err.message}` });
  }
};

export const deleteRecipient = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM recipients
        WHERE user_id = $1
        `,
      [id]
    );
    if (result.rowCount === 0) return res.json({error: "Recipient not found"});
    res.json({message: "Deletion of recipient successful"});
  } catch (err) {
    res
      .status(500)
      .json({ error: `deleting recipient failed with error ${err.message}` });
  }
};
