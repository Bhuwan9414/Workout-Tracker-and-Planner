import { useEffect, useState } from "react";
import { getAllRoutines } from "../services/routineService";
import RoutineCard from "../components/RoutineCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Routines = () => {

    const navigate = useNavigate();

    const [routines, setRoutines] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchRoutines();

    }, []);

    const handleDeleteRoutine = (routineId) => {

        setRoutines((prev) =>
            prev.filter(
                (routine) => routine._id !== routineId
            )
        );

    };

    const fetchRoutines = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getAllRoutines();

            console.log(response.data);

            setRoutines(
                response.data.routines || []
            );

        } catch (error) {

            console.log(error.response?.data);

            setError(
                error.response?.data?.message ||
                "Unable to load routines."
            );

        } finally {

            setLoading(false);

        }

    };

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
                            Loading routines...
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Fetching your workout routines
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
                            onClick={fetchRoutines}
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

            <div className="min-h-screen bg-slate-950 p-10">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            My Routines
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Manage your workout routines.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/create-routine")}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Create Routine
                    </button>

                </div>


                {/* Empty State */}

                {routines.length === 0 ? (

                    <div className="rounded-xl bg-slate-900 p-10 text-center">

                        <h2 className="text-2xl font-semibold text-white">
                            No routines yet
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Create your first workout routine to get started.
                        </p>

                        <button
                            onClick={() => navigate("/create-routine")}
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Create Your First Routine
                        </button>

                    </div>

                ) : (

                    /* Routine List */

                    <div className="grid gap-6 md:grid-cols-2">

                        {routines.map((routine) => (

                            <RoutineCard
                                key={routine._id}
                                routine={routine}
                                onDelete={handleDeleteRoutine}
                                onEdit={(id) =>
                                    navigate(`/edit-routine/${id}`)
                                }
                            />

                        ))}

                    </div>

                )}

            </div>

        </>

    );

};

export default Routines;