const pool = require("../config/db");

const addSpec_social = async (req, res) => {
  try {
    const { spec_id, social_id, link } = req.body;
    const newSpec_social = await pool.query(
      `
        INSERT INTO spec_social (spec_id, social_id, link)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [spec_id, social_id, link]
    );
    console.log(newSpec_social);
    res.status(201).send(newSpec_social.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSpec_social = async (req, res) => {
  try {
    const spec_social = await pool.query(`
            SELECT * FROM spec_social
        `);
    res.status(200).send(spec_social.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSpec_socialById = async (req, res) => {
  try {
    const { id } = req.params;
    const spec_social = await pool.query(
      `
            SELECT * FROM spec_social
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(spec_social.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateSpec_social = async (req, res) => {
  try {
    const { id } = req.params;
    const { spec_id, social_id, link } = req.body;
    const newSpec_social = await pool.query(
      `
        UPDATE spec_social
        SET spec_id = $1, social_id = $2, link = $3
        WHERE id = $4
        RETURNING *;
    `,
      [spec_id, social_id, link, id]
    );
    res.status(200).send(newSpec_social.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteSpec_social = async (req, res) => {
  try {
    const { id } = req.params;
    const spec_social = await pool.query(
      `
            DELETE FROM spec_social
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(spec_social);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addSpec_social,
  getSpec_social,
  getSpec_socialById,
  updateSpec_social,
  deleteSpec_social,
};
