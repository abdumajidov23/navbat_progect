const pool = require("../config/db");

const addService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    const newService = await pool.query(
      `
        INSERT INTO service (service_name, service_price)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [service_name, service_price]
    );
    console.log(newService);
    res.status(201).send(newService.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getService = async (req, res) => {
  try {
    const service = await pool.query(`
            SELECT * FROM service
        `);
    res.status(200).send(service.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await pool.query(
      `
            SELECT * FROM service
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(service.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, service_price } = req.body;
    const newService = await pool.query(
      `
        UPDATE service
        SET service_name = $1, service_price = $2
        WHERE id = $3
        RETURNING *;
    `,
      [service_name, service_price, id]
    );
    res.status(200).send(newService.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await pool.query(
      `
            DELETE FROM service
            WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(service);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addService,
  getService,
  getServiceById,
  updateService,
  deleteService,
};
