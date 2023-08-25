import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ErrorMessage.module.css'

import { Button } from '../../../../ui/Button'
import { Typeography } from '../../../../ui/Typeography'

export const ErrorMessage: FC = () => {
	const nav = useNavigate()
	return (
		<div className={styles.item}>
			<Typeography color={'white'} variant={'h1'} m={'0 0 10px 0'}>
				Page not found
			</Typeography>
			<Typeography color={'white'} variant={'h2'}>
				Error 404. Try to reload page or enter another URL
			</Typeography>
			<div className={styles.btns}>
				<Button
					hover={true}
					style={styles.btn}
					onClick={() => nav('/trade')}
					text={'Move to trade'}></Button>
				<Button
					hover={true}
					style={styles.btn}
					onClick={() => nav('/market')}
					text={'Move to market'}></Button>
			</div>
		</div>
	)
}
