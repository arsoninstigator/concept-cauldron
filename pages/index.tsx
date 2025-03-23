import { useState } from "react";
import IdeaForm from "../components/IdeaForm";
import IdeaList from "../components/IdeaList";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold">🚀 Project Ideas Platform</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
      >
        + Submit an Idea
      </button>
      {isFormOpen && <IdeaForm closeForm={() => setIsFormOpen(false)} />}
      <IdeaList />
    </div>
  );
}
