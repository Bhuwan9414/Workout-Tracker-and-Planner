const StatCard = ({ title, value }) => {

    return (

        <div className="rounded-xl bg-slate-900 p-6 shadow-lg">

            <p className="text-slate-400 text-sm">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
                {value}
            </h2>

        </div>

    );

};

export default StatCard;