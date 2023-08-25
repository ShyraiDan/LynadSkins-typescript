import { motion } from 'framer-motion'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './MainPageTop.module.css'

import { MButton } from '../../../../ui/Button'
import { Container } from '../../../../ui/Container'
import { MTypeography } from '../../../../ui/Typeography'
import { Knife } from './components/Knife'

import img2 from './../../../../i/balisong_icon.webp'
import img from './../../../../i/karambit-1024.webp'
import img3 from './../../../../i/m9.png'
import img4 from './../../../../i/talon.png'

type TKnives = {
	name: string
	img: string
	textStyle: string
	lineStyle: string
	imgStyles: string
}

export const MainPageTop: FC = () => {
	const { t } = useTranslation()
	const nav = useNavigate()

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
	const btnAnimation = {
		hidden: {
			x: -350,
			opacity: 0,
		},
		visible: (custom: number) => ({
			x: 0,
			opacity: 1,
			transition: { delay: custom * 0.1 },
		}),
	}

	const knives: TKnives[] = [
		{
			name: 'Butterfly Knife - Lore',
			img: img2,
			textStyle: 'knifes-text',
			lineStyle: 'line-two',
			imgStyles: styles.photo_second,
		},
		{
			name: 'Karambit - Fade',
			img: img,
			textStyle: 'knifes-text',
			lineStyle: 'line-one',
			imgStyles: styles.photo,
		},

		{
			name: 'Bayonet - Gamma Doppler Emerald',
			img: img3,
			textStyle: 'knifes-text_mod',
			lineStyle: 'line-three',
			imgStyles: styles.photo_third,
		},
		{
			name: 'Talon Knife - Doppler Ruby',
			img: img4,
			textStyle: 'knifes-text_fourth',
			lineStyle: 'line-fourth',
			imgStyles: styles.photo_fourth,
		},
	]
	return (
		<>
			<Container styles={styles.container}>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className={styles.top}>
					{knives.map((item, i) => (
						<Knife key={i} data={item} />
					))}

					<div className={styles.title}>
						<MTypeography
							color={'white'}
							variants={textAnimation}
							custom={1}
							variant={'h1'}>
							{t('main_title')}
						</MTypeography>
					</div>
				</motion.div>
				<motion.div
					className={styles.subtitle}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<MTypeography
						color={'grey'}
						custom={2}
						variants={textAnimation}
						variant={'h2'}
						fontSize={'16px'}>
						{t('footer_advantages')}
					</MTypeography>
				</motion.div>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					<MButton
						custom={2}
						variants={btnAnimation}
						hover={true}
						style={styles.btn}
						text={'Try Now'}
						onClick={() => nav('/trade')}></MButton>
				</motion.div>
			</Container>
		</>
	)
}
