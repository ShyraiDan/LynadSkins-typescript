import { motion } from 'framer-motion'
import { forwardRef, FC } from 'react'
import styles from './BlogSkeleton.module.css'

import { Container } from '../../ui/Container'

interface IBlogSkeleton {
	top?: boolean
	variants: object
	custom: number
}

export const BlogSkeleton: FC<IBlogSkeleton> = forwardRef<
	HTMLDivElement,
	IBlogSkeleton
>(({ top }, ref) => {
	return (
		<div ref={ref} className={`${styles.container} ${top && styles.top}`}>
			{/* <Container ref={ref} styles={`${styles.container} ${top && styles.top}`}> */}
			<div className={`${styles.img} ${styles.pulse}`}></div>
			<div className={styles.column}>
				<div className={`${styles.short} ${styles.pulse}`}></div>
				<div className={`${styles.long} ${styles.pulse}`}></div>
				{top && <div className={`${styles.description} ${styles.pulse}`}></div>}
			</div>
			{/* </Container> */}
		</div>
	)
})
export const MBlogSkeleton = motion(BlogSkeleton)
