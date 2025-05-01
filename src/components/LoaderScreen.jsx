import { Loader } from "lucide-react";

export function LoaderScreen() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <Loader className="h-12 w-12 text-red-500 animate-spin mx-auto" />
        <p className="mt-4 text-lg text-gray-600">Loading Pokémon...</p>
      </div>
    </div>
  );
}
