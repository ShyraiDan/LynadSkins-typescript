import { FC } from 'react'
import { useAppSelector } from '../../redux/hook'
import { TUser } from '../../redux/types'

import styles from './Money.module.css'

import { Button } from '../../ui/Button'
import { Typeography } from '../../ui/Typeography'

import { FiPlus } from 'react-icons/fi'

export const Money: FC = () => {
	const currency = useAppSelector((state) => state.currency)

	const d = useAppSelector((state) => state.auth.data)

	return (
		<div className={styles.money}>
			<div className={styles.left}>
				<Typeography color={'white'} fontSize={'14px'}>
					{d?.money && d.money.toFixed(2) + ' $'}
				</Typeography>
				{currency.currency === 'uah' && d?.money && (
					<Typeography color={'white'} fontSize={'10px'}>
						~ {(d.money * 36.7).toFixed(2) + ' ₴'}
					</Typeography>
				)}
			</div>
			<Button
				text={<FiPlus fontSize={'20px'} />}
				hover={true}
				style={styles.btn}></Button>
		</div>
	)
}
