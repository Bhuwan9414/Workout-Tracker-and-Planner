import { useLocation } from "react-router-dom";
import { useState } from "react";
import { updateWorkout } from "../services/workoutService";

import { completeWorkout } from "../services/workoutService";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const ActiveWorkout = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const [workout, setWorkout] = useState(
        location.state?.workout
    );

    if (!workout) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                Workout not found
            </div>
        );
    }

    const handleFinishWorkout = async () => {

        try {

            const response = await completeWorkout(
                workout._id
            );

            console.log(response.data);

            toast.success(
                "Workout Completed!"
            );

            navigate("/workouts");

        }

        catch (error) {

            console.log(error.response?.data);

            toast.error(
                "Unable to complete workout"
            );

        }

    };

    const handleSetChange = (
        exerciseIndex,
        setIndex,
        field,
        value
    ) => {

        setWorkout((prev) => {

            const updatedWorkout = { ...prev };

            updatedWorkout.exercises = [...prev.exercises];

            updatedWorkout.exercises[exerciseIndex] = {
                ...updatedWorkout.exercises[exerciseIndex],
            };

            updatedWorkout.exercises[exerciseIndex].sets = [
                ...updatedWorkout.exercises[exerciseIndex].sets,
            ];

            updatedWorkout.exercises[exerciseIndex].sets[setIndex] = {
                ...updatedWorkout.exercises[exerciseIndex].sets[setIndex],
                [field]: value === "" ? "" : Number(value),
            };

            return updatedWorkout;

        });

    };

    const handleCompleteSet = async (
        set,
        actualWeight,
        actualReps
    ) => {


        if (
            actualWeight === null ||
            actualWeight === "" ||
            actualReps === null ||
            actualReps === ""
        ) {

            alert("Please enter weight and reps.");

            return;

        }

        try {

            const response = await updateWorkout(
                workout._id,
                {
                    setId: set._id,
                    actualWeight,
                    actualReps,
                    completed: true,
                }
            );

            console.log(response.data);

            setWorkout(response.data.workout);

        }

        catch (error) {

            console.log(error.response?.data);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 p-10">

            <div>

                <h1 className="text-4xl font-bold text-white">
                    {workout.routineTitle}
                </h1>

                <p className="mt-2 text-green-400">
                    {workout.status.toUpperCase()}
                </p>

            </div>

            <div className="mt-10 space-y-8">

                {workout.exercises.map((exercise, exerciseIndex) => (

                    <div
                        key={exercise._id}
                        className="rounded-xl bg-slate-900 p-6"
                    >

                        <h2 className="text-2xl font-bold text-white">
                            {exercise.exerciseName}
                        </h2>

                        <div className="mt-6 space-y-4">

                            {exercise.sets.map((set, setIndex) => (

                                <div
                                    key={set._id}
                                    className="rounded-lg bg-slate-800 p-4"
                                >

                                    <h3 className="text-white font-semibold">
                                        Set {setIndex + 1}
                                    </h3>

                                    <p className="mt-2 text-slate-300">
                                        Planned Weight :
                                        <span className="ml-2 text-white">
                                            {set.plannedWeight} kg
                                        </span>
                                    </p>

                                    <p className="text-slate-300">
                                        Planned Reps :
                                        <span className="ml-2 text-white">
                                            {set.plannedReps}
                                        </span>
                                    </p>

                                    <div className="mt-5 flex gap-4">

                                        <input
                                            type="number"
                                            placeholder="Actual Weight"
                                            value={set.actualWeight ?? ""}
                                            disabled={set.completed}
                                            onChange={(e) =>
                                                handleSetChange(
                                                    exerciseIndex,
                                                    setIndex,
                                                    "actualWeight",
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 rounded-lg bg-slate-700 p-3 text-white outline-none"
                                        />

                                        <input
                                            type="number"
                                            placeholder="Actual Reps"
                                            value={set.actualReps ?? ""}
                                            disabled={set.completed}
                                            onChange={(e) =>
                                                handleSetChange(
                                                    exerciseIndex,
                                                    setIndex,
                                                    "actualReps",
                                                    e.target.value
                                                )
                                            }
                                            className="flex-1 rounded-lg bg-slate-700 p-3 text-white outline-none"
                                        />

                                        <div className="mt-4">

                                            <button
                                                disabled={set.completed}
                                                onClick={() =>
                                                    handleCompleteSet(
                                                        set,
                                                        set.actualWeight,
                                                        set.actualReps
                                                    )
                                                }
                                                className={`rounded-lg px-4 py-2 text-white ${set.completed
                                                    ? "bg-green-700 cursor-not-allowed"
                                                    : "bg-blue-600 hover:bg-blue-700"
                                                    }`}
                                            >

                                                {set.completed
                                                    ? "Completed"
                                                    : "Complete Set"}

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>

            <div className="mt-10">

                <button
                    onClick={handleFinishWorkout}
                    className="w-full rounded-lg bg-green-600 py-4 text-lg font-semibold text-white"
                >
                    Finish Workout
                </button>

            </div>

        </div>



    );

};

export default ActiveWorkout;