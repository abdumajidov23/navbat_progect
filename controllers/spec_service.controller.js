const pool = require("../config/db");

const addSpec_service = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;
    const newSpec_service = await pool.query(
      `
        INSERT INTO spec_service (spec_id, service_id, spec_service_price)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [spec_id, service_id, spec_service_price]
    );
    console.log(newSpec_service);
    res.status(201).send(newSpec_service.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSpec_service = async (req, res) => {
  try {
    const spec_service = await pool.query(`
            SELECT * FROM spec_service
        `);
    res.status(200).send(spec_service.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getSpec_serviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const spec_service = await pool.query(
      `
            SELECT * FROM spec_service
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(spec_service.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateSpec_service = async (req, res) => {
  try {
    const { id } = req.params;
    const { spec_id, service_id, spec_service_price } = req.body;
    const newSpec_service = await pool.query(
      `
        UPDATE spec_service
        SET spec_id = $1, service_id = $2, spec_service_price = $3
        WHERE id = $4
        RETURNING *;
    `,
      [spec_id, service_id, spec_service_price, id]
    );
    res.status(200).send(newSpec_service.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteSpec_service = async (req, res) => {
  try {
    const { id } = req.params;
    const spec_service = await pool.query(
      `
            DELETE FROM spec_service
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(spec_service);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addSpec_service,
  getSpec_service,
  getSpec_serviceById,
  updateSpec_service,
  deleteSpec_service,
};
