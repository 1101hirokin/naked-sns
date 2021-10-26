import { isBrower } from "@/utils/detect"
import { off, on } from "@/utils/listener"
import { useEffect } from "react"
import useRafState from "./useRafState"

type RectSize = { width: number, height: number }
const useWindowSize = (initWidth:number= Infinity, initHeight:number= Infinity): RectSize => {

  const [state, setState] = useRafState<RectSize>({
    width: isBrower? window.innerWidth: initWidth,
    height: isBrower? window.innerHeight: initHeight,
  })

  useEffect((): (() => void) | void => {
    if (isBrower) {
      const handler = () => {
        setState((v):RectSize => { return {width: window.innerWidth, height: window.innerHeight} })
      }

      on(window, 'resize', handler)

      return () => {
        off(window, 'resize', handler)
      }
    }
  }, [])

  return state
}

export default useWindowSize