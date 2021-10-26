import { SVGIconProps } from "./_SVGIconProps"

interface MagnifyIconProps extends SVGIconProps {}

const MagnifyIcon = (p:MagnifyIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M78.33,70.25,65.46,57.38a36.33,36.33,0,1,0-8.08,8.08L70.25,78.33a5.71,5.71,0,0,0,8.08-8.08ZM11.43,36.19A24.76,24.76,0,1,1,53.76,53.62l-.09.05-.05.09A24.75,24.75,0,0,1,11.43,36.19Z"/>
    </svg>
  )
}

export default MagnifyIcon