import { useState, FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { updateUser, updStateUser } from '../../../../redux/slices/auth'
import { updateSkin } from '../../../../redux/slices/skins'
import { resetChange } from '../../../../redux/slices/change'
import { useTranslation } from 'react-i18next'
import { TSkin } from '../../../../redux/types'
import { setMySkins, setSkins } from '../../../../redux/slices/skins'
import axios from '../../../../axios'
import styles from './BuyBtn.module.css'

import { Typeography } from '../../../../ui/Typeography'
import { SmallItem } from '../../../../components/SmallItem/SmallItem'

import { FaShoppingCart } from 'react-icons/fa'
import { Button } from '../../../../ui/Button'

export const BuyBtn: FC = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const [modal, setModal] = useState(false)
	const [error, setError] = useState('')
	const change = useAppSelector((state) => state.change)
	let mySkins = useAppSelector((state) => state.skins.myItems)
	let skins = useAppSelector((state) => state.skins.items)

	let yourSum = 0
	let otherSum = 0
	change.yourItems.forEach((item: TSkin) => (yourSum += item.price))
	change.marketItems.forEach((item: TSkin) => (otherSum += item.price))

	const openModal = () => {
		setModal((state) => !state)
	}

	const handleChange = async () => {
		if (yourSum < otherSum) {
			setError('You need to add more your item to trade')
			return
		} else {
			setError('')
		}
		const diff = Number((yourSum - otherSum).toFixed(2))
		let user: any = null
		const token = window.localStorage.getItem('token')
		await axios
			.get('/auth/me', {
				data: {
					token,
				},
			})
			.then((res) => {
				user = res.data
			})

		dispatch(
			updateUser({
				...user,
				money: Number((user?.money + diff).toFixed(2)),
			})
		)

		dispatch(
			updStateUser({
				...user,
				money: Number((user?.money + diff).toFixed(2)),
			})
		)

		change.yourItems.forEach((el: TSkin) => {
			let item = { ...el }
			item.user = '64c67e9ec184782a2302468b'
			item.color = String(item.color)
			item.onTrade = true
			dispatch(updateSkin(item))
			skins = [...skins, item]
			dispatch(setSkins(skins))
			mySkins = mySkins.filter((skin) => skin._id !== item._id)
			dispatch(setMySkins(mySkins))
		})

		change.marketItems.forEach((el: TSkin) => {
			let sellerMoney = 0
			axios.post('/userMoney', { _id: `${el.user}` }).then((res) => {
				sellerMoney = res.data
				sellerMoney += el.price
				axios.patch('/userMoney', { _id: `${el.user}`, money: sellerMoney })
			})
			let item = { ...el }
			item.user = user?._id
			item.color = String(item.color)
			item.onTrade = false
			dispatch(updateSkin(item))

			dispatch(setMySkins([...mySkins, item]))
			dispatch(setSkins(skins.filter((skin) => skin._id !== item._id)))
		})
		dispatch(resetChange())
	}
	return (
		<>
			<div className={styles.btn} onClick={() => openModal()}>
				<div className={styles.inventory}>
					<Typeography color={'white'} fontSize={'20px'}>
						$ {yourSum.toFixed(2)}
					</Typeography>
					<Typeography color={'white'}>{t('your_offer')}</Typeography>
				</div>
				<FaShoppingCart fill='var(--text-primary)' />
				<div className={styles['trade-place']}>
					{' '}
					<Typeography color={'white'} fontSize={'20px'}>
						$ {otherSum.toFixed(2)}
					</Typeography>
					<Typeography color={'white'}>{t('you_want')}</Typeography>
				</div>
			</div>
			<AnimatePresence initial={false}>
				{modal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={styles.modal}>
						<div className={styles.list}>
							<div>
								<Typeography variant={'h3'} color={'white'} m={'5px 0'}>
									{t('your_offer')}
								</Typeography>
								<div className={styles.skins}>
									{change.yourItems.map((item: TSkin) => {
										return (
											<SmallItem data={item} key={item._id} type={'change'} />
										)
									})}
								</div>
							</div>
							<div>
								<Typeography variant={'h3'} color={'white'} m={'5px 0'}>
									{t('you_want')}
								</Typeography>
								<div className={styles.skins}>
									{change.marketItems.map((item: TSkin) => {
										return (
											<SmallItem data={item} key={item._id} type={'change'} />
										)
									})}
								</div>
							</div>
						</div>
						<div className={styles.change}>
							<Button
								text={t('change')}
								onClick={() => handleChange()}
								style={styles['btn-confirm']}
								hover={true}
							/>
							{error && <Typeography color={'error'}>{error}</Typeography>}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
