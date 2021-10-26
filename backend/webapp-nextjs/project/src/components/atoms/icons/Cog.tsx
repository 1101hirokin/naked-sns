import { SVGIconProps } from "./_SVGIconProps"

interface CogIconProps extends SVGIconProps {}

const CogIcon = (p:CogIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
      id={p.id}
      className={p.className}
      style={{
        ...p.style,
      }}
    >
      <path fill={p.fill} d="M40,54.4A14.4,14.4,0,1,1,54.4,40,14.42,14.42,0,0,1,40,54.4Zm0-19.2A4.8,4.8,0,1,0,44.8,40,4.8,4.8,0,0,0,40,35.2ZM40.26,80a11.21,11.21,0,0,1-11.2-11.2c0-.37-.13-.55-.32-.62-.46-.19-.67-.15-.81,0a11.21,11.21,0,1,1-16-15.69c.3-.3.33-.5.25-.68a.48.48,0,0,0-.45-.34H11.2a11.2,11.2,0,0,1,0-22.4c.37,0,.55-.13.62-.32.19-.46.15-.67,0-.81a11.29,11.29,0,0,1-3.44-8.07,11.21,11.21,0,0,1,19.13-7.93c.29.3.5.33.69.25s.33-.13.51-.19a.48.48,0,0,0,.08-.27V11.2a11.2,11.2,0,0,1,22.4,0c0,.46.12.63.29.71a.5.5,0,0,0,.58-.08,11.21,11.21,0,1,1,16,15.69c-.3.3-.34.5-.26.68a4.65,4.65,0,0,1,.2.52.47.47,0,0,0,.26.08h.53a11.2,11.2,0,1,1,0,22.4c-.46,0-.63.12-.71.29l0,0a.48.48,0,0,0,.1.53,11.21,11.21,0,1,1-15.69,16c-.3-.3-.51-.34-.69-.25a.48.48,0,0,0-.33.45v.53A11.21,11.21,0,0,1,40.26,80Zm-12-21.58a10.16,10.16,0,0,1,4.09.87,9.88,9.88,0,0,1,6.31,9.11s0,.36,0,.4a1.6,1.6,0,0,0,3.2,0v-.54A10.12,10.12,0,0,1,59,61.05s.21.22.23.23A1.6,1.6,0,0,0,61.53,59l-.22-.23A10.12,10.12,0,0,1,68.5,41.6,1.69,1.69,0,0,0,70.4,40a1.6,1.6,0,0,0-1.6-1.6h-.54A10.1,10.1,0,0,1,59,32.29a4.69,4.69,0,0,1-.32-1.09A10,10,0,0,1,61.05,21s.22-.21.23-.23A1.6,1.6,0,0,0,59,18.47l-.23.22A10.12,10.12,0,0,1,41.6,11.5,1.69,1.69,0,0,0,40,9.6a1.6,1.6,0,0,0-1.6,1.6v.54A10.11,10.11,0,0,1,32.29,21a4.56,4.56,0,0,1-1.09.32A10,10,0,0,1,21,19l-.23-.23A1.61,1.61,0,0,0,18.46,21l.23.23a10,10,0,0,1,2,11.12,9.88,9.88,0,0,1-9.11,6.31h-.4a1.6,1.6,0,1,0,0,3.2h.54A10.12,10.12,0,0,1,19,59l-.23.23A1.6,1.6,0,0,0,19.86,62h0A1.6,1.6,0,0,0,21,61.53s.22-.21.23-.23A10.08,10.08,0,0,1,28.25,58.42ZM63.68,49.6h0Z"/>
    </svg>
  )
}

export default CogIcon