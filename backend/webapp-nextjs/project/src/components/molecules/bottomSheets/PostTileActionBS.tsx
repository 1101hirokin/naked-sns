import { BottomSheetProps } from "./_props";
import styles from '@/styles/components/molecules/bottomSheets/PostTileActionBS.module.scss'
import cmnStyles from '@/styles/components/molecules/bottomSheets/_cmn.module.scss'
import classNames from "classnames";
import { PostData } from "@/models/PostData";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme";
import { getTheme } from "@/colors/theme";
import { UserData } from "@/models/UserData";
import Link from 'next/link'

interface PostTileActionBSProps extends BottomSheetProps {
  data: PostData
  me?: UserData
  id?: string
  className?: string
}
export type {PostTileActionBSProps}

const PostTileActionBS = (p: PostTileActionBSProps) => {

  const themeContext = useContext(ThemeContext)
  const themeColors = getTheme(themeContext.state.mode)

  const isMyPost = p.me?.id && p.data.poster?.id && p.me.id === p.data.poster.id

  return (
    <div
      id={p.id}
      className={classNames(
        p.className,
        cmnStyles.bs,
        styles.bs,
      )}
      style={{
        backgroundColor: themeColors.background.toString(),
      }}
    >
      <div className={styles.contentArea}>
        <div className={styles.profileContainer} style={{marginBottom: 16, marginTop: 8}}>
          <span className={styles.whosPost}>{p.data.poster?.name}さんの投稿</span>
        </div>
        <div className={classNames(
          styles.actionButtonContainer,
          styles.deleteButtonContainer,
        )}>
          <button
            className={classNames(
              styles.actionButton,
              styles.deleteButton,
            )}
            style={{
              color: themeColors.danger.toString(),
            }}
          >
            削除する
          </button>
        </div>
        <div className={classNames(
          styles.actionButtonContainer,
          styles.profileButtonContainer,
        )}>
          <Link href={
            p.data.poster?.id? `/u/${p.data.poster.id}`: ""
          }>
            <a
              className={classNames(
                styles.actionButton,
                styles.profileButton,
              )}
              style={{
                color: themeColors.typography.paragraph.toString(),
              }}
            >
              プロフィールへ
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostTileActionBS