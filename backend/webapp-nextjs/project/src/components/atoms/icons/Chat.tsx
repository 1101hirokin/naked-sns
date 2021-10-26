import { SVGIconProps } from "./_SVGIconProps"

interface ChatIconProps extends SVGIconProps {}

const ChatIcon = (p:ChatIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M5.71,80A5.71,5.71,0,0,1,.29,72.48L6.81,52.92A38.08,38.08,0,0,1,24.87,4,36.13,36.13,0,0,1,41.92,0h1.89A38,38,0,0,1,80,35.88v2.21h0A38.12,38.12,0,0,1,41.91,76.19a41.61,41.61,0,0,1-14.83-3L7.52,79.71A5.91,5.91,0,0,1,5.71,80ZM41.84,11.44A26.65,26.65,0,0,0,18.05,50a5.7,5.7,0,0,1,.32,4.38L14.75,65.25l10.87-3.62A5.7,5.7,0,0,1,30,62a28.78,28.78,0,0,0,11.89,2.81A26.7,26.7,0,0,0,68.57,38.12V36.2A26.5,26.5,0,0,0,43.49,11.43H41.84Z"/>
    </svg>
  )
}

export default ChatIcon