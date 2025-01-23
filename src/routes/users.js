var express = require('express');
var usersRouter = express.Router();
const UserController = require('../controllers/users');

/* GET users listing. */
usersRouter.get('/', UserController.getAll);
usersRouter.get('/:id', UserController.getById);
usersRouter.post('/', UserController.create);
usersRouter.patch('/:id', UserController.update);
usersRouter.delete('/:id', UserController.delete);

module.exports = usersRouter;
