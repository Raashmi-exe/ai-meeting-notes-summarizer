import { useState } from "react";

export default function UploadCard() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGenerate = () => {
    if (!selectedFile) {
      alert("Please select an audio file first.");
      return;
    }

    alert(`Generating transcript for: ${selectedFile.name}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

      <h2 className="text-2xl font-semibold mb-4">
        Upload Meeting Audio
      </h2>

      <input
        type="file"
        accept=".mp3,.wav,.m4a"
        onChange={handleFileChange}
        className="mb-5"
      />

      {selectedFile && (
        <p className="text-green-700 mb-5">
          Selected File: <strong>{selectedFile.name}</strong>
        </p>
      )}

      <button
        onClick={handleGenerate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Generate Transcript
      </button>

    </div>
  );
}