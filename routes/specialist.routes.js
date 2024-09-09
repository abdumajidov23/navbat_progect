const { Router } = require("express");

const router = Router();

const {
  addSpecialist,
  getSpecialist,
  getSpecialistById,
  updateSpecialist,
  deleteSpecialist,
} = require("../controllers/specialist.controller");

router.post("/create", addSpecialist);

router.get("/get", getSpecialist);

router.get("/get/:id", getSpecialistById);

router.put("/update/:id", updateSpecialist);

router.delete("/delete/:id", deleteSpecialist);

module.exports = router;
