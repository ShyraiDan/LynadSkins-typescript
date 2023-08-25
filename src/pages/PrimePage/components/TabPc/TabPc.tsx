import { motion } from 'framer-motion'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './TabPc.module.css'

import { Button } from '../../../../ui/Button'
import { List, MList } from '../../../../ui/List'
import { ListItem } from '../../../../ui/ListItem'

interface ITabPc {
	info: {
		param: string
		standart: string
		prime: string
		trader: string
	}[]
}

export const TabPc: FC<ITabPc> = ({ info }) => {
	const { t } = useTranslation()

	const textAnimation = {
		hidden: {
			x: -100,
			opacity: 0,
		},
		visible: (custom: number) => ({
			x: 0,
			opacity: 1,
			transition: { delay: custom * 0.05 },
		}),
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={styles.container}>
			<MList variants={textAnimation}>
				{info.map((item, i) => {
					return (
						<ListItem key={i} style={i === 0 ? styles.subitemTop : styles.item}>
							<List display={'grid'} columns={'300px 1fr 1fr 1fr'}>
								<ListItem style={i === 1 ? styles.small : styles.subitemParam}>
									{item.param}
								</ListItem>
								<ListItem style={i === 1 ? styles.small : styles.subitem}>
									{item.standart}
								</ListItem>
								<ListItem style={i === 1 ? styles.small : styles.subitem}>
									{item.prime}
								</ListItem>
								<ListItem style={i === 1 ? styles.small : styles.subitem}>
									{item.trader}
								</ListItem>
							</List>
						</ListItem>
					)
				})}
				<ListItem>
					<List display={'grid'} columns={'300px 1fr 1fr 1fr'}>
						<ListItem></ListItem>
						<ListItem style={styles.subItemLast}>
							{t('prime_page.table.two.price')}
						</ListItem>
						<ListItem style={styles.subItemLast}>
							{t('prime_page.table.three.price')}
						</ListItem>
						<ListItem style={styles.subItemLast}>
							{t('prime_page.table.four.price')}
						</ListItem>
					</List>
				</ListItem>
				<ListItem>
					<List display={'grid'} columns={'300px 1fr 1fr 1fr'}>
						<ListItem></ListItem>
						<ListItem style={styles.subItemCurr}>
							{t('prime_page.current_plan')}
						</ListItem>
						<ListItem style={styles.subitem}>
							<Button
								hover={true}
								text={t('prime_page.try_free')}
								style={styles.btn}></Button>
						</ListItem>
						<ListItem style={styles.subitem}>
							<Button
								disabled={true}
								text={t('prime_page.buy_now')}
								style={styles.btnDisabled}></Button>
						</ListItem>
					</List>
				</ListItem>
			</MList>
		</motion.div>
	)
}
