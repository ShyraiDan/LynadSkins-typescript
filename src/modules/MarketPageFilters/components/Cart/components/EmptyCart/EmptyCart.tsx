import { FC } from 'react'
import styles from './EmptyCart.module.css'

import { Container } from '../../../../../../ui/Container'
import { Typeography } from '../../../../../../ui/Typeography'

export const EmptyCart: FC = () => {
	return (
		<Container styles={styles.container}>
			<Typeography variant={'h3'} color={'white'} m={'0px 0px 10px 0'}>
				Your cart is empty{' '}
			</Typeography>
			<Typeography color={'white'}>
				Add the items you want to purchase from our inventory{' '}
			</Typeography>
		</Container>
	)
}
