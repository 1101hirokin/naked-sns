import Head from 'next/head'
import styles from '@/styles/pages/search/idx.module.scss'
import pageStyles from '@/styles/pages/_page.module.scss'
import StandardLayout from '@/layouts/Standard'

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search | Naked SNS</title>
        <meta name="description" content="searching user and post page" />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>
      
      <div className={pageStyles.pg}>
        <StandardLayout className={pageStyles.layout}>
          <h1>search!</h1>
        </StandardLayout>
      </div>
    </div>
  )
}

export default SearchPage