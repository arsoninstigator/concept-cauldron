import { useState } from "react";
import supabase from "../lib/supabase";

export default function ProfileForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("member");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      alert("You must accept the privacy policy.");
      return;
    }
    await supabase.from("profiles").insert([{ email, username, role }]);
    alert("Profile created!");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold">Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-full p-2 border mb-2" type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 border mb-2" type="text" placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)} required />
        <select className="w-full p-2 border mb-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="developer">Developer</option>
        </select>
        <input type="checkbox" checked={privacyAccepted} 
          onChange={(e) => setPrivacyAccepted(e.target.checked)} />
        <label className="ml-2">I accept the Privacy Policy</label>
        <button className="w-full bg-black text-white p-2 rounded">Create Profile</button>
      </form>
    </div>
  );
}
