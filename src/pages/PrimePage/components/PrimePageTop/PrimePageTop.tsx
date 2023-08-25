import { motion } from 'framer-motion'
import { FC, RefObject } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './PrimePageTop.module.css'

import { MTypeography } from '../../../../ui/Typeography'
import { Button } from '../../../../ui/Button'

type TPrimePageTop = {
	innerRef: RefObject<HTMLDivElement>
}

export const PrimePageTop: FC<TPrimePageTop> = ({ innerRef }) => {
	const { t } = useTranslation()

	let id = window.innerWidth > 1050 ? 'tablePC' : 'table'

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
			viewport={{ once: true }}
			className={styles['premium-top']}
			ref={innerRef}>
			<MTypeography
				variant={'h1'}
				custom={1}
				variants={textAnimation}
				m={'0 0 15px 0'}
				textAlign={'center'}
				fontSize={'60px'}
				color={'white'}>
				{t('prime_page.title')}
			</MTypeography>
			<MTypeography
				variant={'h2'}
				custom={2}
				variants={textAnimation}
				m={'0 0 15px 0'}
				color={'grey'}
				textAlign={'center'}
				fontSize={'24px'}>
				{t('prime_page.subtitle')}
			</MTypeography>
			<motion.div custom={3} variants={textAnimation} className={styles.btns}>
				<Button
					onClick={() =>
						innerRef.current?.scrollIntoView({ behavior: 'smooth' })
					}
					style={styles.link}
					text={t('prime_page.try_free')}></Button>
			</motion.div>
		</motion.div>
	)
}
