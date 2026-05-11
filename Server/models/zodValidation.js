const { z } = require("zod");

const userValidationSchema = z.object({

    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    weight: z.coerce.number().positive(),
    height: z.coerce.number().positive(),
    goal: z.enum([
        "build_muscle",
        "gain_strength",
        "fat_loss"
    ]),
})

module.exports = userValidationSchema;