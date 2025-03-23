import { useState } from "react";
import supabase from "../lib/supabase";

export default function IdeaForm({ closeForm }: { closeForm: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("website");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("ideas").insert([{ title, description, category }]);
    closeForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Submit an Idea</h2>
        <form onSubmit={handleSubmit}>
          <input className="w-full p-2 border mb-2" 
            type="text" placeholder="There should be a..." 
            value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea className="w-full p-2 border mb-2" 
            placeholder="Describe your idea (optional)" 
            value={description} onChange={(e) => setDescription(e.target.value)} />
          <select className="w-full p-2 border mb-2" value={category} 
            onChange={(e) => setCategory(e.target.value)}>
            <option value="website">Website</option>
            <option value="app">App</option>
            <option value="game">Game</option>
            <option value="hardware">Hardware</option>
          </select>
          <button className="w-full bg-black text-white p-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
}
