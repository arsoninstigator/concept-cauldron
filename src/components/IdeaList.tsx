import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function IdeaList() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const snapshot = await getDocs(collection(db, "ideas"));
      setIdeas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchIdeas();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {ideas.map((idea) => (
        <div key={idea.id} className="bg-pastel p-4 rounded-lg shadow">
          <h3 className="font-semibold">{idea.title}</h3>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  );
}
