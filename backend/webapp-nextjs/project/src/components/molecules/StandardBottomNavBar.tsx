import styles from '@/styles/components/molecules/StandardBottomNavBar.module.scss'
import classNames from 'classnames'
import { MouseEventHandler, useContext } from 'react'
import { SVGIconProps } from '../atoms/icons/_SVGIconProps'
import Link from 'next/link'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'

interface BottomNavBarItem {
  key: string
  icon: (p:SVGIconProps) => JSX.Element
  
  label?: string
  color?: string
  href?: string

  onItemClick?: MouseEventHandler<HTMLButtonElement>
}
export type {BottomNavBarItem}

interface StandardBottomNavBarProps {
  items: BottomNavBarItem[]

  id?: string
  className?: string
}

const StandardBottomNavBar = (p: StandardBottomNavBarProps) => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const borderColor = themeColors.background.negate().fade(.85).toString()

  const navButtons = p.items.map((item) => {
    const child = (
      <div className={styles.navIconContainer}>
        <item.icon className={styles.navIcon} fill={item.color} />
      </div>
    )
    
    if (item.href) {
      return (
        <Link href={item.href} key={item.key}>
          <a className={styles.navButton}>
          {child}
          </a>
        </Link>
      )
    } else {
      return (
        <button className={styles.navButton} onClick={item.onItemClick} key={item.key}>
          {child}
        </button>
      )
    }
  })

  return (
    <footer
      id={p.id}
      className={classNames(
        styles.bNB,
        p.className,
      )}
      style={{
        backgroundColor: themeColors.background.toString(),
        borderTop: `1px solid ${borderColor}`
      }}
    >
      {navButtons}
    </footer>
  )
}

export default StandardBottomNavBar