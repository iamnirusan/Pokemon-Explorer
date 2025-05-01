import { useState, useEffect } from "react";
import _ from "lodash";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchFilter from "./components/SearchFilter";
import PokemonCard from "./components/PokemonCard";
import { LoaderScreen } from "./components/LoaderScreen";
import { ErrorScreen } from "./components/ErrorScreen";

export default function PokemonExplorer() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);

        // Fetch the list of first 150 Pokemon
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        if (!response.ok) throw new Error("Failed to fetch Pokemon data");

        const data = await response.json();

        // Fetch detailed information for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            if (!res.ok)
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            return res.json();
          })
        );

        // Extract all unique types
        const allTypes = [];
        pokemonDetails.forEach((pokemon) => {
          pokemon.types.forEach((typeInfo) => {
            if (!allTypes.includes(typeInfo.type.name)) {
              allTypes.push(typeInfo.type.name);
            }
          });
        });

        setTypes(allTypes.sort());
        setPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokemon based on search term and selected type
  useEffect(() => {
    const filtered = pokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "" ||
        p.types.some((t) => t.type.name === selectedType);
      return matchesSearch && matchesType;
    });

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Capitalize first letter of a string
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Get type color based on type name
  const getTypeColor = (type) => {
    const typeColors = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-200",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-700",
      flying: "bg-indigo-300",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-600",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-700",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };

    return typeColors[type] || "bg-gray-400";
  };

  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <SearchFilter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        selectedType={selectedType}
        handleTypeChange={handleTypeChange}
        types={types}
        capitalize={capitalize}
      />
      <main className="flex-grow container mx-auto px-4 py-6">
        {loading ? (
          <LoaderScreen />
        ) : filteredPokemon.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                No Pokémon found matching your search.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((poke) => (
              <PokemonCard
                key={poke.id}
                poke={poke}
                capitalize={capitalize}
                getTypeColor={getTypeColor}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
  
}
