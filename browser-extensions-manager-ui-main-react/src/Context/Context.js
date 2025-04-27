import { createContext, useContext } from "react";

export const Context = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ContextProveider = Context.Provider;

export default function useThemeContext() {
  return useContext(Context);
}
