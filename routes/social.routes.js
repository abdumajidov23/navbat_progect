const { Router } = require("express");

const router = Router();

const {
  addSocial,
  getSocial,
  getSocialById,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");

router.post("/create", addSocial);

router.get("/get", getSocial);

router.get("/get/:id", getSocialById);

router.put("/update/:id", updateSocial);

router.delete("/delete/:id", deleteSocial);

module.exports = router;
