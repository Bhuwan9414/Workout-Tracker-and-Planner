import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getAllRoutines } from "../services/routineService";
import {
    fetchWorkouts,
    fetchActiveWorkout
} from "../services/workoutService";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [routines, setRoutines] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [activeWorkout, setActiveWorkout] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            // Fetch routines
            const routineResponse =
                await getAllRoutines();

            // Fetch workout history
            const workoutResponse =
                await fetchWorkouts();

            // Fetch currently active workout
            const activeWorkoutResponse =
                await fetchActiveWorkout();

            setRoutines(
                routineResponse.data.routines || []
            );

            setWorkouts(
                workoutResponse.data.workouts || []
            );

            setActiveWorkout(
                activeWorkoutResponse.data.activeWorkout || null
            );

        }

        catch (error) {

            console.log(error.response?.data);

            setError(
                error.response?.data?.message ||
                "Unable to load dashboard data."
            );

        }

        finally {

            setLoading(false);

        }

    };


    /*
     * Completed Workouts
     */

    const completedWorkouts =
        workouts.filter(
            workout => workout.status === "completed"
        );


    /*
     * Recent Workouts
     */

    const recentWorkouts =
        [...completedWorkouts]
            .sort(
                (a, b) =>
                    new Date(b.completedAt) -
                    new Date(a.completedAt)
            )
            .slice(0, 3);


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
                            Loading dashboard...
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Fetching your routines and workouts
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
                            onClick={loadDashboard}
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

            <div className="min-h-screen bg-slate-950 p-10 text-white">

                {/* Header */}

                <h1 className="text-4xl font-bold">

                    Welcome {user?.name || "User"} 👋

                </h1>

                <p className="mt-2 text-slate-400">

                    What would you like to do?

                </p>


                {/* Stats */}

                <div className="mt-10 grid gap-5 md:grid-cols-3">

                    {/* Total Routines */}

                    <div className="rounded-xl bg-slate-900 p-5">

                        <p className="text-slate-400">
                            Total Routines
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {routines.length}
                        </h2>

                    </div>


                    {/* Completed Workouts */}

                    <div className="rounded-xl bg-slate-900 p-5">

                        <p className="text-slate-400">
                            Completed Workouts
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {completedWorkouts.length}
                        </h2>

                    </div>


                    {/* Active Workout */}

                    <div className="rounded-xl bg-slate-900 p-5">

                        <p className="text-slate-400">
                            Active Workout
                        </p>


                        {activeWorkout ? (

                            <>

                                <h2 className="mt-2 text-xl font-bold text-white">

                                    {activeWorkout.routineTitle}

                                </h2>

                                <p className="mt-1 text-sm text-yellow-400">

                                    Workout in progress

                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/active-workout/${activeWorkout._id}`,
                                            {
                                                state: {
                                                    workout: activeWorkout
                                                }
                                            }
                                        )
                                    }
                                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Resume Workout
                                </button>

                            </>

                        ) : (

                            <>

                                <h2 className="mt-2 text-3xl font-bold text-white">

                                    None

                                </h2>

                                <p className="mt-1 text-sm text-slate-500">

                                    No active workout

                                </p>

                            </>

                        )}

                    </div>

                </div>


                {/* Quick Actions */}

                <div className="mt-10 grid gap-5 md:grid-cols-3">

                    {/* Create Routine */}

                    <button
                        onClick={() => navigate("/create-routine")}
                        className="rounded-xl bg-slate-900 p-6 text-left transition hover:bg-slate-800"
                    >

                        <h2 className="text-xl font-semibold">
                            ➕ Create Routine
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Build a new workout routine.
                        </p>

                    </button>


                    {/* My Routines */}

                    <button
                        onClick={() => navigate("/routines")}
                        className="rounded-xl bg-slate-900 p-6 text-left transition hover:bg-slate-800"
                    >

                        <h2 className="text-xl font-semibold">
                            📋 My Routines
                        </h2>

                        <p className="mt-2 text-slate-400">
                            View and manage your workout routines.
                        </p>

                    </button>


                    {/* Workout History */}

                    <button
                        onClick={() => navigate("/workouts")}
                        className="rounded-xl bg-slate-900 p-6 text-left transition hover:bg-slate-800"
                    >

                        <h2 className="text-xl font-semibold">
                            📈 Workout History
                        </h2>

                        <p className="mt-2 text-slate-400">
                            View completed workouts.
                        </p>

                    </button>

                </div>


                {/* Recent Workouts */}

                <div className="mt-14">

                    <h2 className="mb-5 text-3xl font-bold">
                        Recent Workouts
                    </h2>


                    {recentWorkouts.length === 0 ? (

                        <div className="rounded-xl bg-slate-900 p-6">

                            <p className="text-slate-400">
                                No completed workouts yet.
                            </p>

                            <button
                                onClick={() => navigate("/routines")}
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                View Routines
                            </button>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {recentWorkouts.map((workout) => (

                                <div
                                    key={workout._id}
                                    className="rounded-xl bg-slate-900 p-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="text-xl font-semibold">

                                                {workout.routineTitle}

                                            </h3>

                                            <p className="mt-1 capitalize text-green-400">

                                                {workout.status}

                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4">

                                        {/* Duration */}

                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Duration
                                            </p>

                                            <p className="font-medium">
                                                {(workout.duration / 60).toFixed(2)} min
                                            </p>

                                        </div>


                                        {/* Volume */}

                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Volume
                                            </p>

                                            <p className="font-medium">
                                                {workout.totalVolume} kg
                                            </p>

                                        </div>


                                        {/* Exercises */}

                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Exercises
                                            </p>

                                            <p className="font-medium">
                                                {workout.totalExercises}
                                            </p>

                                        </div>


                                        {/* Sets */}

                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Sets
                                            </p>

                                            <p className="font-medium">
                                                {workout.totalSets}
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
                                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        View Details
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </>

    );

};

export default Dashboard;