const express = require('express');
const matchesRouter = express.Router();
const MatchesController = require('../controllers/matches');

matchesRouter.get('', MatchesController.getAllMatches);
matchesRouter.get('/:id', MatchesController.getMatchById);
matchesRouter.post('', MatchesController.createMatch);
matchesRouter.patch('/:id', MatchesController.updateMatch);
matchesRouter.delete('/:id', MatchesController.deleteMatch);

module.exports = matchesRouter;
