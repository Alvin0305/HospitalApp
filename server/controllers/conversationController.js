import pool from "../db.js";

export const startConversation = async (req, res) => {
  const { patientId, doctorId } = req.body;

  try {
    const result = await pool.query(
      `
              INSERT INTO conversations (patient_id, doctor_id)
              VALUES ($1, $2)
              RETURNING *`,
      [patientId, doctorId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllConversationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `
              SELECT * FROM conversations WHERE 
              patient_id = $1 OR doctor_id = $1
              ORDER BY last_updated DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversationsInChat = async (req, res) => {
  const { patientId, doctorId } = req.body;
  try {
    const result = await pool.query(
      `
        SELECT * FROM conversations WHERE 
        patient_id = $1 AND doctor_id = $2
        ORDER BY last_updated`,
      [patientId, doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const endConversation = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const result = await pool.query(
      `
        UPDATE conversations
        SET status = 'ended'
        WHERE conversation_id = $1
        RETURNING *`,
      [conversationId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
