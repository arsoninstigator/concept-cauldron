import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: "",
    role: "member",
    github: "",
    linkedin: "",
    skills: "",
  });

  const handleSave = async () => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid), profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <input className="border p-2 w-full" placeholder="Username"
          value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
        <select className="border p-2 w-full mt-2" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
          <option value="member">Member</option>
          <option value="developer">Developer</option>
        </select>
        <input className="border p-2 w-full mt-2" placeholder="GitHub"
          value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
        <button onClick={handleSave} className="bg-brown-500 text-white p-2 rounded mt-4 w-full">Save</button>
      </div>
    </div>
  );
}
