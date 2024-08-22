import { useEffect, useState } from "react";

function App() {
  const [teas, setTeas] = useState<{ name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initTeas = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/teas");
        const json = await res.json();
        setTeas(json.data);
      } catch (error) {
        console.error("Error fetching teas:", error);
      } finally {
        setLoading(false);
      }
    };

    initTeas();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading teas...</p>;

  return (
    <div className="mx-4">
      <h1 className="text-3xl font-bold text-center text-green-300 mt-2 mb-8">
        Tea Tech Time
      </h1>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {teas.map((t) => (
          <li
            key={t.name}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="flex-1 flex flex-col p-8">
              <h3 className="text-gray-900 text-sm font-medium">{t.name}</h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dt className="sr-only">Description</dt>
                <dd className="text-gray-500 text-sm">{t.description}</dd>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
