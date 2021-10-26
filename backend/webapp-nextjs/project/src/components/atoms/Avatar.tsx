import styles from '@/styles/components/atoms/Avatar.module.scss'
import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AvatarProps {
  src: string

  id?: string
  className?: string
  alt?: string

  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Avatar = (p:AvatarProps) => {

  const inner = ((p:AvatarProps) => {
    return (
      <div
        id={p.id}
        className={classNames(
          styles.avtr,
          p.className
        )}
      >
        <div className={styles.avtr_inner}>
          <div className={styles.avtrImageWrapper}>
            <Image
              src={p.src}
              alt={p.alt}
              width={500}
              height={500}
              className={styles.avtrImage}
            />
          </div>
        </div>
      </div>
    )
  })(p)

  if (p.href) {
    return (
      <Link href={p.href}>
        <a className={styles.avtrButton}>
          {inner}
        </a>
      </Link>
    )
  }

  return (
    <button className={styles.avtrButton} onClick={p.onClick}>
      {inner}
    </button>
  )
}

export default Avatar