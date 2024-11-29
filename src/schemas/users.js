const z = require('zod');

const userSchema = z.object({
  nombre: z.string().min(3).max(255,
    {
      message: 'Nombre debe tener 3 o más carácteres',
      invalid_type_error: 'Nombre debe ser un string',
      required_error: 'El nombre es obligatorio'
    }
  ),
  edad: z.number().int().positive().min(10).optional(),
  email: z.string().email({
    required_error: 'El email es obligatorio'
  })
});

function validateUser (object) {
  return userSchema.safeParse(object);
}

function validatePartialUser (object) {
  return userSchema.partial().safeParse(object);
}

module.exports = {
  validateUser,
  validatePartialUser
};
