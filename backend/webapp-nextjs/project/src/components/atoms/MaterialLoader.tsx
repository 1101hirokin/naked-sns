import styles from '@/styles/components/atoms/MaterialLoader.module.scss'
import classNames from 'classnames'
import React from 'react'

interface MaterialLoaderProps {
  id?: string
  className?: string
  duration?: number
  color?: string,

  style?: React.CSSProperties
}

const MaterialLoader = (p: MaterialLoaderProps) => {
  const dur = p.duration? p.duration: 1.4

  return (
    <div className={classNames(
      styles.loaderContainer,
      p.className,
    )}>
      <svg
        viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"
        className={styles.loader}
        style={{
          animationDuration: `${dur}s`,
          ...p.style,
        }}
      >
        <circle
          fill="none" strokeWidth={8} strokeLinecap="round" cx="40" cy="40" r="34"
          className={classNames(
            styles.path,
            styles.dashAnim,
          )}
          style={{
            animationDuration: `${dur}s`
          }}
          stroke={p.color}
        ></circle>
      </svg>
    </div>
  )
}

export default MaterialLoader