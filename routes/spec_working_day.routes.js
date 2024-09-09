const { Router } = require("express");

const router = Router();

const {
  addSpec_working_day,
  getSpec_working_day,
  getSpec_working_dayById,
  updateSpec_working_day,
  deleteSpec_working_day,
} = require("../controllers/spec_working_day.controller");


router.post("/create", addSpec_working_day);

router.get("/get", getSpec_working_day);

router.get("/get/:id", getSpec_working_dayById);

router.put("/update/:id", updateSpec_working_day);

router.delete("/delete/:id", deleteSpec_working_day);

module.exports = router;