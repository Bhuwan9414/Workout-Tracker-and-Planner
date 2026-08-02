import { useEffect, useState } from "react";
import { fetchExercises } from "../services/exerciseService";

const CreateRoutine = () => {

    const [title, setTitle] = useState("");
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

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
                    [field]: value,
                };

                return {
                    ...exercise,
                    sets: updatedSets,
                };

            })
        );

    };

    console.log(selectedExercises);

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

            <h2 className="mt-12 mb-5 text-2xl font-semibold text-white">
                Selected Exercises
            </h2>

            {

                selectedExercises.length === 0 ?

                    (

                        <p className="text-slate-400">
                            No exercise selected.
                        </p>

                    )

                    :

                    (

                        <div className="space-y-5">

                            {

                                selectedExercises.map((exercise) => (

                                    <div
                                        key={exercise.exerciseId}
                                        className="rounded-xl bg-slate-900 p-5"
                                    >

                                        <h3 className="text-xl font-semibold text-white">
                                            {exercise.exerciseName}
                                        </h3>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default CreateRoutine;