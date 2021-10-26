import { SVGIconProps } from "./_SVGIconProps"

interface VerticalDotsIconProps extends SVGIconProps {}

const VerticalDotsIcon = (p:VerticalDotsIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M40,60A10,10,0,1,1,30,70,10,10,0,0,1,40,60Zm0-30A10,10,0,1,1,30,40,10,10,0,0,1,40,30ZM40,0A10,10,0,1,1,30,10,10,10,0,0,1,40,0Z"/>
    </svg>
  )
}

export default VerticalDotsIcon