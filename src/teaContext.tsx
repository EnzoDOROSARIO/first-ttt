import { createGenericContext } from "./createGenericContext.tsx";

export type Tea = { name: string; description: string; color: string };

type Adapter = {
  fetchTeas(): Promise<Tea[]>;
};

export const { useContext, createContextProvider: provideTeaAdapter } =
  createGenericContext<Adapter>();

export const useTeaAdapter = () => useContext().value;
