import { UserID } from "@/types/user"
import { UnixTime } from "@/types/_general"
import { FileData } from "./FileData"

type UserData = {
  id?: UserID
  createdAt?: UnixTime
  updatedAt?: UnixTime
  deletedAt?: UnixTime

  avatarFile?: FileData
  name?: string
  screenID?: string
  bio?: string

  followers?: UserData[]
  followerCount?: number

  followings?: UserData[]
  followingCount?: number

  isFollowing?: boolean
}

export type { UserData }