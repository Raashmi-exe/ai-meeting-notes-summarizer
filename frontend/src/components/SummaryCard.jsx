{result && (
  <div className="mt-8 space-y-6">

    <div className="bg-gray-100 p-5 rounded-lg">
      <h3 className="text-xl font-bold">
        Executive Summary
      </h3>

      <p>{result.executiveSummary}</p>
    </div>

    <div className="bg-gray-100 p-5 rounded-lg">
      <h3 className="text-xl font-bold">
        Key Discussion Points
      </h3>

      <ul className="list-disc ml-5">
        {result.keyDiscussionPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>

    <div className="bg-gray-100 p-5 rounded-lg">
      <h3 className="text-xl font-bold">
        Decisions
      </h3>

      <ul className="list-disc ml-5">
        {result.decisions.map((decision, index) => (
          <li key={index}>{decision}</li>
        ))}
      </ul>
    </div>

    <div className="bg-gray-100 p-5 rounded-lg">
      <h3 className="text-xl font-bold">
        Action Items
      </h3>

      {result.actionItems.map((item, index) => (
        <div key={index} className="border-b py-2">
          <p><strong>Owner:</strong> {item.owner}</p>
          <p><strong>Task:</strong> {item.task}</p>
          <p><strong>Deadline:</strong> {item.deadline}</p>
        </div>
      ))}
    </div>

  </div>
)}