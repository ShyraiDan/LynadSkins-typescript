import { motion } from 'framer-motion'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FreePrime.module.css'

import { MButton } from '../../../../ui/Button'
import { MTypeography } from '../../../../ui/Typeography'

export const FreePrime: FC = () => {
	const { t } = useTranslation()

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

	return (
		<div className={styles['recomendation-cont']}>
			<div className={styles['recomendation-image']}>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className={styles.recomendation}>
					<MTypeography
						custom={1}
						variants={textAnimation}
						color={'white'}
						variant={'h3'}
						fontSize={'32px'}
						m={'0 0 10px 0'}>
						{t('prime_page.try_prime.title')}
					</MTypeography>
					<MTypeography
						m={'0 0 10px 0'}
						color={'grey'}
						custom={2}
						variants={textAnimation}>
						{t('prime_page.try_prime.text')}
					</MTypeography>
					<MButton
						custom={2}
						variants={btnAnimation}
						hover={true}
						text={t('prime_page.try_free')}
						style={styles['free-btn']}></MButton>
				</motion.div>
			</div>
		</div>
	)
}
