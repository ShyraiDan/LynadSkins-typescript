import { FC } from 'react'
import styles from './Item.module.css'

import { ListItem } from '../../ui/ListItem'
import { Typeography } from '../../ui/Typeography'

interface ISideItem {
	value: string
	text: string
	register: Function
	filterParam: string
}

export const SideItem: FC<ISideItem> = ({
	value,
	text,
	register,
	filterParam,
}) => {
	return (
		<ListItem style={styles.item}>
			<input
				type='checkbox'
				className={styles.input}
				id={value}
				value={value}
				{...register(filterParam, {})}
			/>
			<label htmlFor={value} className={styles.label}>
				<Typeography color={'white'}>{text}</Typeography>
			</label>
		</ListItem>
	)
}
