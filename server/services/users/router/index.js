const UserController = require("../controllers/UserController");

const router = require("express").Router();

router.get("/", UserController.findAll);
router.post("/", UserController.create);

router.get("/:id", UserController.findById);
router.delete("/:id", UserController.delete);

module.exports = router;
