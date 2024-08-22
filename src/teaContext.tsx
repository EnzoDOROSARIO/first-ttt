import { createGenericContext } from "./utils";

type Adapter = {
  fetchTeas: () => Promise<Tea[]>;
};
export type Tea = { name: string; description: string; color: string };

export const { useContext, createContextProvider: provideTeaAdapter } =
  createGenericContext<Adapter>();

export const useTeaAdapter = () => useContext().value;
