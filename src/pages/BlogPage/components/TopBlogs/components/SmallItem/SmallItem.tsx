import { motion } from 'framer-motion'
import { forwardRef, LegacyRef, FC } from 'react'
import styles from './SmallItem.module.css'

import { Typeography } from '../../../../../../ui/Typeography'

interface ISmallItem {
	data: {
		photo: string
		hashtag: string
		title: string
	}
}

export const SmallItem: FC<ISmallItem> = forwardRef(
	({ data }, ref: LegacyRef<HTMLDivElement>) => {
		return (
			<div className={styles.column} ref={ref}>
				<div className={styles.photo}>
					<img src={data?.photo} alt='' className={styles.photo} />
				</div>
				<div className={styles.info}>
					<div className={styles.hashtag}>
						<Typeography variant={'span'} color={'white'}>
							{data?.hashtag}
						</Typeography>
					</div>
					<div className={styles.title}>
						<Typeography
							fontSize={'14px'}
							variant={'h2'}
							color={'white'}
							fontWeight={700}>
							{data?.title}
						</Typeography>
					</div>
				</div>
			</div>
		)
	}
)
export const MSmallItem = motion(SmallItem)
