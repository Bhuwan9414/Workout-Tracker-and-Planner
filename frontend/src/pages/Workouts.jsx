import { useEffect, useState } from "react";
import { fetchWorkouts } from "../services/workoutService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Workouts = () => {

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        loadWorkouts();

    }, []);

    const loadWorkouts = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetchWorkouts();

            console.log(response.data);

            setWorkouts(
                response.data.workouts || []
            );

        }

        catch (error) {

            console.log(error.response?.data);

            setError(
                error.response?.data?.message ||
                "Unable to load workout history."
            );

        }

        finally {

            setLoading(false);

        }

    };

    const formatDuration = (seconds) => {

        if (
            seconds === null ||
            seconds === undefined ||
            isNaN(seconds)
        ) {
            return "N/A";
        }

        const totalSeconds = Math.floor(Number(seconds));

        const hours = Math.floor(totalSeconds / 3600);

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const remainingSeconds =
            totalSeconds % 60;

        if (hours > 0) {

            return `${hours}h ${minutes}m`;

        }

        if (minutes > 0) {

            return `${minutes} min ${remainingSeconds} sec`;

        }

        return `${remainingSeconds} sec`;

    };

    /*
     * Loading State
     */

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="min-h-screen bg-slate-950 flex items-center justify-center">

                    <div className="text-center">

                        <p className="text-lg text-slate-300">
                            Loading workout history...
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Fetching your completed workouts
                        </p>

                    </div>

                </div>

            </>

        );

    }

    /*
     * Error State
     */

    if (error) {

        return (

            <>

                <Navbar />

                <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

                    <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 text-center">

                        <h1 className="text-2xl font-bold text-white">
                            Something went wrong
                        </h1>

                        <p className="mt-3 text-slate-400">
                            {error}
                        </p>

                        <button
                            onClick={loadWorkouts}
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-950 p-10">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Workout History
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Review your completed workouts.
                    </p>

                </div>


                {/* Empty State */}

                {workouts.length === 0 ? (

                    <div className="rounded-xl bg-slate-900 p-10 text-center">

                        <h2 className="text-2xl font-semibold text-white">
                            No workouts yet
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Complete your first workout and it will appear here.
                        </p>

                        <button
                            onClick={() => navigate("/routines")}
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            View Routines
                        </button>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {workouts.map((workout) => (

                            <div
                                key={workout._id}
                                className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
                            >

                                {/* Workout Header */}

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                    <div>

                                        <h2 className="text-2xl font-bold text-white">

                                            {workout.routineTitle}

                                        </h2>

                                        <span className="mt-2 inline-block rounded-full bg-green-900/40 px-3 py-1 text-sm font-medium capitalize text-green-400">

                                            {workout.status}

                                        </span>

                                    </div>

                                </div>


                                {/* Workout Stats */}

                                <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">

                                    <div>

                                        <p className="text-sm text-slate-400">
                                            Duration
                                        </p>

                                        <p className="mt-1 font-medium text-white">
                                            {formatDuration(workout.duration)}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-sm text-slate-400">
                                            Volume
                                        </p>

                                        <p className="mt-1 font-medium text-white">
                                            {workout.totalVolume ?? 0} kg
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-sm text-slate-400">
                                            Exercises
                                        </p>

                                        <p className="mt-1 font-medium text-white">
                                            {workout.totalExercises ?? 0}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-sm text-slate-400">
                                            Sets
                                        </p>

                                        <p className="mt-1 font-medium text-white">
                                            {workout.totalSets ?? 0}
                                        </p>

                                    </div>

                                </div>


                                {/* View Details */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/workouts/${workout._id}`
                                        )
                                    }
                                    className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                                >
                                    View Details
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>

    );

};

export default Workouts;