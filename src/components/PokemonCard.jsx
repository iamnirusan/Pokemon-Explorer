export default function PokemonCard({ poke, capitalize, getTypeColor }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 bg-gray-50">
        <img
          src={poke.sprites.front_default}
          alt={poke.name}
          className="w-32 h-32 mx-auto"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{capitalize(poke.name)}</h2>
          <span className="text-gray-500 font-semibold">#{poke.id}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {poke.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getTypeColor(
                typeInfo.type.name
              )}`}
            >
              {capitalize(typeInfo.type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
