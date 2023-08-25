import { motion } from 'framer-motion'
import { forwardRef, ReactNode, FC } from 'react'

interface IContainer {
	children?: ReactNode
	styles?: string
}

export const Container: FC<IContainer> = forwardRef<HTMLDivElement, IContainer>(
	({ children, styles }, ref) => {
		let cl = ''
		if (styles) {
			cl += `${styles}`
		}

		return (
			<div ref={ref} className={cl}>
				{children}
			</div>
		)
	}
)
export const MContainer = motion(Container)
