import Head from 'next/head'
import styles from '@/styles/pages/p/[postID].module.scss'
import pageStyles from '@/styles/pages/_page.module.scss'
import { PostData } from '@/models/PostData'
import PostTile from '@/components/molecules/PostTile'
import ReturnableLayout from '@/layouts/Returnable'
import { MouseEventHandler } from 'react'
import { useRouter } from 'next/dist/client/router'

const SinglePostPage = () => {

  const router = useRouter()

  const data: PostData = {
    id: "001",
    poster: {
      id: "u001",
      avatarFile: {
        src: "/vacation.jpg",
      },
      screenID: "lorem_ipsum",
    },
    body: `Lorem Ipsum (https://lorem-ipsum.com) is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    imgSources: [
      "/vacation.jpg",
      "/vacation.jpg",
      "/vacation.jpg",
      "/vacation.jpg",
    ],
    likeCount: 3149,
  }

  const onReturnButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.replace("/")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>@{data.poster?.screenID}の投稿</title>
        <meta name="description" content={`${data.poster?.screenID}'s single post page (id: ${data.id})`} />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>
      
      <div className={pageStyles.pg}>
        <ReturnableLayout
          className={pageStyles.layout}
          onReturnButtonClick={onReturnButtonClick}
        >
          <div className={styles.postContainer}>
            <PostTile
              data={data}
              isLiking={data.isLiking}
            />
          </div>
        </ReturnableLayout>
      </div>
    </div>
  )
}

export default SinglePostPage