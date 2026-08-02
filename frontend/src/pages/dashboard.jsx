import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold">
                Welcome {user?.name || "User"} 👋
            </h1>

            <p className="mt-2 text-slate-400">
                What would you like to do?
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

                <button
                    onClick={() => navigate("/create-routine")}
                    className="rounded-xl bg-slate-900 p-6 text-left hover:bg-slate-800"
                >
                    <h2 className="text-xl font-semibold">
                        ➕ Create Routine
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Build a new workout routine.
                    </p>
                </button>

                <button
                    onClick={() => navigate("/routines")}
                    className="rounded-xl bg-slate-900 p-6 text-left hover:bg-slate-800"
                >

                    <h2 className="text-xl font-semibold">
                        📋 My Routines
                    </h2>

                    <p className="mt-2 text-slate-400">
                        View and manage your workout routines.
                    </p>

                </button>

                <button
                    onClick={() => navigate("/history")}
                    className="rounded-xl bg-slate-900 p-6 text-left hover:bg-slate-800"
                >
                    <h2 className="text-xl font-semibold">
                        📈 Workout History
                    </h2>

                    <p className="mt-2 text-slate-400">
                        View completed workouts.
                    </p>
                </button>

            </div>

            <button
                onClick={handleLogout}
                className="mt-10 rounded-lg bg-red-600 px-6 py-3"
            >
                Logout
            </button>

        </div>
    );
};

export default Dashboard;