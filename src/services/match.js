const partidos = require('../database/examples/partidos.json');
const crypto = require('crypto');

class MatchService {
  static async getAllMatches() {
    return partidos;
  }

  static async getMatchById(id) {
    return partidos.find((match) => match.id === id);
  }

  static async createMatch(data) {
    const newMatch = {
      id: crypto.randomUUID(),
      ...data,
    };
    partidos.push(newMatch);
    return newMatch;
  }

  static async updateMatch(id, data) {
    const matchIndex = partidos.findIndex((match) => match.id === id);

    if (matchIndex === -1) {
      return false;
    }

    partidos[matchIndex] = { ...partidos[matchIndex], ...data };
    return partidos[matchIndex];
  }

  static async deleteMatch(id) {
    const matchIndex = partidos.findIndex((match) => match.id === id);
    if (matchIndex === -1) {
      return false;
    }

    partidos.splice(matchIndex, 1);
    return true;
  }
}

module.exports = MatchService;
