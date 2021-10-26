import React from "react"
import CSS from 'csstype'

interface HighlighterProps {
  raw: string

  highlightColor?: CSS.Property.Color
}

const Highlighter = (p: HighlighterProps) => {

  let replaced = p.raw.
    replace(/((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',*!]+))/g, " $& ").
    trim().replace(/(\n){3,}/g, "\n\n").
    replace(/　/g, " ").
    replace(/ +/g, " ")

  const separator = /( +)|(　+)|(\n)/
  const splitted = replaced.split(separator)

  const elm = splitted.map((w, i) => {
    if (typeof w === 'undefined') return <React.Fragment key={i}></React.Fragment>
    if (!w.length) return <React.Fragment key={i}></React.Fragment>

    if (/( +)/.test(w)) {
      return <React.Fragment key={i}> </React.Fragment>
    }

    if (/\n+/.test(w)) {
      return <br key={i} />
    }

    if (/^((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))$/.test(w)) {
      return <span key={i}><a target="_blank" rel="noopener" href={w} style={{color: p.highlightColor}}>{w}</a></span>
    }
    
    return <span key={i}>{w}</span>
  })

  return (
    <>
      {elm}
    </>
  )
}

export default Highlighter