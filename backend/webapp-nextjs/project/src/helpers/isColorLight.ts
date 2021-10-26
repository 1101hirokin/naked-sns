import Color from "color";

const isColorLight = (c: Color): boolean => {
  return (c.red() * .299 + c.green() * .587 + c.blue() * .114) >= 186
}

export {isColorLight}