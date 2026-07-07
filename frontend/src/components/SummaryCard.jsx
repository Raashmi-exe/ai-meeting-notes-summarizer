export default function SummaryCard({ title, children }) {

    return (

        <div className="bg-white shadow-lg rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">

                {title}

            </h2>

            {children}

        </div>

    );

}