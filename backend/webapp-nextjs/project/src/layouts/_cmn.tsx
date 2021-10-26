import { BottomSheetProps } from "@/components/molecules/bottomSheets/_props";

interface BottomSheetBuilder {
  sheet: (p: BottomSheetProps) => JSX.Element
  prop: BottomSheetProps
}

export type {BottomSheetBuilder}