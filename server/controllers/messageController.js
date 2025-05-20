import pool from "../db.js";

export const sendMessage = async (req, res) => {
  const { conversationId, senderId, receiverId, content } = req.body;
  try {
    const result = await pool.query(
      `
        INSERT INTO messages (conversation_id, sender_id, receiverId, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [conversationId, senderId, receiverId, content]
    );
    await pool.query(
      `UPDATE conversations SET last_updated = NOW() WHERE conversation_id = $1`,
      [conversationId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessagesInConversation = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT * FROM messages
        WHERE conversation_id = $1
        ORDER BY timestamp`,
      [conversationId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const viewMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const result = await pool.query(
      `
        UPDATE messages 
        SET is_read = true
        WHERE message_id = $1
        RETURNING *`,
      [messageId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
