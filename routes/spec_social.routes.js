const { Router } = require("express");

const router = Router();

const {
  addSpec_social,
  getSpec_social,
  getSpec_socialById,
  updateSpec_social,
  deleteSpec_social,
} = require("../controllers/spec_social.controller");


router.post("/create", addSpec_social);

router.get("/get", getSpec_social);

router.get("/get/:id", getSpec_socialById);

router.put("/update/:id", updateSpec_social);

router.delete("/delete/:id", deleteSpec_social);

module.exports = router;