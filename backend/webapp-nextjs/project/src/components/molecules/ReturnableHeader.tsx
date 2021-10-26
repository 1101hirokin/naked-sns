import styles from '@/styles/components/molecules/ReturnableHeader.module.scss'
import classNames from 'classnames'
import { SVGIconProps } from '@/components/atoms/icons/_SVGIconProps'
import Link from 'next/link'
import { MouseEventHandler, useContext } from 'react'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'
import ChevronLeftIcon from '../atoms/icons/ChevronLeft'
import NakedLogoIcon from '../atoms/icons/NakedLogo'

interface ReturnableHeaderProps {
  id?: string
  className?: string

  icon?: (p:SVGIconProps) => JSX.Element

  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const ReturnableHeader = (p:ReturnableHeaderProps) => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const logoIconColor = themeColors.background.negate().fade(.75).toString()
  const borderColor = themeColors.background.negate().fade(.85).toString()

  const Icon = p.icon? p.icon: ChevronLeftIcon

  const button = ((prop:ReturnableHeaderProps) => {
    if (p.href) {
      return (
        <Link href={p.href}>
          <a className={styles.returnButton}>
            <Icon
              fill={themeColors.typography.link.toString()} 
              className={styles.returnButtonIcon}
            />
          </a>
        </Link>
      )
    }

    return (
      <button className={styles.returnButton} onClick={p.onClick}>
        <Icon
          fill={themeColors.typography.link.toString()} 
          className={styles.returnButtonIcon}
        />
      </button>
    )
  })(p)

  return (
    <header
      id={p.id}
      className={classNames(
        styles.h,
        p.className,
      )}
      style={{
        backgroundColor: themeColors.background.toString(),
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div className={styles.returnButtonContainer}>
        {button}
      </div>

      <div className={styles.mainAreaContainer}>
        <Link href="/" >
          <a>
            <div className={styles.logoContainer}>
              <NakedLogoIcon className={styles.logo} fill={logoIconColor} />
            </div>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default ReturnableHeader