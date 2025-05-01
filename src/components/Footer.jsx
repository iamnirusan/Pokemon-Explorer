export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p>
          Data provided by{" "}
          <a
            href="https://pokeapi.co/"
            className="text-red-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokéAPI
          </a>
        </p>
      </div>
    </footer>
  );
}
