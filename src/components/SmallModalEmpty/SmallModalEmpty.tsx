import { FC } from 'react'
import styles from './SmallModalEmpty.module.css'

import { Container } from '../../ui/Container'
import { Typeography } from '../../ui/Typeography'

interface ISmallModalEmpty {
	message: string
	desc: string
}

export const SmallModalEmpty: FC<ISmallModalEmpty> = ({ message, desc }) => {
	return (
		<Container styles={styles.container}>
			<Typeography variant={'h3'} color={'white'} m={'0px 0px 10px 0'}>
				{message}
			</Typeography>
			<Typeography color={'white'}>{desc}</Typeography>
		</Container>
	)
}
