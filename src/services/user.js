const usuarios = require('../database/examples/usuarios.json');
const crypto = require('crypto');

class UserService {
  static async getAll () {
    return usuarios;
  }

  static async getById (id) {
    const usuario = usuarios.find(user => user.id === id);
    return usuario;
  }

  static async create (data) {
    const newUser = {
      id: crypto.randomUUID(),
      ...data
    };

    usuarios.push(newUser);

    return newUser;
  }

  static async delete (id) {
    const userIndex = usuarios.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    usuarios.splice(userIndex, 1);

    return true;
  }

  static async update ({ id, input }) {
    const userIndex = usuarios.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    const updatedUser = {
      ...usuarios[userIndex],
      ...input
    };

    usuarios[userIndex] = updatedUser;

    return updatedUser;
  }
}

module.exports = UserService;
