import { useState, FC } from 'react'
import styles from './Cart.module.css'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { resetCart } from '../../../../redux/slices/cart'
import { updateSkin } from '../../../../redux/slices/skins'
import { updateUser, updStateUser } from '../../../../redux/slices/auth'
import { setState } from '../../../../redux/slices/marketItems'
import { setSignInState } from '../../../../redux/slices/signInModal'
import { useTranslation } from 'react-i18next'
import { changeOverflow } from '../../../../helpers/helpers'
import { TUser, TSkin } from '../../../../redux/types'
import { setSkins } from '../../../../redux/slices/skins'
import { fetchAllSkins } from '../../../../redux/slices/skins'

import axios from '../../../../axios'

import { SmallModalEmpty } from '../../../../components/SmallModalEmpty'
import { SmallModalInner } from '../../../../components/SmallModalInner'
import { Button } from '../../../../ui/Button'
import { Container } from '../../../../ui/Container'

interface ICart {
	setStateModal: Function
}

export const Cart: FC<ICart> = ({ setStateModal }) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const [warning, setWarning] = useState('')
	const data = useAppSelector((state) => state.cart)
	const skins = useAppSelector((state) => state.skins.items)

	const handleBuy = async (values: any) => {
		let sum: number = values.reduce((a: TSkin, b: TSkin) => a.price + b.price)
		const token = window.localStorage.getItem('token')
		if (token === null) {
			dispatch(setSignInState(true))
			setStateModal(false)
			changeOverflow(false)
			return
		}
		let user: TUser = {
			createdAt: '',
			email: '',
			fullName: '',
			money: 0,
			updatedAt: '',
			__v: 0,
			_id: '',
		}
		await axios
			.get('/auth/me', {
				data: {
					token,
				},
			})
			.then((res) => {
				user = res.data
			})
		if (user === null) {
			return
		}

		if (user?.money < sum) {
			setWarning('You need to donate some money')
			return
		} else {
			setWarning('')
		}
		values.forEach((el: TSkin) => {
			let sellerMoney = 0
			axios.post('/userMoney', { _id: `${el.user}` }).then((res) => {
				sellerMoney = res.data
				sellerMoney += el.price
				axios.patch('/userMoney', { _id: `${el.user}`, money: sellerMoney })
			})

			let item = {
				...el,
				user: user?._id,
				onTrade: false,
				color: el.color.toString(),
			}
			dispatch(
				updateUser({
					...user,
					money: Number((user?.money - item.price).toFixed(2)),
				})
			)
			dispatch(
				updStateUser({
					...user,
					money: Number((user?.money - item.price).toFixed(2)),
				})
			)

			dispatch(updateSkin(item))
			dispatch(setSkins(skins.filter((item) => item._id !== el._id)))
		})

		handleResetCart()
	}

	const handleResetCart = () => {
		dispatch(resetCart())
	}

	return (
		<Container styles={styles.container}>
			{data?.length ? (
				<>
					<SmallModalInner data={data} type={'Cart'} />
					{warning && <div className={styles.warning}>{warning}</div>}
					<div className={styles.btns}>
						<Button
							hover={true}
							text={t('buy')}
							onClick={() => handleBuy(data)}
							style={styles.btn}
						/>
						<Button
							hover={true}
							text={t('reset_cart')}
							onClick={handleResetCart}
							style={styles.btn}
						/>
					</div>
				</>
			) : (
				<SmallModalEmpty message={t('cart_empty')} desc={t('add_cart_items')} />
			)}
		</Container>
	)
}
