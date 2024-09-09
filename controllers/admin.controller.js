const pool = require("../config/db");

const addAdmin = async (req, res) => {
  try {
    const {
      name,
      phone_number,
      email,
      hashed_password,
      is_active,
      is_creator,
    } = req.body;
    const newAdmin = await pool.query(
      `
        INSERT INTO admin (name, phone_number, email, hashed_password, is_active, is_creator)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
      [name, phone_number, email, hashed_password, is_active, is_creator]
    );
    console.log(newAdmin);
    res.status(201).send(newAdmin.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await pool.query(`
            SELECT * FROM admin
        `);
    res.status(200).send(admin.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await pool.query(
      `
            SELECT * FROM admin
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(admin.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone_number,
      email,
      hashed_password,
      is_active,
      is_creator,
    } = req.body;
    const newAdmin = await pool.query(
      `
        UPDATE admin
        SET name=$1, phone_number=$2, email=$3, hashed_password=$4, is_active=$5, is_creator=$6
        WHERE id = $7
        RETURNING *;
    `,
      [name, phone_number, email, hashed_password, is_active, is_creator, id]
    );
    res.status(200).send(newAdmin.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await pool.query(
      `
            DELETE FROM admin
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(admin);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
