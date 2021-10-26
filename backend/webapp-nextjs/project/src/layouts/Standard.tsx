import classNames from 'classnames'
import styles from '@/styles/layouts/Standard.module.scss'
import React, { MouseEventHandler, useContext, useState } from 'react'
import StandardHeader from '@/components/molecules/StandardHeader'
import StandardBottomNavBar, { BottomNavBarItem } from '@/components/molecules/StandardBottomNavBar'
import HomeIcon from '@/components/atoms/icons/Home'
import MagnifyIcon from '@/components/atoms/icons/Magnify'
import ChatIcon from '@/components/atoms/icons/Chat'
import CogIcon from '@/components/atoms/icons/Cog'
import { useRouter } from 'next/dist/client/router'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'
import { SVGIconProps } from '@/components/atoms/icons/_SVGIconProps'
import Color from 'color'
import { isColorLight } from '@/helpers/isColorLight'
import Link from 'next/link'
import { BottomSheetBuilder } from '@/layouts/_cmn'
import StandardDrawer from '@/components/molecules/StandardDrawer'

interface StandardLayoutFAB {
  icon: (p:SVGIconProps) => JSX.Element

  backgroundColor?: string
  iconColor?: string
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
export type {StandardLayoutFAB}

interface StandardLayoutProps {
  id?: string
  className?: string

  children?: React.ReactNode

  fab?: StandardLayoutFAB
  disableBottomNav?: boolean

  bsBuilder?: BottomSheetBuilder
  onBottomSheetCloserClick?: MouseEventHandler<HTMLButtonElement>
}

const StandardLayout = (p:StandardLayoutProps) => {

  const router = useRouter()

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const focusColor = themeColors.main.toString()
  const unfocusColor = themeColors.icon.inactive.toString()

  const fabBGColor = ((): Color => {
    if (p.fab?.backgroundColor) return Color(p.fab.backgroundColor)
    return Color("#000000")
  })()
  const fabIconColor = ((): Color => {
    if (p.fab?.iconColor) return Color(p.fab.iconColor)
    if (isColorLight(fabBGColor)) return Color("#000000")
    return Color("#ffffff")
  })()

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

  const fabButton = (() => {

    if (!p.fab) return null
    
    if (p.fab?.href) {
      return (
        <Link href={p.fab.href}>
          <a className={styles.fab} style={{backgroundColor: fabBGColor.toString(), boxShadow:`0px 4px 8px ${fabBGColor.fade(.2).toString()}`}}>
            {
              p.fab?.icon &&
              <p.fab.icon className={styles.fabIcon} fill={fabIconColor.toString()} />
            }
          </a>
        </Link>
      )
    }

    return (
      <button className={styles.fab} style={{backgroundColor: fabBGColor.toString(), boxShadow:`0px 4px 8px ${fabBGColor.fade(.2).toString()}`}}>
        {
          p.fab?.icon &&
          <p.fab.icon className={styles.fabIcon} fill={fabIconColor.toString()} />
        }
      </button>
    )
  })()

  const bs = p.bsBuilder? React.createElement(p.bsBuilder.sheet, p.bsBuilder.prop): null

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

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
        <StandardHeader
          className={styles.header}
          onAvatarClick={(e) => {
            console.log(e)
            setDrawerOpen(v => true)
          }}
        />
      </div>

      <div className={styles.contentsContainer}>
        <main className={styles.contentsArea}>
          {p.children}
        </main>
      </div>

      <div className={styles.fabContainer}>
        {fabButton}
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

      {
        p.bsBuilder &&
        <div className={styles.bottomSheetContainer}>
          <div className={styles.bg}></div>
          <button className={styles.closerButton} onClick={p.onBottomSheetCloserClick}></button>
          <div className={styles.bottomSheetWrapper}>
            {bs}
          </div>
        </div>
      }
       
      {
        isDrawerOpen && 
        <div className={styles.drawerContainer}>
          <div className={styles.bg}></div>
          <div className={styles.drawerWrapper}>
            <StandardDrawer className={styles.drawer} />
          </div>
          <button className={styles.closerButton} onClick={(e) => { setDrawerOpen(v => false) }}></button>
        </div>
      }
    </div>
  )
}

export default StandardLayout