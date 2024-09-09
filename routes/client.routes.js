const { Router } = require("express");

const router = Router();

const {
  addClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

router.post("/create", addClient);

router.get("/get", getClient);

router.get("/get/:id", getClientById);

router.put("/update/:id", updateClient);

router.delete("/delete/:id", deleteClient);

module.exports = router;
