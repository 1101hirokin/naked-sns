import Head from 'next/head'
import styles from '@/styles/pages/u/[userID].module.scss'
import pageStyles from '@/styles/pages/_page.module.scss'
import PostTile from '@/components/molecules/PostTile'
import ReturnableLayout from '@/layouts/Returnable'
import { MouseEventHandler, useContext, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { UserData } from '@/models/UserData'
import Avatar from '@/components/atoms/Avatar'
import { ThemeContext } from '@/contexts/theme'
import { getTheme } from '@/colors/theme'
import TextButton from '@/components/atoms/TextButton'
import { PostData } from '@/models/PostData'
import { isNavigator } from '@/utils/detect'

const SingleUserPage = () => {

  const router = useRouter()
  const onReturnButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    router.replace("/")
  }
  

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const screenIDColor = themeColors.typography.paragraph.fade(.65).toString()

  const data: UserData = {
    id: "u001",
    avatarFile: {
      src: "/vacation.jpg",
    },
    isFollowing: false,
    screenID: "lorem_ipsum",
    name: "Lorem Ipsum",
    bio: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
  }

  const followerCount = data.followerCount? data.followerCount!: 0
  const [isFollowing, setFollowing] = useState<boolean>(data.isFollowing)

  const [posts, setPosts] = useState<PostData[]>([
    {
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
    },
    {
      id: "002",
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
      ],
      likeCount: 3149,
    },
    {
      id: "003",
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
      ],
      likeCount: 3149,
    },
  ])

  const postTiles = posts.map((d, i) => <PostTile
    className={styles.post}
    data={d}
    key={d.id? d.id: i.toString()}
    isLiking={d.isLiking}

    onShareButtonClick={(e) => {
      if (isNavigator && navigator.share) {
        try {
          navigator.share({
            url: `http://localhost:3000/p/${d.id}`,
          })
        } catch (err) {}
      }
    }}
    
    hasBottomBorder
    hasTopBorder={i===0}
  />)

  return (
    <div className={styles.container}>
      <Head>
        <title>@{data.screenID} | Naked SNS</title>
        <meta name="description" content={`single user page of @${data.screenID}`} />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>
      
      <div className={pageStyles.pg}>
        <ReturnableLayout
          className={pageStyles.layout}
          onReturnButtonClick={onReturnButtonClick}
        >
          <div className={styles.userInfoContainer} style={{marginBottom: 80,}}>
            <div className={styles.avatarContainer} style={{marginTop: 56, marginBottom: 24}}>
              {
                data.avatarFile.src &&
                <Avatar className={styles.avatar} src={data.avatarFile.src} alt={`avatar image of @${data.screenID}`} />
              }
            </div>

            <div className={styles.nameContainer} style={{marginBottom: 8,}}>
              <h1 className={styles.name} style={{color: themeColors.typography.paragraph.toString()}}>{data.name}</h1>
            </div>

            <div className={styles.screenIDContainer} style={{marginBottom: 32}}>
              <h2 className={styles.screenID} style={{color: screenIDColor}}>@{data.screenID}</h2>
            </div>

            <div className={styles.bioContainer} style={{marginBottom: 32}}>
              <p className={styles.bio} style={{color: themeColors.typography.paragraph.toString()}}>{data.bio}</p>
            </div>

            <div className={styles.followActionContainer}>
              <div className={styles.inner}>
                <div className={styles.followerCountContainer}>
                  <div className={styles.followerCountWrapper}>Follower: <span className={styles.count}>{followerCount.toLocaleString()}</span></div>
                </div>

                <div className={styles.followButtonContainer}>
                  <TextButton
                    text={ isFollowing? 'Unfollow': 'Follow'}
                    block
                    backgroundColor={ isFollowing? null: themeColors.main.toString() }
                    outline={isFollowing}
                    color={ isFollowing? themeColors.main.toString(): null }
                    onClick={(e) => {
                      setFollowing((v) => !v)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.postsContainer}>
            {postTiles}
          </div>
        </ReturnableLayout>
      </div>
    </div>
  )
}

export default SingleUserPage