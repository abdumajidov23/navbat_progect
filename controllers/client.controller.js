const pool = require("../config/db");

const addClient = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, info, photo } = req.body;
    const newClient = await pool.query(
      `
        INSERT INTO clients (first_name, last_name, phone_number, info, photo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [first_name, last_name, phone_number, info, photo]
    );
    console.log(newClient);
    res.status(201).send(newClient.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getClient = async (req, res) => {
  try {
    const client = await pool.query(`
            SELECT * FROM clients
        `);
    res.status(200).send(client.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query(
      `
            SELECT * FROM clients
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(client.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, info } = req.body;
    const newClient = await pool.query(
      `
        UPDATE clients
        SET first_name = $1, last_name = $2, phone_number = $3, info = $4
        WHERE id = $5
        RETURNING *;
    `,
      [first_name, last_name, phone_number, info, id]
    );
    res.status(200).send(newClient.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.query(
      `
            DELETE FROM clients
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(client.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
};
