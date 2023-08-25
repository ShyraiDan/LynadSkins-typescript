import { motion } from 'framer-motion'
import { FC } from 'react'
import { MTypeography } from '../../../../../ui/Typeography'

interface TAdvantageItem {
	data: {
		title: string
		text: string
	}
}

export const AdvantageItem: FC<TAdvantageItem> = ({ data }) => {
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
			viewport={{ once: true }}>
			<MTypeography
				variants={textAnimation}
				custom={1}
				color={'white'}
				variant={'h2'}
				after={'title'}>
				{data.title}
			</MTypeography>
			<MTypeography variants={textAnimation} custom={1} color={'grey'}>
				{data.text}
			</MTypeography>
		</motion.div>
	)
}
