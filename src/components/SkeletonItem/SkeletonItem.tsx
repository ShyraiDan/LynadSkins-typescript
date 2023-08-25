import { FC } from 'react'
import styles from './SkeletonItem.module.css'

export const SkeletonItem: FC = () => {
	return (
		<div className={styles.skeleton}>
			<span className={`${styles.image} ${styles.pulse}`}></span>
			<span className={`${styles.bottom} ${styles.pulse}`}></span>
		</div>
	)
}
