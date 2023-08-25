import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Item.module.css'

import { Button } from '../../../../../../ui/Button'
import { Typeography } from '../../../../../../ui/Typeography'

interface TData {
	data: {
		img: string
		exterior: string
		price: string
		alt: string
	}
}

export const Item: FC<TData> = ({ data }) => {
	const nav = useNavigate()
	return (
		<div className={styles.item}>
			<img
				src={data.img}
				alt={data.alt}
				className={styles.photo}
				loading='eager'
				title={data.alt}
			/>
			<div className={styles.description}>
				<Typeography variant={'h4'} color={'white'}>
					{data.exterior}
				</Typeography>
				<Typeography color={'white'}>
					{' '}
					From
					<Typeography variant={'span'} color={'white'}>
						{' '}
						{data.price}
					</Typeography>
				</Typeography>
			</div>
			<div className={styles.bottom}>
				<Button
					text={'Store'}
					hover={true}
					onClick={() => nav('/market')}></Button>
			</div>
		</div>
	)
}
