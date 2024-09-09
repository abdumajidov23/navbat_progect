const { Router } = require("express");

const router = Router();

const {
  addSpec_service,
  getSpec_service,
  getSpec_serviceById,
  updateSpec_service,
  deleteSpec_service,
} = require("../controllers/spec_service.controller");


router.post("/create", addSpec_service);

router.get("/get", getSpec_service);

router.get("/get/:id", getSpec_serviceById);

router.put("/update/:id", updateSpec_service);

router.delete("/delete/:id", deleteSpec_service);

module.exports = router;