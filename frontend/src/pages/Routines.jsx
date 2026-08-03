import { useEffect, useState } from "react";
import { getAllRoutines } from "../services/routineService";
import RoutineCard from "../components/RoutineCard";
import { useNavigate } from "react-router-dom";

const Routines = () => {

    const navigate = useNavigate();


    const [routines, setRoutines] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchRoutines();

    }, []);

    const fetchRoutines = async () => {

        try {

            const response = await getAllRoutines();

            console.log(response.data);

            setRoutines(response.data.routines);

        } catch (error) {

            console.log(error.response?.data);

        } finally {

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

    return (
        

        <div className="min-h-screen bg-slate-950 p-10">

            <div className="mb-8 flex items-center justify-between">

                <h1 className="text-4xl font-bold text-white">
                    My Routines
                </h1>

                <button
                    onClick={() => navigate("/create-routine")}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white"
                >
                    + Create Routine
                </button>

            </div>

            {routines.length === 0 ? (

                <p className="text-slate-400">
                    No routines found.
                </p>

            ) : (

                <div className="grid gap-6 md:grid-cols-2">

                    {routines.map((routine) => (

                        <RoutineCard
                            key={routine._id}
                            routine={routine}
                        />

                    ))}

                </div>

            )}

        </div>

    );

};

export default Routines;