import { motion } from 'framer-motion'
import { useState, FC } from 'react'
import styles from './Float.module.css'

interface IFloat {
	register: Function
}

export const Float: FC<IFloat> = ({ register }) => {
	const [value, setValue] = useState(1)
	return (
		<motion.div
			className={styles.accordion}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<div className={styles['show-container']}>
				<div className={styles['show-val']}>0</div>
				<div className={styles['show-val']}>{value}</div>
			</div>
			<input
				type='range'
				min='0'
				max='1'
				step='0.001'
				{...register('float', {})}
				className={styles['float-input']}
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
			/>
		</motion.div>
	)
}
