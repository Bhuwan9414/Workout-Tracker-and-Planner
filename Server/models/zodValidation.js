const { z, email } = require("zod");

const registerSchema = z.object({

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

const loginSchema = z.object({

    email: z.email(),
    password: z.string().min(6)
})

module.exports = {registerSchema, loginSchema};