import { FC } from 'react'
import { TSkin } from '../../redux/types'
import styles from './SmallModalInner.module.css'

import { Container } from '../../ui/Container'
import { Typeography } from '../../ui/Typeography'
import { SmallItem } from '../SmallItem'

interface ISmallModalInner {
	data: Array<TSkin>
	type: string
}

export const SmallModalInner: FC<ISmallModalInner> = ({ data, type }) => {
	return (
		<Container styles={styles.container}>
			<Typeography m={'0 0 10px 0'} fontSize={'22px'} color={'white'}>
				{type}
			</Typeography>
			<div className={styles.items}>
				{data?.map((item: TSkin, i: number) => (
					<SmallItem key={i} data={item} type={type} />
				))}
			</div>
		</Container>
	)
}
