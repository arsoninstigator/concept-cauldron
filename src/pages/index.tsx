import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import IdeaForm from "../components/IdeaForm";
import IdeaCard from "../components/IdeaCard";
import { db } from "../lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export default function Home() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  // fetch ideas in real-time
  useEffect(() => {
    const q = query(collection(db, "ideas"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedIdeas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Ideas:", fetchedIdeas); 
      setIdeas(fetchedIdeas);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5e9dc]">
      {/* navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* submit idea button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Project Ideas</h2>
          <button onClick={() => setShowForm(true)}>Submit an Idea</button>
        </div>

        {/* idea cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {ideas.length > 0 ? (
            ideas.map((idea) => <IdeaCard key={idea.id} {...idea} />)
          ) : (
            <p className="col-span-full text-gray-600">No ideas submitted yet...</p>
          )}
        </div>
      </div>

      {/* form popup */}
      {showForm && <IdeaForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
