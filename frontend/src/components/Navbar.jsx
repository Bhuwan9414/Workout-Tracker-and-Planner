import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="border-b border-slate-800 bg-slate-950">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}

                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-2xl font-bold text-white"
                >
                    FitTrack
                </button>

                {/* Navigation */}

                <div className="hidden items-center gap-6 md:flex">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-slate-300 transition hover:text-white"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/routines")}
                        className="text-slate-300 transition hover:text-white"
                    >
                        Routines
                    </button>

                    <button
                        onClick={() => navigate("/workouts")}
                        className="text-slate-300 transition hover:text-white"
                    >
                        Workouts
                    </button>

                </div>

                {/* User */}

                <div className="flex items-center gap-4">

                    <span className="hidden text-sm text-slate-400 sm:block">
                        {user?.name || "User"}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;