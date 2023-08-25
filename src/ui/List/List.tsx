import { motion } from 'framer-motion'
import { forwardRef, ReactNode, FC, LegacyRef } from 'react'

interface IList {
	children?: ReactNode
	display?: string
	alignItems?: string
	justifyContent?: string
	mt?: string
	mb?: string
	columns?: string
	gap?: string
	width?: string
	flexWrap?: any
}

export const List: FC<IList> = forwardRef(
	(
		{
			children,
			display,
			alignItems,
			justifyContent,
			mt,
			mb,
			columns,
			gap,
			width,
			flexWrap,
		},
		ref: LegacyRef<HTMLUListElement>
	) => {
		return (
			<ul
				ref={ref}
				style={{
					display,
					alignItems,
					justifyContent,
					marginTop: mt,
					marginBottom: mb,
					gridTemplateColumns: columns,
					gridGap: gap,
					width,
					flexWrap,
				}}>
				{children}
			</ul>
		)
	}
)
export const MList = motion(List)
