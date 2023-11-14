const CategoryController = require("../controllers/CategoryController");
const PostController = require("../controllers/PostController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.get("/pub/posts", PostController.findAll);
router.get("/pub/posts/:slug", PostController.findPostBySlug);

// router.use(authentication);

router.get("/posts", PostController.findAll);
router.post("/posts", PostController.create);
router.get("/posts/:id", PostController.findPost);
router.put("/posts/:id", PostController.editPost);
router.delete("/posts/:id", PostController.delete);

router.get("/categories", CategoryController.findAll);
router.post("/categories", CategoryController.create);
router.get("/categories/:id", CategoryController.findCategory);
router.put("/categories/:id", CategoryController.edit);
router.delete("/categories/:id", CategoryController.delete);

module.exports = router;
