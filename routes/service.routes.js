const { Router } = require("express");

const router = Router();

const {
  addService,
  getService,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/service.controller");


router.post("/create", addService);

router.get("/get", getService);

router.get("/get/:id", getServiceById);

router.put("/update/:id", updateService);

router.delete("/delete/:id", deleteService);

module.exports = router;