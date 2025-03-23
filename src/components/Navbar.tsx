import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between w-full flex-row">
      
      <div className="flex-1"></div>  

      <h1 className="text-xl font-bold text-center flex-grow text-[#3D2B1F]">
        Concept Cauldron
      </h1>

      <div className="flex-1 flex justify-end">
        <Link href="/profile">
          <button className="bg-[#6D4C3D] text-[#F5E8D9] px-4 py-2 rounded-lg shadow-md hover:bg-[#5A3C2A] transition">
            Create Profile
          </button>
        </Link>
      </div>
    </nav>
  );
}
