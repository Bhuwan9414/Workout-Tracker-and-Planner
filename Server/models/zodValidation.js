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

// --------------------------------------------------------------------------------------------------------


const setSchema = z.object({
    targetReps: z
        .number({
            required_error: "targetReps is required",
            invalid_type_error: "targetReps must be a number"
        })
        .positive(),

    targetWeight: z
        .number({
            required_error: "targetWeight is required",
            invalid_type_error: "targetWeight must be a number"
        })
        .nonnegative()
});

const exerciseSchema = z.object({
    exerciseName: z
        .string({
            required_error: "exerciseName is required"
        })
        .min(1, "exerciseName cannot be empty"),

    sets: z
        .array(setSchema)
        .min(1, "At least one set is required")
});

const routineSchema = z.object({
    title: z
        .string({
            required_error: "title is required"
        })
        .min(1, "title cannot be empty"),

    exercises: z
        .array(exerciseSchema)
        .min(1, "At least one exercise is required")
});


module.exports = {registerSchema, loginSchema, routineSchema};