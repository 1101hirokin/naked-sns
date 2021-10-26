import styles from '@/styles/components/atoms/TextButton.module.scss'
import CSS from 'csstype'
import { isColorLight } from "@/helpers/isColorLight"
import classNames from "classnames"
import Color from "color"
import { MouseEventHandler } from "react"

interface ButtonProps {
  id?: string
  className?: string

  block?: boolean
  text?: string
  outline?: boolean
  color?: string

  disabled?: boolean
  disabledBackgroundColor?: string
  backgroundColor?: string
  borderColor?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  fontSize?: CSS.Property.FontSize,
}

const TextButton = (p: ButtonProps) => {

  const bgColor = ((): Color => {
    if (p.disabled) {
      if (p.disabledBackgroundColor) return Color(p.disabledBackgroundColor)
      return Color("#bababa")
    }
    if (p.outline) return Color("#00000000")
    if (!p.backgroundColor) return Color("#ffffff")

    return Color(p.backgroundColor)    
  })()
  const textColor = (():Color => {
    if (p.disabled) return Color("#ffffff")
    if (!p.color) {
      if (isColorLight(bgColor)) return Color("#000000")
      return Color("#ffffff")
    }
    return Color(p.color)
  })()

  const borderColor = (() => {
    if (p.outline) return textColor
    else if (p.borderColor) return Color(p.borderColor)

    return bgColor
  })()

  const display = (():CSS.Property.Display => {
    if (p.block) return "block"
    
    return "inline-block"
  })()

  const fSize = (():CSS.Property.FontSize => {
    if (p.fontSize) return p.fontSize
    return "1rem"
  })()

  return (
    <button
      id={p.id}
      className={classNames(
        styles.b,
        p.className,
      )}
      onClick={(e) => {
        if (!p.disabled && p.onClick) p.onClick(e)
      }}
      
      style={{
        display: display,
        color: textColor.toString(),
        backgroundColor: bgColor.toString(),
        borderColor: borderColor.toString(),
        borderWidth: "1px",
        borderStyle: "solid",
        fontSize: fSize,
      }}
    >{p.text}</button>
  )
}

export default TextButton