import AppTheme from "@/types/theme"
import Color from "color"
import darkTheme from "./darkTheme"
import lightTheme from "./lightTheme"

interface Theme {
  main: Color
  background: Color
  icon: {
    inactive: Color
  }
  typography: {
    paragraph: Color
    link: Color
  }
  like: Color
  danger: Color
}

const getTheme = (appTheme: AppTheme): Theme => {
  switch (appTheme) {
    case AppTheme.LIGHT:
      return lightTheme
    case AppTheme.DARK:
      return darkTheme
    default:
      return lightTheme
  }
}

export type { Theme }
export { getTheme }