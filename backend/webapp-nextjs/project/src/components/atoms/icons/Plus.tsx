import { SVGIconProps } from "./_SVGIconProps"

interface PlusIconProps extends SVGIconProps {}

const PlusIcon = (p:PlusIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M75,35H45V5A5,5,0,0,0,35,5V35H5A5,5,0,0,0,5,45H35V75a5,5,0,0,0,10,0V45H75a5,5,0,0,0,0-10Z"/>
    </svg>
  )
}

export default PlusIcon