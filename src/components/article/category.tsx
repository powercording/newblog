type Category = {
  categories: string[];
};

export default function Category({ categories }: Category) {
  return (
    <>
      {categories.map(category => (
        <span
          className="px-2 py-1 rounded-full border border-gray-400 text-xs bg-slate-400 text-white"
          key={category}
        >
          {category}
        </span>
      ))}
    </>
  );
}
