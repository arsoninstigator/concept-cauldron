export default function FilterBar({ category, setCategory }) {
    const categories = ["All", "App", "Game", "Website", "Hardware"];
  
    return (
      <select
        className="p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    );
  }
  