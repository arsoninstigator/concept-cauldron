import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function IdeaForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("App");
  const [description, setDescription] = useState("");

  const submitIdea = async () => {
    if (!title.trim()) return;

    await addDoc(collection(db, "ideas"), {
      title,
      category,
      description,
      createdAt: new Date(),
    });

    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-3">Submit an Idea</h2>
        <input
          className="border p-2 w-full mb-2"
          type="text"
          placeholder="There should be a website that..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>App</option>
          <option>Game</option>
          <option>Website</option>
          <option>Hardware</option>
        </select>
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={submitIdea} className="w-full">Submit</button>
        <button onClick={onClose} className="mt-2 w-full bg-gray-300">Cancel</button>
      </div>
    </div>
  );
}
