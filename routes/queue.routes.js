const { Router } = require("express");

const router = Router();

const {
  addQueue,
  getQueue,
  getQueueById,
  updateQueue,
  deleteQueue,
} = require("../controllers/queue.controller");

router.post("/create", addQueue);

router.get("/get", getQueue);

router.get("/get/:id", getQueueById);

router.put("/update/:id", updateQueue);

router.delete("/delete/:id", deleteQueue);

module.exports = router;
