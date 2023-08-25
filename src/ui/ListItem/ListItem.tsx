import { motion } from 'framer-motion'
import { forwardRef, ReactNode, FC, LegacyRef } from 'react'
interface IListItem {
	children?: ReactNode
	display?: string
	justifyContent?: string
	mt?: string
	mb?: string
	mr?: string
	ml?: string
	m?: string
	pr?: string
	pt?: string
	pb?: string
	pl?: string
	p?: string
	style?: string
	bg?: string
	w?: string
	h?: string
	borderRadius?: string
	position?: any
	rotate?: string
	cursor?: string
	onClick?: () => void
}

export const ListItem: FC<IListItem> = forwardRef(
	(
		{
			children,
			display,
			justifyContent,
			mt,
			mb,
			mr,
			ml,
			m,
			pr,
			pt,
			pb,
			pl,
			p,
			style,
			bg,
			w,
			h,
			borderRadius,
			position,
			rotate,
			cursor,
			onClick,
		},
		ref: LegacyRef<HTMLLIElement>
	) => {
		let cl = ''
		if (style) {
			cl += `${style}`
		}
		return (
			<li
				ref={ref}
				style={{
					display,
					justifyContent,
					marginRight: mr,
					marginTop: mt,
					marginBottom: mb,
					marginLeft: ml,
					margin: m,
					paddingRight: pr,
					paddingTop: pt,
					paddingBottom: pb,
					paddingLeft: pl,
					padding: p,
					background: bg,
					width: w,
					height: h,
					borderRadius,
					position,
					rotate,
					cursor,
				}}
				className={cl}
				onClick={onClick}>
				{children}
			</li>
		)
	}
)
export const MListItem = motion(ListItem)
