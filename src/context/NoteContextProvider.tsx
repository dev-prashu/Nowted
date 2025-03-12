import { useState } from "react";
import { NoteContext } from "./NoteContext";

export const NoteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [change, setIsChange] = useState<boolean>(false);

  return (
    <NoteContext.Provider value={{ change, setIsChange }}>
      {children}
    </NoteContext.Provider>
  );
};
