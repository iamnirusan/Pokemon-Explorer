import { Search, Filter } from "lucide-react";

export default function SearchFilter({
  searchTerm,
  handleSearchChange,
  selectedType,
  handleTypeChange,
  types,
  capitalize,
}) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Filter className="h-5 w-5 text-gray-400" />
  </div>
  <select
    className="appearance-none pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
    value={selectedType}
    onChange={handleTypeChange}
  >
    <option value="">All Types</option>
    {types.map((type) => (
      <option key={type} value={type}>
        {capitalize(type)}
      </option>
    ))}
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

      </div>
    </div>
  );
}
