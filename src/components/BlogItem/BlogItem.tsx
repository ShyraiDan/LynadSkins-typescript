import { motion } from 'framer-motion'
import { forwardRef, FC, LegacyRef } from 'react'
import { Link } from 'react-router-dom'
import { TPost } from '../../redux/types'
import styles from './BlogItem.module.css'

import { Container } from '../../ui/Container'
import { List } from '../../ui/List'
import { ListItem } from '../../ui/ListItem'
import { Typeography } from '../../ui/Typeography'

interface IBlogItem {
	top?: boolean
	data: TPost
	variants: object
	custom: number
}

export const BlogItem: FC<IBlogItem> = forwardRef(
	({ top, data }, ref: LegacyRef<HTMLDivElement>) => {
		return (
			<div ref={ref} className={`${styles.container} ${top && styles.top}`}>
				{/* <Container ref={ref} styles={`${styles.container} ${top && styles.top}`}> */}
				<div className={styles.column}>
					<img
						src={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
						className={styles.photo}
						alt=''
					/>
				</div>

				<div className={styles.column}>
					<div className={styles.hashtags}>
						<List display={'flex'} mt={'5px'}>
							<ListItem style={styles.hashtag}>
								{data.tags?.map((item: string, i: number) => (
									<a key={i} href='/blog' className={styles.link}>
										#{item}
									</a>
								))}
							</ListItem>
						</List>

						{data?.createdAt && (
							<Typeography variant='span' color={'white'} fontSize={'12px'}>
								{data?.createdAt.substring(0, 10)}
							</Typeography>
						)}
					</div>
					<div className={styles.title}>
						<h2 className={`${styles.titled} ${top && styles.mainTitle}`}>
							<Link className={styles.titled} to={`/blog/${data?._id}`}>
								{data?.title}
							</Link>
						</h2>
					</div>
				</div>
				{/* </Container> */}
			</div>
		)
	}
)
export const MBlogItem = motion(BlogItem)
