import AppTheme from "@/types/theme";
import { createContext, Dispatch, Reducer, useReducer } from "react";

type ThemeState = {
  mode: AppTheme
}

const initState: ThemeState = {
  mode: AppTheme.LIGHT,
}

type ThemeReducerAction = {
  type: "LIGHT"
} | {
  type: "DARK"
}

export const ThemeContext = createContext({
  state: initState,
  dispatch: (action: ThemeReducerAction): void => {}
} as {
  state: ThemeState,
  dispatch: Dispatch<ThemeReducerAction>
});

const themeReducer: Reducer<ThemeState, ThemeReducerAction> = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      return {
        ...state,
        mode: AppTheme.LIGHT
      }
    case "DARK":
      return {
        ...state,
        mode: AppTheme.DARK
      }
    default:
      return state
  }
}

interface ThemeProviderProps {
  children?: React.ReactNode
}
export const ThemeProvider = (p:ThemeProviderProps) => {
  const [state, dispatch] = useReducer(themeReducer, initState)

  return <ThemeContext.Provider value={{state, dispatch}}>{p.children}</ThemeContext.Provider>
}