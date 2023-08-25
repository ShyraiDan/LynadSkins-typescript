import { FC } from 'react'
import styles from './PostSkeleton.module.css'

import { List } from '../../../../ui/List'
import { ListItem } from '../../../../ui/ListItem'

export const PostSkeleton: FC = () => {
	return (
		<>
			<div className={`${styles.image} ${styles.pulse}`}></div>
			<div className={styles.wrapper}>
				<div className={styles.userInfo}>
					<div className={`${styles.user} ${styles.pulse}`}></div>
					<div className={styles.info}>
						<div className={styles.userDetails}>
							<span className={`${styles.userName} ${styles.pulse}`}></span>
							<span className={`${styles.additional} ${styles.pulse}`}></span>
						</div>
					</div>
				</div>
				<div className={styles.postContainer}>
					<div className={`${styles.title} ${styles.pulse}`}></div>
					<List display={'flex'} mt={'5px'}>
						{[...Array(3)].map((_, i) => {
							return (
								<ListItem key={i} style={`${styles.hashtag} ${styles.pulse}`}>
									<div className={styles.hashtag}></div>
								</ListItem>
							)
						})}
					</List>
					<div className={`${styles.postContent} ${styles.pulse}`}></div>
				</div>
			</div>
		</>
	)
}
