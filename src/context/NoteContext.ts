import { createContext, Dispatch, SetStateAction } from "react";

export interface NoteContextType {
  change: boolean;
  setIsChange: Dispatch<SetStateAction<boolean>>;
}

export const NoteContext = createContext<NoteContextType | null>(null);
