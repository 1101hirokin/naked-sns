import { SVGIconProps } from "./_SVGIconProps"

interface FilledHeartIconProps extends SVGIconProps {}

const FilledHeartIcon = (p:FilledHeartIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M40,14.21C33.37-4.19,0-1.46,0,26.37,0,40.24,10.2,58.69,40,77.5,69.8,58.7,80,40.25,80,26.37,80-1.3,46.67-4.31,40,14.21Z"/>
    </svg>
  )
}

export default FilledHeartIcon