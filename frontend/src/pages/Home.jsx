import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <UploadCard />

      </div>

    </div>
  );
}