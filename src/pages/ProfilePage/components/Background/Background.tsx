import { ReactNode, FC } from 'react'
import styles from './Background.module.css'

interface IBackground {
	children: ReactNode
}

export const Background: FC<IBackground> = ({ children }) => {
	return <div className={styles.bg}>{children}</div>
}
