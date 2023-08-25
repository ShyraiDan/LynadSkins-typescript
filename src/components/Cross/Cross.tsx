import { FC, MouseEvent } from 'react'
import styles from './Cross.module.css'

interface ICross {
	onClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
	cl: string
}

export const Cross: FC<ICross> = ({ onClick, cl }) => {
	return (
		<div className={cl}>
			<div className={`${styles['burger-btn']}`} onClick={onClick}>
				<span className={styles['burger-span-top']}></span>
				<span className={styles['burger-span-bottom']}></span>
			</div>
		</div>
	)
}
