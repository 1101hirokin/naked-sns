import styles from '@/styles/components/molecules/StandardHeader.module.scss'
import classNames from 'classnames'
import Avatar from '../atoms/Avatar'
import NakedLogoIcon from '../atoms/icons/NakedLogo'
import { MouseEventHandler, useContext } from 'react'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'

interface StandardHeaderProps {
  id?: string
  className?: string

  onAvatarClick?: MouseEventHandler<HTMLButtonElement>
}

const StandardHeader = (p: StandardHeaderProps) => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const logoIconColor = themeColors.background.negate().fade(.75).toString()
  const borderColor = themeColors.background.negate().fade(.85).toString()

  return (
    <header
      className={classNames(
        styles.h,
        p.className,
      )}
      style={{
        backgroundColor: themeColors.background.toString(),
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <Avatar
            src="/vacation.jpg"
            onClick={p.onAvatarClick}
          />
        </div>
      </div>

      <div className={styles.mainAreaContainer}>
        <div className={styles.logoContainer}>
          <NakedLogoIcon className={styles.logo} fill={logoIconColor} />
        </div>
      </div>
    </header>
  )
}

export default StandardHeader