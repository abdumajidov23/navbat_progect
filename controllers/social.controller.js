const pool = require("../config/db");

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    const newSocial = await pool.query(
      `
        INSERT INTO social (social_name, social_icon_file)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [social_name, social_icon_file]
    );
    console.log(newSocial);
    res.status(201).send(newSocial.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSocial = async (req, res) => {
  try {
    const social = await pool.query(`
            SELECT * FROM social
        `);
    res.status(200).send(social.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await pool.query(
      `
            SELECT * FROM social
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(social.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { social_name, social_icon_file } = req.body;
    const newSocial = await pool.query(
      `
        UPDATE social
        SET social_name = $1, social_icon_file = $2
        WHERE id = $3
        RETURNING *;
    `,
      [social_name, social_icon_file, id]
    );
    res.status(200).send(newSocial.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await pool.query(
      `
            DELETE FROM social
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(social);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addSocial,
  getSocial,
  getSocialById,
  updateSocial,
  deleteSocial,
};
