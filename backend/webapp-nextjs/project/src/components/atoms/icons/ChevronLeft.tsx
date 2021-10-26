import { SVGIconProps } from "./_SVGIconProps"

interface ChevronLeftIconProps extends SVGIconProps {}

const ChevronLeftIcon = (p:ChevronLeftIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M55.14,80a5.73,5.73,0,0,1-4-1.67L16.82,44a5.7,5.7,0,0,1,0-8.08L51.1,1.67a5.71,5.71,0,0,1,8.08,8.08L28.94,40,59.18,70.25a5.71,5.71,0,0,1-4,9.75Z"/>
    </svg>
  )
}

export default ChevronLeftIcon