import styles from './ItemModal.module.css'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { useTranslation } from 'react-i18next'
import { addWishList } from '../../redux/slices/wishlist'
import { TSkin } from '../../redux/types'

import { Button } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { List } from '../../ui/List'
import { ListItem } from '../../ui/ListItem'
import { Typeography } from '../../ui/Typeography'

import { FaHeart } from 'react-icons/fa'

interface IItemModal {
	data: TSkin
	addToCart: Function
	page?: boolean
	handleTrade?: any
	status?: boolean
}

export const ItemModal: FC<IItemModal> = ({
	data,
	addToCart,
	page,
	handleTrade,
	status,
}) => {
	const dispatch = useAppDispatch()
	const currency = useAppSelector((state) => state.currency)
	const cart = useAppSelector((state) => state.cart)
	const wishList = useAppSelector((state) => state.wishList)
	const { t } = useTranslation()

	const addToWish = () => {
		dispatch(addWishList(data))
	}

	const indexCart = cart.findIndex((item) => data._id === item._id)
	const indexWish = wishList.findIndex((item) => data._id === item._id)

	return (
		<Container styles={styles.container}>
			<div className={styles['modal-container']}>
				<img
					src={data?.imageUrl}
					alt={`${data?.itemName}-${data?.skinName}`}
					className={styles['modal-image']}
				/>
			</div>
			<div className={styles['modal-right']}>
				<Typeography fontSize={'16px'} variant={'h3'} color={'white'}>
					<Typeography fontSize={'16px'} variant={'span'} color={'gold'}>{`${
						data?.souvenir === true ? 'SV ' : ''
					}`}</Typeography>
					<Typeography variant={'span'} fontSize={'16px'}>{`${
						data?.souvenir === true && data?.statTrak === true ? '/ ' : ''
					}`}</Typeography>
					<Typeography variant={'span'} fontSize={'16px'} color={'orange'}>{`${
						data?.statTrak === true ? 'ST ' : ''
					}`}</Typeography>
					{data?.itemName}
				</Typeography>
				<Typeography variant={'h3'} color={'white'} fontSize={'16px'}>
					{data?.skinName} ({data?.exterior})
				</Typeography>
				<div className={styles['modal-info']}>
					<div className={styles['modal-line']}>
						<div className={styles['modal-blue']}></div>
						<div className={styles['modal-green']}></div>
						<div className={styles['modal-yellow']}></div>
						<div className={styles['modal-orange']}></div>
						<div className={styles['modal-red']}></div>
						<div
							style={{
								position: 'absolute',
								top: '-7px',
								marginLeft: '-7px',
								left: `calc(${data?.float} * 100%)`,
								border: '7px solid transparent',
								borderTop: '7px solid #fff',
							}}></div>
					</div>
					<List mt={'15px'}>
						<ListItem
							display={'flex'}
							justifyContent={'space-between'}
							m={'10px 0 0 0'}>
							<Typeography variant={'span'} color={'white'}>
								Float
							</Typeography>
							<Typeography variant={'span'} color={'white'}>
								{data?.float}
							</Typeography>
						</ListItem>
						<ListItem
							display={'flex'}
							justifyContent={'space-between'}
							m={'10px 0 0 0'}>
							<Typeography variant={'span'} color={'white'}>
								Rarity
							</Typeography>
							<Typeography variant={'span'} color={'white'}>
								{data?.rarity}
							</Typeography>
						</ListItem>
					</List>
				</div>
				<div className={styles['modal-price']}>
					<Typeography color={'white'}>Price</Typeography>
					<Typeography color={'white'}>
						{' '}
						{currency.currency === 'usd'
							? `$ ${data?.price.toFixed(2)}`
							: `₴ ${(data?.price * 36.7).toFixed(2)}`}
					</Typeography>
				</div>
				{!page && (
					<div className={styles['modal-buttons']}>
						<Button
							hover={indexCart === -1 && true}
							text={
								page ? (status ? t('remove_sale') : t('sale')) : t('add_cart')
							}
							style={`${styles['modal-cart']} ${
								indexCart !== -1 && styles['modal-cart_added']
							}`}
							disabled={indexCart !== -1 && true}
							onClick={
								page ? () => handleTrade(data) : () => addToCart()
							}></Button>
						{!page && (
							<Button
								hover={indexWish === -1 && true}
								disabled={indexWish !== -1 && true}
								text={
									<FaHeart
										fill={indexWish !== -1 ? '#e71fb8' : 'white'}
										fontSize={'30px'}
									/>
								}
								onClick={() => addToWish()}
								style={styles['modal-like']}></Button>
						)}
					</div>
				)}
			</div>
		</Container>
	)
}
