const { Router } = require("express");

const router = Router();

const {
  addAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");


router.post("/create", addAdmin);

router.get("/get", getAdmin);

router.get("/get/:id", getAdminById);

router.put("/update/:id", updateAdmin);

router.delete("/delete/:id", deleteAdmin);

module.exports = router;