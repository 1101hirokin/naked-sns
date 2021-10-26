import { SVGIconProps } from "./_SVGIconProps"

interface HomeIconProps extends SVGIconProps {}

const HomeIcon = (p:HomeIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M74,25.45,43.16,1.1a5.08,5.08,0,0,0-6.32,0L6,25.45a5.2,5.2,0,0,0-2,4.11V67.83A12.1,12.1,0,0,0,16,80H64A12.1,12.1,0,0,0,76,67.83V29.56A5.2,5.2,0,0,0,74,25.45ZM45.14,69.57H34.86V45.22H45.14Zm20.57-1.74A1.72,1.72,0,0,1,64,69.57H55.43V40a5.18,5.18,0,0,0-5.14-5.22H29.71A5.18,5.18,0,0,0,24.57,40V69.57H16a1.72,1.72,0,0,1-1.71-1.74V32.12L40,11.83,65.71,32.12Z"/>
    </svg>
  )
}

export default HomeIcon