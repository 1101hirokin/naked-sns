import { getTheme } from "@/colors/theme";
import { ThemeContext } from "@/contexts/theme";
import React, { useContext, useEffect, useRef, useState } from "react"
import MaterialLoader from "./MaterialLoader";
import styles from '@/styles/components/atoms/RefreshPuller.module.scss'
import classNames from "classnames";

interface RefreshPullerProps {
  id?: string
  className?: string
  children?: React.ReactNode

  onRefresh?: () => Promise<void>
}

const RefreshPuller = (p:RefreshPullerProps) => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const pullerRef = useRef<HTMLDivElement>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    if (!document || !pullerRef.current) return () => {}

    let startY = 0;
    const touchStartHandler = (e: TouchEvent) => {
      startY = e.touches[0].pageY
    }
    const touchMoveHandler = (e: TouchEvent) => {
      const Y = e.touches[0].pageY
      if (document.scrollingElement.scrollTop === 0 && Y > startY + 40 && !refreshing) {
        setRefreshing(v => true)
      }
    }

    pullerRef.current.addEventListener('touchstart', touchStartHandler, {passive: true})
    pullerRef.current.addEventListener('touchmove', touchMoveHandler, {passive: true})

    return () => {
      pullerRef.current?.removeEventListener('touchstart', touchStartHandler)
      pullerRef.current?.removeEventListener('touchmove', touchMoveHandler)
    }
  }, [refreshing])

  useEffect(() => {
    ( async () => {
      if (refreshing) {
        if (p.onRefresh) { await p.onRefresh() }
      }
      setRefreshing(v => false)
    })()
  }, [refreshing])

  return (
    <div
      id={p.id}
      ref={pullerRef}
      data-refreshing={refreshing}
      className={classNames(
        p.className,
        styles.puller,
        refreshing? styles.shown: styles.hidden,
      )}
      style={{
        overscrollBehavior: ""
      }}
    > 
      <div
        className={styles.loaderContainer}
      >
        {
          refreshing &&
          <MaterialLoader className={styles.loader} color={themeColors.main.toString()} duration={2} />
        }
      </div>
      {p.children}
    </div>
  )
} 

export default RefreshPuller