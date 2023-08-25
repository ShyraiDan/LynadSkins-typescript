import { motion } from 'framer-motion'
import { forwardRef, FC, LegacyRef } from 'react'
import styles from './SmallBlogItem.module.css'

import { Container } from '../../ui/Container'

export const SmallBlogItem: FC = forwardRef(
	(_, ref: LegacyRef<HTMLDivElement>) => {
		return (
			<div ref={ref} className={styles.container}>
				{/* <Container ref={ref} styles={styles.container}> */}
				<div className={`${styles.photo} ${styles.pulse}`}></div>
				<div>
					<div className={`${styles.hashtag} ${styles.pulse}`}></div>
					<div className={`${styles.title} ${styles.pulse}`}></div>
				</div>
				{/* </Container> */}
			</div>
		)
	}
)
export const MSmallBlogItem = motion(SmallBlogItem)
