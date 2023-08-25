import { motion } from 'framer-motion'
import { forwardRef, FC, Ref, ReactNode } from 'react'
import styles from './Button.module.css'

interface IButton {
	text?: string | ReactNode
	style?: string
	onClick?: () => void
	disabled?: boolean
	hover?: boolean
}

export const Button: FC<IButton> = forwardRef(
	({ text, style, onClick, disabled, hover }, ref: Ref<HTMLButtonElement>) => {
		let cl = styles.btn
		if (style) {
			cl += ` ${style}`
		}
		if (hover === true) {
			cl += ` ${styles['btn-hover']}`
		}
		return (
			<motion.button
				ref={ref}
				whileTap={{ scale: !disabled ? 0.8 : 1 }}
				disabled={disabled}
				className={cl}
				onClick={onClick}>
				{text}
			</motion.button>
		)
	}
)
export const MButton = motion(Button)
