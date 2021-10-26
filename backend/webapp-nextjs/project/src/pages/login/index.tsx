import Head from 'next/head'
import styles from '@/styles/pages/login/idx.module.scss'
import pageStyles from '@/styles/pages/_page.module.scss'
import classNames from 'classnames'
import { MouseEventHandler, useContext, useState } from 'react'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'
import TextButton from '@/components/atoms/TextButton'

const LoginPage = () => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const [screenID, setScreenID] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const screenIDInputID = "input_field_screenID"
  const passwordInputID = "input_field_password"
  
  const inputBackgroundColor = themeColors.background.negate().fade(.9)

  const inputStyle: React.CSSProperties = {
    backgroundColor: inputBackgroundColor.toString(),
  }

  const onLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log({screenID})
    console.log({password})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Naked SNS</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>
      
      <div className={pageStyles.pg}>
       <div className={styles.contentArea}>

        <div className={styles.logoContainer} style={{marginTop: 80, marginBottom: 32,}}>
            <div className={styles.iconLogoWrapper} style={{marginBottom: 16}}>
              <img src="/brand/logo_icon_gradient.svg" className={styles.iconLogo} alt="brand icon logo" />
            </div>
            <div className={styles.textLogoWrapper}>
              <img src="/brand/logo_text.svg" className={styles.textLogo} alt="brand text logo" />
            </div>
          </div>

          <div className={styles.titleWrapper} style={{marginBottom: 32,}}>
            <h1 className={styles.title}>Naked SNS にログイン</h1>
          </div>

          <div className={classNames(
            styles.inputContainer
          )} style={{marginBottom: 24,}}>
            <label
              className={classNames(
                styles.inputLabel,
              )}
              htmlFor={screenIDInputID}
            >ユーザーID</label>
            <input
              id={screenIDInputID}
              className={classNames(
                styles.input,
              )}
              style={inputStyle}
              placeholder='@'
              type="text"
              onChange={(e) => {
                setScreenID(v => e.target.value)
              }}
            />
          </div>

          <div className={classNames(
            styles.inputContainer
          )} style={{marginBottom: 32,}}>
            <label
              className={classNames(
                styles.inputLabel,
              )}
              htmlFor={passwordInputID}
            >パスワード</label>
            <input
              id={passwordInputID}
              className={classNames(
                styles.input,
              )}
              style={inputStyle}
              placeholder='Pa$$W0rd'
              type="password"
              onChange={(e) => {
                setPassword(v => e.target.value)
              }}
            />
          </div>

          <div className={styles.loginButtonContainer}>
            <TextButton
              text='Login'
              backgroundColor={themeColors.main.toString()}
              disabled={(!screenID || !password)}
              onClick={onLoginButtonClick}
            />
          </div>

        </div>
       </div>
    </div>
  )
}

export default LoginPage