const { validateUser, validatePartialUser } = require('../schemas/users');
const UserModel = require('../models/user');

class UserController {
  static async getAll (req, res) {
    const users = await UserModel.getAll();
    res.json(users);
  }

  static async getById (req, res) {
    const { id } = req.params;
    const user = await UserModel.getById(id);
    if (user) res.json(user);
    else res.status(404).json({ message: 'Usuario no encontrado' });
  }

  static async create (req, res) {
    // Validar datos de entrada -> Schema
    const result = validateUser(req.body);

    if (result.error) {
      // Error del cliente 400 | Error de validación 422
      return res.status(422).json({ error: result.error.message });
    }

    const newUser = await UserModel.create(result.data);

    // Responder al cliente
    res.status(201).json(newUser);
  }

  static async delete (req, res) {
    const { id } = req.params;

    const result = await UserModel.delete(id);

    if (result === false) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(204).json({ message: 'Usuario eliminado' });
  }

  static async update (req, res) {
    const result = validatePartialUser(req.body);

    if (result.error) {
      return res.status(422).json({ error: result.error.message });
    }

    const { id } = req.params;

    const updatedUser = await UserModel.update({ id, input: result.data });

    return res.json(updatedUser);
  }
}

module.exports = UserController;
