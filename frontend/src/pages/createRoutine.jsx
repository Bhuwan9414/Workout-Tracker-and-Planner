import { useEffect, useState } from "react";
import { fetchExercises } from "../services/exerciseService";

import { createRoutine } from "../services/routineService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateRoutine = () => {

    const [title, setTitle] = useState("");
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadExercises();
    }, []);

    const loadExercises = async () => {
        try {

            const response = await fetchExercises();

            console.log(response.data);

            setExercises(response.data.exercises);

        } catch (error) {

            console.log(error.response?.data);

        } finally {

            setLoading(false);

        }
    };

    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddExercise = (exercise) => {

        const alreadyExists = selectedExercises.some(
            (item) => item.exerciseId === exercise._id
        );

        if (alreadyExists) return;

        setSelectedExercises((prev) => [
            ...prev,
            {
                exerciseId: exercise._id,
                exerciseName: exercise.name,
                sets: [
                    {
                        targetWeight: "",
                        targetReps: "",
                    },
                ],
            },
        ]);
    };


    const handleAddSet = (exerciseId) => {

        setSelectedExercises((prev) =>
            prev.map((exercise) => {

                if (exercise.exerciseId !== exerciseId) {
                    return exercise;
                }

                return {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        {
                            targetWeight: "",
                            targetReps: "",
                        },
                    ],
                };

            })
        );

    };


    const handleSetChange = (
        exerciseId,
        setIndex,
        field,
        value
    ) => {

        setSelectedExercises((prev) =>
            prev.map((exercise) => {

                if (exercise.exerciseId !== exerciseId) {
                    return exercise;
                }

                const updatedSets = [...exercise.sets];

                updatedSets[setIndex] = {
                    ...updatedSets[setIndex],
                    [field]: Number(value),
                };

                return {
                    ...exercise,
                    sets: updatedSets,
                };

            })
        );

    };

    const validateRoutine = () => {

        console.log(title);
        console.log(selectedExercises);

        if (!title.trim()) {

            toast.error("Routine title is required");
            return false;

        }

        if (selectedExercises.length === 0) {

            toast.error("Please add at least one exercise");
            return false;

        }

        for (const exercise of selectedExercises) {

            for (const set of exercise.sets) {

                if (
                    !set.targetWeight ||
                    !set.targetReps
                ) {

                    toast.error(
                        `Complete all sets for ${exercise.exerciseName}`
                    );

                    return false;

                }

            }

        }

        return true;

    };

   const handleSaveRoutine = async () => {

    console.log("Save button clicked");

    if (!validateRoutine()) return;

    const payload = {
        title,
        exercises: selectedExercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
        })),
    };

    console.log(payload);

    try {

        const response = await createRoutine(payload);

        console.log(response.data);

        toast.success("Routine created successfully");

        navigate("/routines");

    } catch (error) {

        console.log(error.response?.data);

        toast.error(
            error.response?.data?.message ||
            "Failed to create routine"
        );

    }

};


    return (

        <div className="min-h-screen bg-slate-950 p-10">

            <h1 className="mb-10 text-4xl font-bold text-white">
                Create Routine
            </h1>

            {/* Routine Title */}

            <div className="mb-8">

                <label className="mb-2 block text-white">
                    Routine Title
                </label>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Push Day"
                    className="w-full rounded-lg bg-slate-900 p-3 text-white outline-none"
                />

            </div>

            {/* Search */}

            <div className="mb-8">

                <input
                    type="text"
                    placeholder="Search Exercise..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg bg-slate-900 p-3 text-white outline-none"
                />

            </div>

            {/* Exercise List */}

            <h2 className="mb-5 text-2xl font-semibold text-white">
                Exercises
            </h2>

            {

                loading ?

                    (

                        <p className="text-white">
                            Loading...
                        </p>

                    )

                    :

                    (

                        <div className="space-y-3">

                            {

                                filteredExercises.map((exercise) => (

                                    <div
                                        key={exercise._id}
                                        className="flex items-center justify-between rounded-lg bg-slate-900 p-4"
                                    >

                                        <div>

                                            <h3 className="text-lg text-white">
                                                {exercise.name}
                                            </h3>

                                            <p className="text-sm text-slate-400 capitalize">
                                                {exercise.muscleGroup}
                                            </p>

                                        </div>

                                        <button
                                            onClick={() => handleAddExercise(exercise)}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                                        >
                                            Add
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    )

            }

            {/* Selected Exercises */}

            {/* Selected Exercises */}

            <h2 className="mt-12 mb-5 text-2xl font-semibold text-white">
                Selected Exercises
            </h2>

            {
                selectedExercises.length === 0 ? (

                    <p className="text-slate-400">
                        No exercise selected.
                    </p>

                ) : (

                    <div className="space-y-6">

                        {selectedExercises.map((exercise) => (

                            <div
                                key={exercise.exerciseId}
                                className="rounded-xl bg-slate-900 p-6"
                            >

                                <div className="flex items-center justify-between">

                                    <h3 className="text-xl font-semibold text-white">
                                        {exercise.exerciseName}
                                    </h3>

                                    <button
                                        onClick={() =>
                                            setSelectedExercises((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item.exerciseId !== exercise.exerciseId
                                                )
                                            )
                                        }
                                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                    >
                                        Remove
                                    </button>

                                </div>

                                <div className="mt-6 space-y-4">

                                    {exercise.sets.map((set, index) => (

                                        <div
                                            key={index}
                                            className="rounded-lg bg-slate-800 p-4"
                                        >

                                            <p className="mb-3 text-white font-medium">
                                                Set {index + 1}
                                            </p>

                                            <div className="flex gap-4">

                                                <input
                                                    type="number"
                                                    placeholder="Weight"
                                                    value={set.targetWeight}
                                                    onChange={(e) =>
                                                        handleSetChange(
                                                            exercise.exerciseId,
                                                            index,
                                                            "targetWeight",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-1 rounded-lg bg-slate-700 p-3 text-white outline-none"
                                                />

                                                <input
                                                    type="number"
                                                    placeholder="Reps"
                                                    value={set.targetReps}
                                                    onChange={(e) =>
                                                        handleSetChange(
                                                            exercise.exerciseId,
                                                            index,
                                                            "targetReps",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-1 rounded-lg bg-slate-700 p-3 text-white outline-none"
                                                />

                                            </div>

                                            <button
                                                onClick={() => {

                                                    if (exercise.sets.length === 1)
                                                        return;

                                                    setSelectedExercises((prev) =>
                                                        prev.map((item) => {

                                                            if (
                                                                item.exerciseId !==
                                                                exercise.exerciseId
                                                            )
                                                                return item;

                                                            return {
                                                                ...item,
                                                                sets: item.sets.filter(
                                                                    (_, i) =>
                                                                        i !== index
                                                                ),
                                                            };

                                                        })
                                                    );

                                                }}
                                                className="mt-3 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                            >
                                                Remove Set
                                            </button>

                                        </div>

                                    ))}

                                </div>

                                <button
                                    onClick={() =>
                                        handleAddSet(exercise.exerciseId)
                                    }
                                    className="mt-5 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                >
                                    + Add Set
                                </button>

                            </div>

                        ))}

                    </div>

                )
            }

            <div className="mt-10">

                <button
                    type="button"
                    onClick={handleSaveRoutine}
                    className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700"
                >
                    Save Routine
                </button>

            </div>

        </div>

    );

};

export default CreateRoutine;