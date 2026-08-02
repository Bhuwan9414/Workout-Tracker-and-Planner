import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/validationSchema";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            weight: "",
            height: "",
            goal: "",
        },
    });

    const onSubmit = async (data) => {

        try {

            const response = await registerUser(data);

            console.log(response);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">

            <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl">

                <h1 className="mb-2 text-3xl font-bold text-white">
                    Create Account
                </h1>

                <p className="mb-8 text-slate-400">
                    Start your fitness journey.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Name
                        </label>

                        <input
                            type="text"
                            {...register("name")}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}

                    </div>

                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register("password")}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    {/* Weight */}

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Weight (kg)
                        </label>

                        <input
                            type="number"
                            {...register("weight", {
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                        {errors.weight && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.weight.message}
                            </p>
                        )}

                    </div>

                    {/* Height */}

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Height (cm)
                        </label>

                        <input
                            type="number"
                            {...register("height", {
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        />

                        {errors.height && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.height.message}
                            </p>
                        )}

                    </div>

                    {/* Goal */}

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Goal
                        </label>

                        <select
                            {...register("goal")}
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                        >
                            <option value="">Select Goal</option>
                            <option value="build_muscle">Build Muscle</option>
                            <option value="gain_strength">Gain Strength</option>
                            <option value="fat_loss">Fat Loss</option>
                        </select>

                        {errors.goal && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.goal.message}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Register
                    </button>

                    <p className="text-center text-slate-400">

                        Already have an account?

                        <Link
                            to="/"
                            className="ml-2 text-blue-500"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
};

export default Register;