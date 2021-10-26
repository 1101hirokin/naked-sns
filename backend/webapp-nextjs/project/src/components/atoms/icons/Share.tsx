import { SVGIconProps } from "./_SVGIconProps"

interface ShareIconProps extends SVGIconProps {}

const ShareIcon = (p:ShareIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M73.14,40V67.43A12.59,12.59,0,0,1,60.57,80H19.43A12.59,12.59,0,0,1,6.86,67.43V40a5.72,5.72,0,0,1,11.43,0V67.43a1.14,1.14,0,0,0,1.14,1.14H60.57a1.14,1.14,0,0,0,1.14-1.14V40a5.72,5.72,0,0,1,11.43,0ZM30.33,23.47l4-4V50.29a5.72,5.72,0,0,0,11.43,0V19.51l4,4a5.71,5.71,0,0,0,8.08-8.08L44.05,1.68A6.65,6.65,0,0,0,43.18,1L43,.87A5.46,5.46,0,0,0,42.2.44l-.33-.1a4.54,4.54,0,0,0-.74-.23,5.86,5.86,0,0,0-2.26,0,4.75,4.75,0,0,0-.73.23l-.33.1a5.57,5.57,0,0,0-.8.43L36.83,1a6.14,6.14,0,0,0-.88.72L22.25,15.39a5.71,5.71,0,0,0,8.08,8.08Z"/>
    </svg>
  )
}

export default ShareIcon