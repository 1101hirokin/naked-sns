import { getTheme } from "@/colors/theme"
import { ThemeContext } from "@/contexts/theme"
import { PostData } from "@/models/PostData"
import styles from '@/styles/components/molecules/PostTile.module.scss'
import classNames from "classnames"
import React, { MouseEventHandler, useContext } from "react"
import Avatar from "../atoms/Avatar"
import Highlighter from "../atoms/Highlighter"
import FilledHeartIcon from "../atoms/icons/FilledHeart"
import ShareIcon from "../atoms/icons/Share"
import VerticalDotsIcon from "../atoms/icons/VerticalDots"
import Image from 'next/image'

interface PostTileProps {
  data: PostData
  isLiking: boolean

  id?: string
  className?: string
  style?: React.CSSProperties
  
  hasTopBorder?: boolean
  hasBottomBorder?: boolean
  
  onActionButtonClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>, d: PostData) => void
  onLikeClick?: MouseEventHandler<HTMLButtonElement>
  onShareButtonClick?: MouseEventHandler<HTMLButtonElement>
  onTileClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>, d: PostData) => void
}

const PostTile = (p:PostTileProps) => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const borderColor = themeColors.background.negate().fade(.85).toString()

  const imgSources = p.data.imgSources? p.data.imgSources: []
  const imgs = imgSources.map((src, i) => {
    return (
      <div className={styles.imgContainer} data-count={i+1} key={i.toString()}>
        <div className={styles.imgWrapper}>
          <div className={styles.wrapper_inner}>
            <Image src={src}  layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    )
  })

  const parentClass = ((imgCount: number):string => {
    switch (imgCount) {
      case 1:
        return styles.img_1
      case 2:
        return styles.img_2
      case 3:
        return styles.img_3
      case 4:
        return styles.img_4
      default:
        return styles.img_invalid
    }
  })(imgSources.length)

  return (
    <article
      className={classNames(
        styles.pT,
        p.className,
      )}
      style={{
        borderTop: p.hasTopBorder? `1px solid ${borderColor}`: "none",
        borderBottom: p.hasBottomBorder? `1px solid ${borderColor}`: "none",
        ...p.style,
      }}

      onClick={(e) => {
        if (p.onTileClick) p.onTileClick(e, p.data)
      }}
    >
      <div className={styles.pTContents}>
        {
          p.data.poster &&
          <div className={classNames(
            styles.userArea,
            styles.pTContent,
          )}>
            <div className={styles.userAvatarContainer}>{
              p.data.poster.avatarFile &&
              <Avatar src={p.data.poster.avatarFile.src} className={styles.userAvatar} href={
                p.data.poster.id? `/u/${p.data.poster.id}`: null
              } />
            }</div>
            <div className={styles.userScreenIDContainer}><h1 className={styles.userScreenID}>@{p.data.poster.screenID}</h1></div>
            <div className={styles.postActionButtonContainer}>
              <button className={styles.postActionButton} onClick={(e) => {if (p.onActionButtonClick) p.onActionButtonClick(e, p.data)}}>
                <VerticalDotsIcon
                  className={styles.postActionButtonIcon}
                  fill={themeColors.icon.inactive.toString()}
                />
              </button>
            </div>
          </div>
        }

        {
          p.data.body &&
          <div className={classNames(
            styles.bodyArea,
            styles.pTContent,
          )}>
            <p className={styles.body} style={{color:themeColors.typography.paragraph.toString()}}>
              <Highlighter
                raw={p.data.body}
                highlightColor={themeColors.typography.link.toString()}
              />
            </p>
          </div>
        }
        
        {
          imgSources &&
          <div className={classNames(
            styles.imageArea,
            styles.pTContent,
          )}>
            <div className={classNames(
              parentClass,
              styles.imgsContainer,
            )}>
              {imgs}
            </div>
          </div>
        }

        <div
          className={classNames(
            styles.buttonsArea,
            styles.pTContent,
          )}>
          <div className={styles.likeButtonContainer}>
            <div className={styles.likeButtonWrapper}>
              <button className={styles.likeButton}>
                <FilledHeartIcon
                  className={styles.likeButtonIcon}
                  fill={p.isLiking? themeColors.like.toString(): themeColors.icon.inactive.toString()}
                />
              </button>
            </div>
            <div className={styles.likeCountWrapper}>
              <p className={styles.likeCount}>{p.data.likeCount.toLocaleString()}</p>
            </div>
          </div>
          <div className={styles.shareButtonContainer}>
            <button className={styles.shareButton} onClick={p.onShareButtonClick}>
              <ShareIcon className={styles.shareButtonIcon} fill={themeColors.icon.inactive.toString()} />
            </button>
          </div>
        </div>

        {
          p.data.createdAt &&
          <div className={classNames(
            styles.dateArea,
            styles.pTContent,
          )}></div>
        }
      </div>
    </article>
  )
}

export default PostTile