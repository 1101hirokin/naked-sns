import Head from 'next/head'
import styles from '@/styles/pages/add/idx.module.scss'
import pageStyles from '@/styles/pages/_page.module.scss'
import ReturnableLayout from '@/layouts/Returnable'
import { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import TextButton from '@/components/atoms/TextButton'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'

const AddPostPage = () => {

  const router = useRouter()
  const onReturnButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.replace("/")
  }

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const inputAreaColor = themeColors.background.negate().fade(.95).toString()
  const [inputValue, setInputValue] = useState<string>("")

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!inputRef.current) return () => {}

    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  }, [inputValue])

  const onPostButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(inputValue)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>投稿する | Naked SNS</title>
        <meta name="description" content="post-posting page" />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>
      
      <div className={pageStyles.pg}>
        <ReturnableLayout
          className={pageStyles.layout}
          onReturnButtonClick={onReturnButtonClick}
          disableBottomNav
        >
          <div className={styles.inputContainer} style={{marginBottom: 24, marginTop: 0}}>
            <textarea
              className={styles.inputArea}
              style={{backgroundColor: inputAreaColor.toString()}}
              onChange={(e) => {
                setInputValue(e.target.value)
              }}
              ref={inputRef}
            ></textarea>
          </div>

          <div className={styles.addButtonContainer}>
            <TextButton text="Post" backgroundColor={themeColors.main.toString()} disabled={!inputValue} onClick={onPostButtonClick} />
          </div>
        </ReturnableLayout>
      </div>
    </div>
  )
}

export default AddPostPage