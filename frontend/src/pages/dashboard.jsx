import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getAllRoutines } from "../services/routineService";
import { fetchWorkouts } from "../services/workoutService";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [routines, setRoutines] = useState([]);
    const [workouts, setWorkouts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const routineResponse =
                await getAllRoutines();

            const workoutResponse =
                await fetchWorkouts();

            setRoutines(
                routineResponse.data.routines || []
            );

            setWorkouts(
                workoutResponse.data.workouts || []
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

    const completedWorkouts =
        workouts.filter(
            workout => workout.status === "completed"
        );

    const activeWorkout =
        workouts.find(
            workout => workout.status === "active"
        );

    const recentWorkouts =
        [...completedWorkouts]
            .sort(
                (a, b) =>
                    new Date(b.completedAt) -
                    new Date(a.completedAt)
            )
            .slice(0, 3);

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

                    <div className="rounded-xl bg-slate-900 p-5">

                        <p className="text-slate-400">
                            Total Routines
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {routines.length}
                        </h2>

                    </div>


                    <div className="rounded-xl bg-slate-900 p-5">

                        <p className="text-slate-400">
                            Completed Workouts
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {completedWorkouts.length}
                        </h2>

                    </div>


                    <div className="rounded-xl bg-slate-900 p-5">

                        <p className="text-slate-400">
                            Active Workout
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">

                            {activeWorkout ? "Yes" : "No"}

                        </h2>

                    </div>

                </div>


                {/* Quick Actions */}

                <div className="mt-10 grid gap-5 md:grid-cols-3">

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

                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Duration
                                            </p>

                                            <p className="font-medium">
                                                {(workout.duration/60).toFixed(2)} min
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Volume
                                            </p>

                                            <p className="font-medium">
                                                {workout.totalVolume} kg
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Exercises
                                            </p>

                                            <p className="font-medium">
                                                {workout.totalExercises}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Sets
                                            </p>

                                            <p className="font-medium">
                                                {workout.totalSets}
                                            </p>

                                        </div>

                                    </div>


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