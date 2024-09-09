const pool = require("../config/db");

const addToken = async (req, res) => {
  try {
    const {
      table_name,
      user_id,
      user_os,
      user_device,
      user_browser,
      hashed_refresh_token,
    } = req.body;
    const newToken = await pool.query(
      `
        INSERT INTO token (table_name, user_id, user_os, user_device, user_browser, hashed_refresh_token)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [
        table_name,
        user_id,
        user_os,
        user_device,
        user_browser,
        hashed_refresh_token,
      ]
    );
    console.log(newToken);
    res.status(201).send(newToken.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getToken = async (req, res) => {
  try {
    const token = await pool.query(`
            SELECT * FROM token
        `);
    res.status(200).send(token.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getTokenById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await pool.query(
      `
            SELECT * FROM token
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(token.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      table_name,
      user_id,
      user_os,
      user_device,
      user_browser,
      hashed_refresh_token,
    } = req.body;
    const newToken = await pool.query(
      `
        UPDATE token
        SET table_name = $1, user_id = $2, user_os = $3, user_device = $4, user_browser = $5, hashed_refresh_token = $6
        WHERE id = $7
        RETURNING *;
    `,
      [
        table_name,
        user_id,
        user_os,
        user_device,
        user_browser,
        hashed_refresh_token,
        id,
      ]
    );
    res.status(200).send(newToken.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteToken = async (req, res) => {
  try {
    const { id } = req.params;
    const token = await pool.query(
      `
            DELETE FROM token
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addToken,
  getToken,
  getTokenById,
  updateToken,
  deleteToken,
};
