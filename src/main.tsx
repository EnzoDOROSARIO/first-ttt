import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./utils";
import { provideTeaAdapter, Tea } from "./teaContext.tsx";

const FIVE_MINUTES = 1000 * 60 * 5;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES,
    },
  },
});

const realImpl = {
  fetchTeas: async (): Promise<Tea[]> => {
    const res = await fetch("http://localhost:3000/teas");
    const json = await res.json();
    return json.data;
  },
};

const fakeImpl = {
  fetchTeas: async (): Promise<Tea[]> => {
    return [
      {
        name: "Green Tea",
        description: "Green tea description",
        color: "green",
      },
      {
        name: "Black Tea",
        description: "Black tea description",
        color: "black",
      },
      {
        name: "Herbal Tea",
        description: "Herbal tea description",
        color: "brown",
      },
    ];
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider providers={[provideTeaAdapter(realImpl)]}>
        <App />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
