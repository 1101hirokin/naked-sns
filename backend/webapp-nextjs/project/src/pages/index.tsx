import Head from 'next/head'
import styles from '@/styles/pages/top/idx.module.scss'
import pageStyles from '@/styles/pages/_page.module.scss'
import StandardLayout, { StandardLayoutFAB } from '@/layouts/Standard'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/contexts/theme'
import AppTheme from '@/types/theme'
import { PostData } from '@/models/PostData'
import PostTile from '@/components/molecules/PostTile'
import { isNavigator } from '@/utils/detect'
import RefreshPuller from '@/components/atoms/RefreshPuller'
import { getTheme } from '@/colors/theme'
import PlusIcon from '@/components/atoms/icons/Plus'
import PostTileActionBS, { PostTileActionBSProps } from '@/components/molecules/bottomSheets/PostTileActionBS'
import { BottomSheetBuilder } from '@/layouts/_cmn'

const HomePage = () => {

  const themeContext = useContext(ThemeContext)
  const mode = themeContext.state.mode
  const themeColors = getTheme(themeContext.state.mode)

  const toggle = () => {
    if (mode === AppTheme.LIGHT) {
      themeContext.dispatch({type: "DARK"})
    } else {
      themeContext.dispatch({type: "LIGHT"})
    }
  }

  const [bsBuilder, setBSBuilder] = useState<BottomSheetBuilder | null>(null)

  const [posts, setPosts] = useState<PostData[]>([
    {
      id: "001",
      poster: {
        id: "u001",
        name: "Lorem Ipsum",
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
        name: "Lorem Ipsum",
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
        name: "Lorem Ipsum",
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

  const onUpperLoad = () => {
    return new Promise<void>((resolve) =>{
      setTimeout(() => {
      
        const newData: PostData[] = [
          {
            poster: {
              avatarFile: {
                src: "/vacation.jpg",
              },
              screenID: "lorem_ipsum",
            },
            body: `added`,
            likeCount: 9,
          },
        ]
        setPosts(list => newData.concat(list))
        
        return resolve()
      }, 2 * 1000)
    })
  }
  const onLowerLoad = async () => {

  }

  const onActionButtonClick = (e: React.MouseEvent, d: PostData) => {
    if (!bsBuilder) {
      const prop:PostTileActionBSProps = {
        data: d,
        className: styles.bottomSheet,
      }
      const builder: BottomSheetBuilder = {
        prop: prop,
        sheet: PostTileActionBS,
      }
      setBSBuilder(v => builder)
    } else {
      setBSBuilder(v => undefined)
    }
  }

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
    onActionButtonClick={onActionButtonClick}
    hasBottomBorder
    hasTopBorder={i===0}
  />)

  const fab: StandardLayoutFAB = {
    icon: PlusIcon,
    href: "/add",
    backgroundColor: themeColors.main.toString(),
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Naked SNS</title>
        <meta name="description" content="Naked SNS home page" />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>

      <div className={pageStyles.pg}>
        <StandardLayout className={pageStyles.layout} fab={fab} bsBuilder={bsBuilder}
          onBottomSheetCloserClick={(e) => { setBSBuilder(v => undefined) }}
        >
          <RefreshPuller onRefresh={onUpperLoad}>
            <div className={styles.postsContainer}>
              {postTiles}
            </div>
            <div className={styles.lowerLoaderButtonContainer}>
              <button className={styles.lowerLoaderButton} style={{color: themeColors.typography.link.toString()}} onClick={onLowerLoad}>
                See More
              </button>
            </div>
          </RefreshPuller>
        </StandardLayout>
      </div>
    </div>
  )
}

export default HomePage