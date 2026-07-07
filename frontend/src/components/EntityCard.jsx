export default function EntityCard({ entities }) {
  if (!entities) return null;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        🏷️ Extracted Entities
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-blue-600 mb-2">👤 People</h3>
          <ul className="list-disc ml-5">
            {entities.people?.length
              ? entities.people.map((p, i) => <li key={i}>{p}</li>)
              : <li>None</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-blue-600 mb-2">🏢 Organizations</h3>
          <ul className="list-disc ml-5">
            {entities.organizations?.length
              ? entities.organizations.map((o, i) => <li key={i}>{o}</li>)
              : <li>None</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-blue-600 mb-2">📍 Locations</h3>
          <ul className="list-disc ml-5">
            {entities.locations?.length
              ? entities.locations.map((l, i) => <li key={i}>{l}</li>)
              : <li>None</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-blue-600 mb-2">📅 Dates</h3>
          <ul className="list-disc ml-5">
            {entities.dates?.length
              ? entities.dates.map((d, i) => <li key={i}>{d}</li>)
              : <li>None</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}