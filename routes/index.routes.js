const { Router } = require("express");

const clientRouter = require("./client.routes");
const adminRouter = require("./admin.routes");
const specialistRouter = require("./specialist.routes");
const socialRouter = require("./social.routes");
const otpRouter = require("./otp.routes");

const router = Router();

router.use("/client", clientRouter);

router.use("/admin", adminRouter);

router.use("/specialist", specialistRouter);

router.use("/social", socialRouter);

router.use("/otp", otpRouter);

module.exports = router;
