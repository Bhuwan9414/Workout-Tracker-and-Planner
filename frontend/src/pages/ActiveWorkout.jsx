// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { updateWorkout, completeWorkout } from "../services/workoutService";
// import Navbar from "../components/Navbar";
// import toast from "react-hot-toast";

// const ActiveWorkout = () => {

//     const location = useLocation();

//     const navigate = useNavigate();

//     const [workout, setWorkout] = useState(
//         location.state?.workout
//     );
//     const [completingSetId, setCompletingSetId] = useState(null);

//     const [finishingWorkout, setFinishingWorkout] = useState(false);


//     if (!workout) {

//         return (

//             <>

//                 <Navbar />

//                 <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

//                     <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 text-center">

//                         <h1 className="text-2xl font-bold text-white">
//                             Workout Not Found
//                         </h1>

//                         <p className="mt-3 text-slate-400">
//                             This workout could not be loaded.
//                         </p>

//                         <button
//                             onClick={() => navigate("/workouts")}
//                             className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
//                         >
//                             Go to Workout History
//                         </button>

//                     </div>

//                 </div>

//             </>

//         );

//     }


//     const handleFinishWorkout = async () => {

//         if (finishingWorkout) {
//             return;
//         }

//         try {

//             setFinishingWorkout(true);

//             const response = await completeWorkout(
//                 workout._id
//             );

//             console.log(response.data);

//             toast.success(
//                 "Workout completed successfully!"
//             );

//             navigate("/workouts");

//         }

//         catch (error) {

//             console.log(error.response?.data);

//             toast.error(
//                 error.response?.data?.message ||
//                 "Unable to complete workout"
//             );

//         }

//         finally {

//             setFinishingWorkout(false);

//         }

//     };


//     const handleSetChange = (
//         exerciseIndex,
//         setIndex,
//         field,
//         value
//     ) => {

//         setWorkout((prev) => {

//             const updatedWorkout = {
//                 ...prev
//             };

//             updatedWorkout.exercises = [
//                 ...prev.exercises
//             ];

//             updatedWorkout.exercises[exerciseIndex] = {
//                 ...updatedWorkout.exercises[exerciseIndex],
//             };

//             updatedWorkout.exercises[exerciseIndex].sets = [
//                 ...updatedWorkout.exercises[exerciseIndex].sets,
//             ];

//             updatedWorkout.exercises[exerciseIndex].sets[setIndex] = {
//                 ...updatedWorkout.exercises[exerciseIndex].sets[setIndex],
//                 [field]:
//                     value === ""
//                         ? ""
//                         : Number(value),
//             };

//             return updatedWorkout;

//         });

//     };


//     const handleCompleteSet = async (
//         set,
//         actualWeight,
//         actualReps
//     ) => {

//         if (
//             actualWeight === null ||
//             actualWeight === "" ||
//             actualReps === null ||
//             actualReps === ""
//         ) {

//             toast.error(
//                 "Please enter weight and reps."
//             );

//             return;

//         }


//         if (completingSetId) {
//             return;
//         }


//         try {

//             setCompletingSetId(set._id);

//             const response = await updateWorkout(
//                 workout._id,
//                 {
//                     setId: set._id,
//                     actualWeight,
//                     actualReps,
//                     completed: true,
//                 }
//             );

//             console.log(response.data);

//             setWorkout(
//                 response.data.workout
//             );

//             toast.success(
//                 "Set completed!"
//             );

//         }

//         catch (error) {

//             console.log(error.response?.data);

//             toast.error(
//                 error.response?.data?.message ||
//                 "Unable to complete set"
//             );

//         }

//         finally {

//             setCompletingSetId(null);

//         }

//     };


//     return (

//         <>

//             <Navbar />

//             <div className="min-h-screen bg-slate-950 p-6 md:p-10">

//                 {/* Header */}

//                 <div className="mx-auto max-w-5xl">

//                     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//                         <div>

//                             <h1 className="text-4xl font-bold text-white">

//                                 {workout.routineTitle}

//                             </h1>

//                             <p className="mt-2 inline-block rounded-full bg-blue-900/40 px-3 py-1 text-sm font-medium uppercase text-blue-400">

//                                 {workout.status}

//                             </p>

//                         </div>

//                         <div className="text-sm text-slate-400">

//                             Complete each set as you go

//                         </div>

//                     </div>


//                     {/* Exercises */}

//                     <div className="mt-10 space-y-8">

//                         {workout.exercises.map(
//                             (exercise, exerciseIndex) => (

//                                 <div
//                                     key={exercise._id}
//                                     className="rounded-xl border border-slate-800 bg-slate-900 p-6"
//                                 >

//                                     {/* Exercise Header */}

//                                     <div className="flex items-center justify-between">

//                                         <div>

//                                             <h2 className="text-2xl font-bold text-white">

//                                                 {exercise.exerciseName}

//                                             </h2>

//                                             <p className="mt-1 text-sm text-slate-400">

//                                                 {exercise.sets.length} sets

//                                             </p>

//                                         </div>

//                                     </div>


//                                     {/* Sets */}

//                                     <div className="mt-6 space-y-4">

//                                         {exercise.sets.map(
//                                             (set, setIndex) => {

//                                                 const isCompleting =
//                                                     completingSetId ===
//                                                     set._id;

//                                                 return (

//                                                     <div
//                                                         key={set._id}
//                                                         className={`rounded-lg border p-4 transition ${set.completed
//                                                             ? "border-green-800 bg-green-950/20"
//                                                             : "border-slate-700 bg-slate-800"
//                                                             }`}
//                                                     >

//                                                         {/* Set Header */}

//                                                         <div className="flex items-center justify-between">

//                                                             <h3 className="font-semibold text-white">

//                                                                 Set {setIndex + 1}

//                                                             </h3>

//                                                             {set.completed && (

//                                                                 <span className="rounded-full bg-green-900/50 px-3 py-1 text-xs font-semibold text-green-400">

//                                                                     ✓ Completed

//                                                                 </span>

//                                                             )}

//                                                         </div>


//                                                         {/* Planned Values */}

//                                                         <div className="mt-4 grid grid-cols-2 gap-4">

//                                                             <div>

//                                                                 <p className="text-sm text-slate-400">

//                                                                     Planned Weight

//                                                                 </p>

//                                                                 <p className="mt-1 text-white">

//                                                                     {set.plannedWeight} kg

//                                                                 </p>

//                                                             </div>


//                                                             <div>

//                                                                 <p className="text-sm text-slate-400">

//                                                                     Planned Reps

//                                                                 </p>

//                                                                 <p className="mt-1 text-white">

//                                                                     {set.plannedReps}

//                                                                 </p>

//                                                             </div>

//                                                         </div>


//                                                         {/* Actual Values */}

//                                                         <div className="mt-5 grid gap-4 md:grid-cols-2">

//                                                             <div>

//                                                                 <label className="mb-2 block text-sm text-slate-400">

//                                                                     Actual Weight

//                                                                 </label>

//                                                                 <input
//                                                                     type="number"
//                                                                     placeholder="Enter weight"
//                                                                     value={
//                                                                         set.actualWeight ??
//                                                                         ""
//                                                                     }
//                                                                     disabled={
//                                                                         set.completed ||
//                                                                         isCompleting
//                                                                     }
//                                                                     onChange={(e) =>
//                                                                         handleSetChange(
//                                                                             exerciseIndex,
//                                                                             setIndex,
//                                                                             "actualWeight",
//                                                                             e.target.value
//                                                                         )
//                                                                     }
//                                                                     className="w-full rounded-lg border border-slate-700 bg-slate-700 p-3 text-white outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
//                                                                 />

//                                                             </div>


//                                                             <div>

//                                                                 <label className="mb-2 block text-sm text-slate-400">

//                                                                     Actual Reps

//                                                                 </label>

//                                                                 <input
//                                                                     type="number"
//                                                                     placeholder="Enter reps"
//                                                                     value={
//                                                                         set.actualReps ??
//                                                                         ""
//                                                                     }
//                                                                     disabled={
//                                                                         set.completed ||
//                                                                         isCompleting
//                                                                     }
//                                                                     onChange={(e) =>
//                                                                         handleSetChange(
//                                                                             exerciseIndex,
//                                                                             setIndex,
//                                                                             "actualReps",
//                                                                             e.target.value
//                                                                         )
//                                                                     }
//                                                                     className="w-full rounded-lg border border-slate-700 bg-slate-700 p-3 text-white outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
//                                                                 />

//                                                             </div>

//                                                         </div>


//                                                         {/* Complete Set */}

//                                                         <button
//                                                             disabled={
//                                                                 set.completed ||
//                                                                 isCompleting
//                                                             }
//                                                             onClick={() =>
//                                                                 handleCompleteSet(
//                                                                     set,
//                                                                     set.actualWeight,
//                                                                     set.actualReps
//                                                                 )
//                                                             }
//                                                             className={`mt-5 w-full rounded-lg px-4 py-3 font-semibold text-white transition ${set.completed
//                                                                 ? "cursor-not-allowed bg-green-700"
//                                                                 : "bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                                                                 }`}
//                                                         >

//                                                             {set.completed
//                                                                 ? "✓ Set Completed"
//                                                                 : isCompleting
//                                                                     ? "Saving..."
//                                                                     : "Complete Set"}

//                                                         </button>

//                                                     </div>

//                                                 );

//                                             }
//                                         )}

//                                     </div>

//                                 </div>

//                             )
//                         )}

//                     </div>


//                     {/* Finish Workout */}

//                     <div className="mt-10">

//                         <button
//                             onClick={handleFinishWorkout}
//                             disabled={finishingWorkout}
//                             className="w-full rounded-lg bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
//                         >

//                             {finishingWorkout
//                                 ? "Finishing Workout..."
//                                 : "Finish Workout"}

//                         </button>

//                     </div>

//                 </div>

//             </div>

//         </>

//     );

// };

// export default ActiveWorkout;



import { useLocation } from "react-router-dom";
import { useState } from "react";
import { updateWorkout } from "../services/workoutService";
import Navbar from "../components/Navbar";
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

        <>
            <Navbar />

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

        </>

    );

};

export default ActiveWorkout;