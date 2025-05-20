import pool from "../db.js";

export const startConversation = async (req, res) => {
  const { title } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO conversations (title)
        VALUES ($1)
        RETURNING *`,
      [title]
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
        SELECT * FROM conversations
        WHERE conversation_id IN
        (SELECT conversation_id FROM messages 
        WHERE sender_id = $1 AND receiver_id = $2
        OR sender_id = $1 AND receiver_id = $2)
        `,
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
