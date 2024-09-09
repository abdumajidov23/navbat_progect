const { Router } = require("express");

const router = Router();

const {
  addToken,
  getToken,
  getTokenById,
  updateToken,
  deleteToken,
} = require("../controllers/token.controller");


router.post("/create", addToken);

router.get("/get", getToken);

router.get("/get/:id", getTokenById);

router.put("/update/:id", updateToken);

router.delete("/delete/:id", deleteToken);

module.exports = router;