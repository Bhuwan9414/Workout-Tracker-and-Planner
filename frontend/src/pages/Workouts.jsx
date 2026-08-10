import { useEffect, useState } from "react";
import { fetchWorkouts } from "../services/workoutService";
import { useNavigate } from "react-router-dom";

const Workouts = () => {

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {

        try {

            const response = await fetchWorkouts();

            console.log(response.data);

            setWorkouts(response.data.workouts);

        }

        catch (error) {

            console.log(error.response?.data);

        }

        finally {

            setLoading(false);

        }

    };

    const formatDuration = (seconds) => {

        const mins = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${mins} min ${secs} sec`;

    };

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-950 p-10">

            <h1 className="mb-8 text-4xl font-bold text-white">

                Workout History

            </h1>

            {

                workouts.length === 0 ?

                    (

                        <p className="text-slate-400">

                            No workouts found.

                        </p>

                    )

                    :

                    (

                        <div className="space-y-6">

                            {

                                workouts.map((workout) => (

                                    <div
                                        key={workout._id}
                                        className="rounded-xl bg-slate-900 p-6"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <h2 className="text-2xl font-bold text-white">

                                                    {workout.routineTitle}

                                                </h2>

                                                <p className="mt-2 text-green-400 capitalize">

                                                    {workout.status}

                                                </p>

                                            </div>

                                        </div>

                                        <div className="mt-6 grid grid-cols-2 gap-4">

                                            <div>

                                                <p className="text-slate-400">

                                                    Duration

                                                </p>

                                                <p className="text-white">

                                                    {formatDuration(workout.duration)}

                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-slate-400">

                                                    Volume

                                                </p>

                                                <p className="text-white">

                                                    {workout.totalVolume} kg

                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-slate-400">

                                                    Exercises

                                                </p>

                                                <p className="text-white">

                                                    {workout.totalExercises}

                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-slate-400">

                                                    Sets

                                                </p>

                                                <p className="text-white">

                                                    {workout.totalSets}

                                                </p>

                                            </div>

                                        </div>

                                        {/* View Details Button */}

                                        <button
                                            onClick={() => navigate(`/workouts/${workout._id}`)}
                                            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default Workouts;