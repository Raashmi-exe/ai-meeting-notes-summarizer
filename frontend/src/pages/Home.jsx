import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import Footer from "../components/Footer";

export default function Home() {

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <UploadCard />

      </div>

      <Footer />

    </div>

  );

}