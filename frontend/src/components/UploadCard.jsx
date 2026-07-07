import { useState } from "react";
import { jsPDF } from "jspdf";
import { generateSummary } from "../services/openai";
import SummaryCard from "./SummaryCard";
import EntityCard from "./EntityCard";

export default function UploadCard() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate AI Summary
  const handleGenerate = async () => {
    if (!transcript.trim()) {
      alert("Please enter a meeting transcript.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateSummary(transcript);

      console.log(response);

      setResult(response);
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

 const downloadPDF = () => {
  if (!result) return;

  const doc = new jsPDF();

  let y = 20;

  const checkPage = () => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  };

  doc.setFontSize(18);
  doc.text("AI Meeting Notes Summary", 20, y);
  y += 15;

  // Executive Summary
  doc.setFontSize(14);
  doc.text("Executive Summary", 20, y);
  y += 8;

  doc.setFontSize(11);
  const executive = doc.splitTextToSize(result.executiveSummary, 170);
  doc.text(executive, 20, y);
  y += executive.length * 6 + 10;

  checkPage();

  // Discussion Points
  doc.setFontSize(14);
  doc.text("Key Discussion Points", 20, y);
  y += 8;

  result.keyDiscussionPoints?.forEach((point) => {
    checkPage();
    doc.setFontSize(11);
    doc.text("• " + point, 25, y);
    y += 7;
  });

  y += 8;

  // Decisions
  checkPage();

  doc.setFontSize(14);
  doc.text("Decisions", 20, y);
  y += 8;

  result.decisions?.forEach((decision) => {
    checkPage();
    doc.setFontSize(11);
    doc.text("• " + decision, 25, y);
    y += 7;
  });

  y += 8;

  // Action Items
  checkPage();

  doc.setFontSize(14);
  doc.text("Action Items", 20, y);
  y += 8;

  result.actionItems?.forEach((item) => {
    checkPage();
    doc.setFontSize(11);
    doc.text(
      `• ${item.owner} - ${item.task} (${item.deadline})`,
      25,
      y
    );
    y += 7;
  });

  y += 10;

  // Entities
  checkPage();

  doc.setFontSize(14);
  doc.text("Extracted Entities", 20, y);
  y += 8;

  const addEntitySection = (title, items) => {
    checkPage();

    doc.setFontSize(12);
    doc.text(title, 20, y);
    y += 7;

    if (items && items.length > 0) {
      items.forEach((item) => {
        checkPage();
        doc.setFontSize(11);
        doc.text("• " + item, 25, y);
        y += 6;
      });
    } else {
      doc.setFontSize(11);
      doc.text("None", 25, y);
      y += 6;
    }

    y += 5;
  };

  addEntitySection("People", result.entities?.people);
  addEntitySection("Organizations", result.entities?.organizations);
  addEntitySection("Locations", result.entities?.locations);
  addEntitySection("Dates", result.entities?.dates);

  // Responsible AI
  checkPage();

  doc.setFontSize(14);
  doc.text("Responsible AI Notice", 20, y);
  y += 8;

  doc.setFontSize(10);

  const notice = doc.splitTextToSize(
    "This meeting summary was generated using Azure OpenAI GPT-5 Mini and Azure AI Language. AI-generated content may contain inaccuracies. Always verify important decisions before acting on them.",
    170
  );

  doc.text(notice, 20, y);

  doc.save("MeetingSummary.pdf");
};

  // Copy Summary
  const copySummary = () => {
    if (!result) return;

    const text = `
Executive Summary

${result.executiveSummary}

Key Discussion Points

${result.keyDiscussionPoints.join("\n")}

Decisions

${result.decisions.join("\n")}

Action Items

${result.actionItems
  .map(
    (item) =>
      `${item.owner} - ${item.task} (${item.deadline})`
  )
  .join("\n")}
`;

    navigator.clipboard.writeText(text);

    alert("Summary copied successfully!");
  };

  // Clear Everything
  const clearAll = () => {
    setTranscript("");
    setResult(null);
  };
// Upload TXT File
const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  if (file.type !== "text/plain") {
    alert("Please upload a .txt file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    setTranscript(e.target.result);
  };

  reader.readAsText(file);
};
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">

      <h2 className="text-3xl font-bold text-center mb-3">
        AI Meeting Notes Summarizer
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Paste your meeting transcript below and generate an AI-powered summary.
      </p>
      <div className="mb-6">

  <label className="block text-lg font-semibold mb-2">
    Upload Transcript (.txt)
  </label>

  <input
    type="file"
    accept=".txt"
    onChange={handleFileUpload}
    className="block w-full border rounded-lg p-3"
  />

</div>

      <textarea
        rows="12"
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

        <button
          onClick={clearAll}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg"
        >
          Clear
        </button>

      </div>

      {result && (

        <div className="mt-10 space-y-6">

          <div className="flex justify-end gap-4">

            <button
              onClick={copySummary}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
            >
              📋 Copy Summary
            </button>

            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              📄 Download PDF
            </button>

          </div>

          <SummaryCard title="📋 Executive Summary">
            <p>{result.executiveSummary}</p>
          </SummaryCard>

          <SummaryCard title="💡 Key Discussion Points">
            <ul className="list-disc ml-6">
              {result.keyDiscussionPoints?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </SummaryCard>

          <SummaryCard title="✅ Decisions">
            <ul className="list-disc ml-6">
              {result.decisions?.map((decision, index) => (
                <li key={index}>{decision}</li>
              ))}
            </ul>
          </SummaryCard>

          <SummaryCard title="📌 Action Items">
            {result.actionItems?.length > 0 ? (
              result.actionItems.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-3 bg-gray-50"
                >
                  <p><strong>Owner:</strong> {item.owner}</p>
                  <p><strong>Task:</strong> {item.task}</p>
                  <p><strong>Deadline:</strong> {item.deadline}</p>
                </div>
              ))
            ) : (
              <p>No action items found.</p>
            )}
          </SummaryCard>

          <EntityCard entities={result.entities} />

          <SummaryCard title="⚠ Responsible AI Notice">
            <p>
              This meeting summary was generated using Azure OpenAI GPT-5 Mini
              and Azure AI Language. AI-generated content may contain
              inaccuracies. Always verify important decisions before acting on
              them.
            </p>
          </SummaryCard>

        </div>

      )}

    </div>
  );
}