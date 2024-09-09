const { Router } = require("express");
const { newOTP, verifyClientsOTP, verifySpecialistOTP } = require("../controllers/otp.controller");

const router = Router();

router.post("/newotp", newOTP);
router.post("/verifyotp/clients", verifyClientsOTP);
router.post("/verifyotp/specialist", verifySpecialistOTP);

module.exports = router;
