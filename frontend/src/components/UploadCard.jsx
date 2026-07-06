import { useState } from "react";
import { generateSummary } from "../services/openai";

export default function UploadCard() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
  const handleGenerate = async () => {
    if (!transcript.trim()) {
      alert("Please enter a meeting transcript.");
      return;
    }

    try {
      setLoading(true);

      const result = await generateSummary(transcript);
      console.log(result);

      setResult(result);
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

      <h2 className="text-2xl font-semibold mb-4">
        Paste Meeting Transcript
      </h2>

      <textarea
        rows="10"
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full border rounded-lg p-3 mb-5"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

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
        {result.keyDiscussionPoints?.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>

    <div className="bg-gray-100 p-5 rounded-lg">
      <h3 className="text-xl font-bold">
        Decisions
      </h3>

      <ul className="list-disc ml-5">
        {result.decisions?.map((decision, index) => (
          <li key={index}>{decision}</li>
        ))}
      </ul>
    </div>

    <div className="bg-gray-100 p-5 rounded-lg">
      <h3 className="text-xl font-bold">
        Action Items
      </h3>

      {result.actionItems?.map((item, index) => (
        <div key={index} className="border-b py-2">
          <p><strong>Owner:</strong> {item.owner}</p>
          <p><strong>Task:</strong> {item.task}</p>
          <p><strong>Deadline:</strong> {item.deadline}</p>
        </div>
      ))}
    </div>

  </div>
)}

    </div>
  );
}