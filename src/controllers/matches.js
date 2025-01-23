const MatchesService = require('../services/match.js');
const { validateMatch } = require('../schemas/matches.js');

class MatchesController {
  static async getAllMatches(req, res) {
    const matches = await MatchesService.getAllMatches();
    res.json(matches);
  }

  static async getMatchById(req, res) {
    const { id } = req.params;
    const match = await MatchesService.getMatchById(id);
    if (match) res.json(match);
    else res.status(404).json({ message: 'Partido no encontrado' });
  }

  static async createMatch(req, res) {
    const result = validateMatch(req.body);

    if (result.error) {
      return res.status(422).json({ error: result.error.message });
    }

    const newMatch = await MatchesService.createMatch(result);
    res.status(201).json(newMatch);
  }

  static async updateMatch(req, res) {
    const { id } = req.params;
    const matchData = req.body;
    validateMatch(matchData);
    const updatedMatch = await MatchesService.updateMatch(id, matchData);
    res.json(updatedMatch);
  }

  static async deleteMatch(req, res) {
    const { id } = req.params;

    const result = await MatchesService.deleteMatch(id);

    if (result === false) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    return res.status(204).json({ message: 'Partido eliminado' });
  }
}

module.exports = MatchesController;
