import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function IdeaList() {
  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data } = await supabase.from("ideas").select("*");
      setIdeas(data || []);
    };
    fetchIdeas();
  }, []);

  return (
    <div className="mt-6">
      {ideas.map((idea) => (
        <div key={idea.id} className="bg-white p-4 m-2 rounded shadow">
          <h3 className="font-bold">{idea.title}</h3>
          <p>{idea.description}</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
            Claim
          </button>
        </div>
      ))}
    </div>
  );
}
