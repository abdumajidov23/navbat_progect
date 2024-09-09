const pool = require("../config/db");

const addSpecialist = async (req, res) => {
  try {
    const {
      position,
      last_name,
      first_name,
      middle_name,
      birth_day,
      photo,
      phone_number,
      info,
      is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_photo,
      show_social,
      show_info,
      show_birth_day,
      show_phone_number,
      otp_id,
    } = req.body;
    const newSpecialist = await pool.query(
      `
        INSERT INTO specialist (position,
      last_name,
      first_name,
      middle_name,
      birth_day,
      photo,
      phone_number,
      info,
      is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_photo,
      show_social,
      show_info,
      show_birth_day,
      show_phone_number,
      otp_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *;
        `,
      [
        position,
        last_name,
        first_name,
        middle_name,
        birth_day,
        photo,
        phone_number,
        info,
        is_active,
        show_position,
        show_last_name,
        show_first_name,
        show_middle_name,
        show_photo,
        show_social,
        show_info,
        show_birth_day,
        show_phone_number,
        otp_id,
      ]
    );
    console.log(newSpecialist);
    res.status(201).send(newSpecialist.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSpecialist = async (req, res) => {
  try {
    const specialist = await pool.query(`
            SELECT * FROM specialist
        `);
    res.status(200).send(specialist.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSpecialistById = async (req, res) => {
  try {
    const { id } = req.params;
    const specialist = await pool.query(
      `
            SELECT * FROM specialist
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(specialist.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateSpecialist = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      position,
      last_name,
      first_name,
      middle_name,
      birth_day,
      photo,
      phone_number,
      info,
      is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_photo,
      show_social,
      show_info,
      show_birth_day,
      show_phone_number,
      otp_id
    } = req.body;
    const newSpecialist = await pool.query(
      `
        UPDATE specialist
        SET position = $1, last_name = $2, first_name = $3, middle_name = $4, birth_day = $5, photo = $6, phone_number = $7, info = $8, is_active = $9,
        show_position = $10, show_last_name = $11, show_first_name = $12, show_middle_name = $13, show_photo = $14, show_social = $15, show_info = $16,
        show_birth_day = $17, show_phone_number = $18, otp_id = $19
        WHERE id = $20
        RETURNING *;
    `,
      [
        position,
        last_name,
        first_name,
        middle_name,
        birth_day,
        photo,
        phone_number,
        info,
        is_active,
        show_position,
        show_last_name,
        show_first_name,
        show_middle_name,
        show_photo,
        show_social,
        show_info,
        show_birth_day,
        show_phone_number,
        otp_id,
        id
      ]
    );
    res.status(200).send(newSpecialist.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteSpecialist = async (req, res) => {
  try {
    const { id } = req.params;
    const specialist = await pool.query(
      `
            DELETE FROM specialist
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(specialist);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addSpecialist,
  getSpecialist,
  getSpecialistById,
  updateSpecialist,
  deleteSpecialist,
};
