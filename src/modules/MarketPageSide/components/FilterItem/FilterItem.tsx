import { AnimatePresence } from 'framer-motion'
import { useState, FC, ReactNode } from 'react'
import styles from './FilterItem.module.css'

import { Typeography } from '../../../../ui/Typeography'

interface IFilterItem {
	filter: string
	fullList: ReactNode
}

export const FilterItem: FC<IFilterItem> = ({ filter, fullList }) => {
	const [open, setOpen] = useState(false)
	const showAll = () => {
		setOpen(!open)
	}
	return (
		<>
			<div className={styles['filter-item']} onClick={showAll}>
				<Typeography color={'white'} fontSize={'20px'}>
					{filter}
				</Typeography>
				<div className={styles.icon}>
					{open ? (
						<span className={styles['icon-minus']}>-</span>
					) : (
						<span className={styles['icon-plus']}>+</span>
					)}
				</div>
			</div>
			<AnimatePresence initial={false}>{open && fullList}</AnimatePresence>
		</>
	)
}
