export default function IdeaCard({ title, category, description }: any) {
  return (
    <div className="card w-64">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="mt-2 text-gray-800">{description}</p>
    </div>
  );
}
