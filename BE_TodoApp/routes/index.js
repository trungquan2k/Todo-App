const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const postController = require("../app/controllers/postController");
const adminController = require("../app/controllers/adminController");

router.post("/signup", adminController.create_account);
router.post("/", adminController.login);
router.post("/forgot", adminController.forgotPassWord);
// router.use("/admin", require("./admin.route"));
// router.use("/todo", require("./todo.route"));
router.post("/add", verifyToken.verifyToken, postController.addTodo);
router.get("/list-todo/:id", verifyToken.verifyToken, postController.getById);
router.get("/list", verifyToken.verifyToken, postController.getAll);

module.exports = router;
