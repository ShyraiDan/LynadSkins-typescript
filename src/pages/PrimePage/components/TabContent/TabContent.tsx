import { motion } from 'framer-motion'
import { FC } from 'react'
import styles from './TabContent.module.css'

import { Button } from '../../../../ui/Button'
import { Typeography } from '../../../../ui/Typeography'
import { MList } from '../../../../ui/List'
import { ListItem } from '../../../../ui/ListItem'

type TInfoItem = {
	option: string
	status: string
}
type TInfo = {
	params: Array<TInfoItem>
	price: string
}

type TTabContent = {
	info: TInfo
	val: number
}

export const TabContent: FC<TTabContent> = ({ info, val }) => {
	const textAnimation = {
		hidden: {
			x: -100,
			opacity: 0,
		},
		visible: (custom: number) => ({
			x: 0,
			opacity: 1,
			transition: { delay: custom * 0.2 },
		}),
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			className={styles.container}>
			<MList custom={1} variants={textAnimation}>
				{info.params.map((item, i: number) => {
					return (
						<ListItem style={styles.item} key={i}>
							<Typeography color={'grey'}>{item.option}</Typeography>
							<Typeography p={'0 0 0 15px'}>{item.status}</Typeography>
						</ListItem>
					)
				})}
			</MList>
			<div className={styles.bottom}>
				<Typeography
					color={'white'}
					fontSize={'32px'}
					m={'0 0 15px 0'}
					textAlign={'center'}>
					{info.price}
				</Typeography>
				<Button
					disabled={val === 3 && true}
					style={val === 3 ? styles['btn-disabled'] : styles.btn}
					text={'Choose this plan'}></Button>
			</div>
		</motion.div>
	)
}
