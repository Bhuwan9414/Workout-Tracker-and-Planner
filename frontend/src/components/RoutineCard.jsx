const RoutineCard = ({ routine }) => {

    return (

        <div className="rounded-xl bg-slate-900 p-6 shadow">

            <h2 className="text-2xl font-semibold text-white">
                {routine.title}
            </h2>

            <p className="mt-2 text-slate-400">
                Exercises : {routine.exercises.length}
            </p>

            <button
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                Start Workout
            </button>

        </div>

    );

};

export default RoutineCard;