import { useState, FC } from 'react'
import { AnimatePresence } from 'framer-motion'
import { removeItem } from '../../redux/slices/cart'
import { useAppDispatch } from '../../redux/hook'
import { removeWishItem } from '../../redux/slices/wishlist'
import { removeChange } from '../../redux/slices/change'
import { changeOverflow } from '../../helpers/helpers'
import { addCart } from '../../redux/slices/cart'
import { TSkin } from '../../redux/types'
import styles from './SmallItem.module.css'

import { Container } from '../../ui/Container'
import { Typeography } from '../../ui/Typeography'
import { Modal } from '../Modal/Modal'
import { ItemModal } from '../ItemModal'

import { FaTrash } from 'react-icons/fa'

interface ISmallItem {
	data: TSkin
	type?: string
}

export const SmallItem: FC<ISmallItem> = ({ data, type }) => {
	const dispatch = useAppDispatch()
	const [open, setOpen] = useState(false)

	const handleRemoveCart = (id: string) => {
		dispatch(removeItem(id))
	}

	const handleRemoveWish = (id: string) => {
		dispatch(removeWishItem(id))
	}
	const handleRemoveChange = (id: string) => {
		dispatch(removeChange(id))
	}

	const handleClick = () => {
		setOpen(!open)
		changeOverflow(open)
	}

	const addToCart = () => {
		dispatch(addCart(data))
	}

	return (
		<Container>
			<div className={styles.item} onClick={() => handleClick()}>
				<div className={styles.left}>
					<img
						src={data.imageUrl}
						alt={`${data.itemName}-${data?.skinName}`}
						className={styles.photo}
					/>
					<div className={styles.description}>
						<Typeography variant={'h3'} fontSize={'12px'} color={'white'}>
							{data.itemName}
						</Typeography>
						<Typeography variant={'h4'} fontSize={'12px'} color={'white'}>
							{data.skinName + ' (' + data.exterior + ')'}
						</Typeography>
						<Typeography fontSize={'12px'} color={'grey'}>
							<Typeography
								variant={'span'}
								color={'gold'}
								fontSize={'12px'}>{`${
								data.souvenir === true ? 'SV ' : ''
							}`}</Typeography>
							<Typeography variant={'span'} fontSize={'12px'}>{`${
								data.souvenir === true ? '/ ' : ''
							}`}</Typeography>
							<Typeography
								variant={'span'}
								fontSize={'12px'}
								color={'orange'}>{`${
								data.statTrak === true ? 'ST ' : ''
							}`}</Typeography>
							{data?.statTrak === true
								? `/ ${data.exterior
										.replace(/([-])/g, ' ')
										.replace(/([a-z," "])/g, '')} / ${data?.float
										.toString()
										.substring(0, 4)}`
								: `${data?.exterior
										.replace(/([-])/g, ' ')
										.replace(/([a-z," "])/g, '')} / ${data?.float
										.toString()
										.substring(0, 4)}`}
						</Typeography>
						<Typeography
							color={'white'}
							fontSize={'16px'}>{`$ ${data.price.toFixed(2)}`}</Typeography>
					</div>
				</div>
				{type && (
					<div className={styles.bucket}>
						<div className={styles['bucket-icon']}>
							<FaTrash
								className={styles['icon-bucket']}
								fontSize={'14px'}
								fill='white'
								onClick={
									type === 'Cart'
										? () => handleRemoveCart(data._id)
										: type === 'change'
										? () => handleRemoveChange(data._id)
										: () => handleRemoveWish(data._id)
								}
							/>
						</div>
					</div>
				)}
			</div>

			<AnimatePresence initial={false}>
				{open && (
					<Modal
						handleClick={() => handleClick()}
						children={<ItemModal data={data} addToCart={addToCart} />}
						guns={true}
					/>
				)}
			</AnimatePresence>
		</Container>
	)
}
