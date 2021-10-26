import classNames from 'classnames'
import styles from '@/styles/layouts/Returnable.module.scss'
import React, { MouseEventHandler, useContext } from 'react'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'
import ReturnableHeader from '@/components/molecules/ReturnableHeader'

import { useRouter } from 'next/dist/client/router'
import StandardBottomNavBar, { BottomNavBarItem } from '@/components/molecules/StandardBottomNavBar'
import HomeIcon from '@/components/atoms/icons/Home'
import MagnifyIcon from '@/components/atoms/icons/Magnify'
import ChatIcon from '@/components/atoms/icons/Chat'
import CogIcon from '@/components/atoms/icons/Cog'

interface ReturnableLayoutProps {
  id?: string
  className?: string

  children?: React.ReactNode
  onReturnButtonClick?: MouseEventHandler<HTMLButtonElement>

  disableBottomNav?: boolean
}

const ReturnableLayout = (p:ReturnableLayoutProps) => {

  const router = useRouter()

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const focusColor = themeColors.main.toString()
  const unfocusColor = themeColors.icon.inactive.toString()


  const bottomNavBarItems: BottomNavBarItem[] = [
    {
      key: "home",
      icon: HomeIcon,
      href: "/",
      color: router.pathname === "/"? focusColor: unfocusColor,
    },
    {
      key: "search",
      icon: MagnifyIcon,
      href: "/search",
      color: router.pathname === "/search"? focusColor: unfocusColor,
    },
    {
      key: "chat",
      icon: ChatIcon,
      href: "/chat",
      color: router.pathname === "/chat"? focusColor: unfocusColor,
    },
    {
      key: "settings",
      icon: CogIcon,
      href: "/settings",
      color: router.pathname === "/settings"? focusColor: unfocusColor,
    },
  ]

  return (
    <div
      id={p.id}
      className={classNames(
        styles.l,
        p.className,
      )}
      style={{
        backgroundColor: themeColors.background.lighten(.3).toString(),
        color: themeColors.typography.paragraph.toString(),
      }}
    >
      <div className={styles.headerContainer}>
        <ReturnableHeader
          className={styles.header}
          onClick={p.onReturnButtonClick}
        />
      </div>

      <div className={styles.contentsContainer}>
        <main className={styles.contentsArea}>
          {p.children}
        </main>
      </div>
      
      {
        !p.disableBottomNav &&
        <div className={styles.bNavContainer}>
          <StandardBottomNavBar
            className={styles.bNavBar}
            items={bottomNavBarItems}
          />
        </div>
      }
    </div>
  )
}

export default ReturnableLayout