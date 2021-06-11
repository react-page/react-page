import { useEffect } from "react";
import { useSetInsertMode } from "../hooks";

//For handling the slash key to open cell plugins globally
const GlobalHotKeys = () => {
  const setInsertMode = useSetInsertMode();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e?.key === "/") {
      setInsertMode();
    }
  };
  useEffect(() => {
    window?.addEventListener("keydown", handleKeyDown);
    return () => {
      window?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return null;
};

export default GlobalHotKeys;
