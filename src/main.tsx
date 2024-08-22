import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextProvider } from "./ContextProvider.tsx";
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
    return (await res.json()).data;
  },
};

const fakeImpl = {
  fetchTeas: async (): Promise<Tea[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { name: "Green Tea", description: "Green", color: "Green" },
      { name: "Black Tea", description: "Black", color: "Black" },
      { name: "White Tea", description: "White", color: "White" },
      { name: "Oolong Tea", description: "Oolong", color: "Oolong" },
    ];
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider providers={[provideTeaAdapter(fakeImpl)]}>
        <App />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
