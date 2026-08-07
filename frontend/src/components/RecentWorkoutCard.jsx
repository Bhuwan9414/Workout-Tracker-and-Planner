const RecentWorkoutCard = ({ workout }) => {

    return (

        <div className="rounded-xl bg-slate-900 p-5">

            <h3 className="text-xl font-semibold text-white">

                {workout.routineTitle}

            </h3>

            <p className="mt-2 capitalize text-green-400">

                {workout.status}

            </p>

            <div className="mt-4 flex gap-8">

                <div>

                    <p className="text-slate-400 text-sm">
                        Duration
                    </p>

                    <p className="text-white">

                        {workout.duration} sec

                    </p>

                </div>

                <div>

                    <p className="text-slate-400 text-sm">
                        Volume
                    </p>

                    <p className="text-white">

                        {workout.totalVolume} kg

                    </p>

                </div>

            </div>

        </div>

    );

};

export default RecentWorkoutCard;