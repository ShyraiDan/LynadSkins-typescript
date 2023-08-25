import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import styles from './ModalSmall.module.css'

import { Cross } from '../Cross'

interface IModalSmall {
	children: ReactNode
	handleClick: () => void
}

export const ModalSmall: FC<IModalSmall> = ({ children, handleClick }) => {
	return (
		<motion.div
			className={styles.modal}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<div className={styles['modal-content']}>
				{children}
				<Cross cl={styles['close-modal']} onClick={() => handleClick()} />
			</div>
		</motion.div>
	)
}
