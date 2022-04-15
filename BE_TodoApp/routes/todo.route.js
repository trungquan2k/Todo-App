const express =require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const postController = require('../app/controllers/postController');
router.post(
    '/add',
    verifyToken.verifyToken,
    postController.addTodo
);

// router.get(
//     '/list',
//     verifyToken.verifyToken,
//     postController.getListTodo
// );

router.get(
    '/:id',
    verifyToken.verifyToken,
    postController.getById
)

// router.put(
//     '/:id',
//     verifyToken.verifyToken,
//     postController.updateTodo
// );

// router.delete(
//     '/:id',
//     verifyToken.verifyToken,
//     postController.deleteTodo
// );
module.exports.router;
