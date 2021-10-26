import { FileID } from "@/types/file";
import { UnixTime } from "@/types/_general";

type FileData = {
  id?: FileID
  createdAt?: UnixTime
  updatedAt?: UnixTime
  deletedAt?: UnixTime

  src?: string
}

export type {FileData}