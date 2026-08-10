import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleWorkout } from "../services/workoutService";

const WorkoutDetails = () => {

    const { id } = useParams();

    const [workout, setWorkout] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadWorkout();

    }, []);

    const loadWorkout = async () => {

        try {

            const response = await fetchSingleWorkout(id);

            setWorkout(response.data.singleWorkout);

        }

        catch (error) {

            console.log(error.response?.data);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                Loading...
            </div>
        );

    }

    if (!workout) {

        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                Workout not found
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-slate-950 p-10">

            <h1 className="text-4xl font-bold text-white">

                {workout.routineTitle}

            </h1>

            <p className="mt-2 text-green-400 capitalize">

                {workout.status}

            </p>

            <div className="mt-10 space-y-8">

                {workout.exercises.map((exercise) => (

                    <div
                        key={exercise._id}
                        className="rounded-xl bg-slate-900 p-6"
                    >

                        <h2 className="text-2xl font-bold text-white">

                            {exercise.exerciseName}

                        </h2>

                        <div className="mt-6 space-y-4">

                            {exercise.sets.map((set, index) => (

                                <div
                                    key={set._id}
                                    className="rounded-lg bg-slate-800 p-4"
                                >

                                    <h3 className="font-semibold text-white">

                                        Set {index + 1}

                                    </h3>

                                    <div className="mt-3 grid grid-cols-2 gap-4">

                                        <div>

                                            <p className="text-slate-400">

                                                Planned

                                            </p>

                                            <p className="text-white">

                                                {set.plannedWeight} kg × {set.plannedReps}

                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-slate-400">

                                                Actual

                                            </p>

                                            <p className="text-white">

                                                {set.actualWeight} kg × {set.actualReps}

                                            </p>

                                        </div>

                                    </div>

                                    <p className="mt-4 text-green-400">

                                        {set.completed ? "Completed" : "Not Completed"}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default WorkoutDetails;