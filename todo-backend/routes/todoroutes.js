const express = require('express');
const router = express.Router();
const todoController = require('../controller/todocontroller');

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createNewTodo);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);

module.exports = router;
