import { FC, ChangeEvent } from 'react'
import styles from './Input.module.css'

interface IInput {
	width?: string
	placeholder?: string
	type?: string
	mt?: string
	mb?: string
	value?: string
	obj?: Object
	disabled?: boolean
	onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
	id?: string
}

export const Input: FC<IInput> = ({
	width,
	placeholder,
	type,
	mt,
	mb,
	value,
	obj,
	disabled,
	onChange,
	id,
}) => {
	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			className={styles.priceInput}
			style={{ width, marginTop: mt, marginBottom: mb }}
			value={value}
			onChange={onChange}
			{...obj}
			disabled={disabled}
		/>
	)
}
