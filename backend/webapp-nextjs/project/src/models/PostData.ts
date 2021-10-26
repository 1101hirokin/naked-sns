import { HighlightString, UnixTime } from "@/types/_general"
import { PostID } from "@/types/post"
import { UserData } from "./UserData"

type PostData = {
  id?: PostID
  createdAt?: UnixTime
  updatedAt?: UnixTime
  deletedAt?: UnixTime

  body?: HighlightString
  imgSources?: string[]

  isLiking?: boolean
  likeCount?: number

  poster?: UserData
}

export type { PostData }