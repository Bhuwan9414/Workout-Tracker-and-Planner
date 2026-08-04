import { deleteRoutine } from "../services/routineService";
import toast from "react-hot-toast";

const RoutineCard = ({ routine, onDelete, onEdit }) => {

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this routine?"
        );

        if (!confirmDelete) return;

        try {

            await deleteRoutine(routine._id);

            toast.success("Routine deleted");

            onDelete(routine._id);

        }

        catch (error) {

            console.log(error.response?.data);

            toast.error("Failed to delete routine");

        }

    };

    return (

        <div className="rounded-xl bg-slate-900 p-6 shadow">

            <h2 className="text-2xl font-semibold text-white">
                {routine.title}
            </h2>

            <p className="mt-2 text-slate-400">
                Exercises : {routine.exercises.length}
            </p>

            <div className="mt-5 flex gap-3">

                <button
                    className="rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                    Start Workout
                </button>

                <button
                    onClick={() => onEdit(routine._id)}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                    Delete
                </button>

            </div>

        </div>

    );

};



export default RoutineCard;