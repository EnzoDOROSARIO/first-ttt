import { useQuery } from "react-query";
import { useTeaAdapter } from "./teaContext.tsx";

function App() {
  const { data: teas, isLoading } = useGetTeasQuery();

  if (isLoading) return <p className="text-center mt-8">Loading teas...</p>;
  if (!teas) return <p className="text-center mt-8">No teas found</p>;

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
              <p className="text-gray-500 my-2 text-sm">
                <b>Color:</b> {t.color}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const useGetTeasQuery = () => {
  const { fetchTeas } = useTeaAdapter();
  return useQuery(["teas"], fetchTeas);
};

export default App;
