import { getTheme } from '@/colors/theme'
import { ThemeContext } from '@/contexts/theme'
import styles from '@/styles/components/molecules/StandardDrawer.module.scss'
import classNames from 'classnames'
import { MouseEventHandler, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

interface StandardDrawerProps {
  id? :string
  className?: string
}

const StandardDrawer = (p: StandardDrawerProps) => {

  const router = useRouter()

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const onLogoutButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.replace("/login")
  }

  const listItemBorder = `1px solid ${themeColors.background.negate().fade(.85).toString()}`
  
  return (
    <div
      id={p.id}
      className={classNames(
        styles.d,
        p.className,
      )}
      style={{
        backgroundColor: themeColors.background.toString(),
      }}
    >
      <div className={styles.logoContainer} style={{marginTop: 32, marginBottom: 12,}}>
        <div className={styles.iconLogoWrapper} style={{marginBottom: 16}}>
          <img src="/brand/logo_icon_gradient.svg" className={styles.iconLogo} alt="brand icon logo" />
        </div>
        <div className={styles.textLogoWrapper}>
          <img src="/brand/logo_text.svg" className={styles.textLogo} alt="brand text logo" />
        </div>
      </div>
      <div className={styles.signContainer} style={{marginBottom: 32}}>
        <span className={styles.sign} style={{color: themeColors.typography.paragraph.fade(.7).toString()}}>By Hiroki Nakatani</span>
      </div>

      <ul className={styles.menu}>
        <li className={styles.menuItem}
          style={{
            borderTop: listItemBorder,
            borderBottom: listItemBorder,
          }}
        > 
          <Link href="/me">
            <a className={styles.menuItemActionTaker}>
              <span className={styles.menuItemLabel} style={{color: themeColors.typography.paragraph.toString()}}>プロフィール</span>
            </a>
          </Link>
        </li>

        <li className={styles.menuItem}
          style={{
            borderBottom: listItemBorder,
          }}
        > 
          <button className={styles.menuItemActionTaker} onClick={onLogoutButtonClick}>
            <span className={styles.menuItemLabel} style={{color: themeColors.danger.toString()}}>ログアウト</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default StandardDrawer