const { z } = require('zod');

const matchSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
  location: z.string(),
  players: z.array(z.string())
});

const validateMatch = (data) => {
  return matchSchema.safeParse(data);
};

const validatePartialMatch = (data) => {
  return matchSchema.partial().safeParse(data);
};

module.exports = {
  validateMatch,
  validatePartialMatch
};
