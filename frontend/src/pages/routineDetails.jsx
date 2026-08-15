import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../services/routineService";
import Navbar from "../components/Navbar";

const RoutineDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [routine, setRoutine] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadRoutine();

    }, [id]);

    const loadRoutine = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getRoutineById(id);

            console.log("Routine details response:", response.data);

            setRoutine(
                response.data.routine
            );

        }

        catch (error) {

            console.log("Routine details error:", error);

            console.log(
                "Backend error:",
                error.response?.data
            );

            setError(
                error.response?.data?.message ||
                "Unable to load routine."
            );

        }

        finally {

            setLoading(false);

        }

    };

    /*
     * Loading
     */

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="min-h-screen bg-slate-950 flex items-center justify-center">

                    <p className="text-lg text-slate-300">
                        Loading routine...
                    </p>

                </div>

            </>

        );

    }


    /*
     * Error
     */

    if (error || !routine) {

        return (

            <>

                <Navbar />

                <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

                    <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 text-center">

                        <h1 className="text-2xl font-bold text-white">
                            Routine Not Found
                        </h1>

                        <p className="mt-3 text-slate-400">
                            {error || "Unable to find this routine."}
                        </p>

                        <button
                            onClick={() => navigate("/routines")}
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Back to Routines
                        </button>

                    </div>

                </div>

            </>

        );

    }


    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-950 p-6 md:p-10">

                <div className="mx-auto max-w-5xl">

                    {/* Header */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h1 className="text-4xl font-bold text-white">
                                {routine.title}
                            </h1>

                            <p className="mt-2 text-slate-400">
                                {routine.exercises.length} exercises
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate(`/edit-routine/${routine._id}`)
                            }
                            className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-white transition hover:bg-yellow-600"
                        >
                            Edit Routine
                        </button>

                    </div>


                    {/* Exercises */}

                    <div className="mt-10 space-y-6">

                        {routine.exercises.map(
                            (exercise, exerciseIndex) => (

                                <div
                                    key={exercise._id}
                                    className="rounded-xl border border-slate-800 bg-slate-900 p-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <h2 className="text-2xl font-bold text-white">

                                            {exercise.exerciseId?.name ||
                                                exercise.exerciseName ||
                                                `Exercise ${exerciseIndex + 1}`}

                                        </h2>

                                        <span className="text-sm text-slate-400">

                                            {exercise.sets.length} sets

                                        </span>

                                    </div>


                                    {/* Sets */}

                                    <div className="mt-6 space-y-3">

                                        {exercise.sets.map(
                                            (set, setIndex) => (

                                                <div
                                                    key={set._id}
                                                    className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
                                                >

                                                    <span className="font-medium text-slate-300">

                                                        Set {setIndex + 1}

                                                    </span>


                                                    <div className="flex gap-8">

                                                        <div>

                                                            <p className="text-xs text-slate-500">
                                                                Weight
                                                            </p>

                                                            <p className="text-white">

                                                                {set.targetWeight} kg

                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p className="text-xs text-slate-500">
                                                                Reps
                                                            </p>

                                                            <p className="text-white">

                                                                {set.targetReps}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>


                    {/* Back */}

                    <button
                        onClick={() => navigate("/routines")}
                        className="mt-8 rounded-lg bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                    >
                        Back to Routines
                    </button>

                </div>

            </div>

        </>

    );

};

export default RoutineDetails;