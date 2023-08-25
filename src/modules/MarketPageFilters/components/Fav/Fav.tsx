import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { resetWishList } from '../../../../redux/slices/wishlist'
import { useTranslation } from 'react-i18next'
import styles from './Fav.module.css'

import { SmallModalEmpty } from '../../../../components/SmallModalEmpty'
import { SmallModalInner } from '../../../../components/SmallModalInner'
import { Button } from '../../../../ui/Button'
import { Container } from '../../../../ui/Container'

export const Fav: FC = () => {
	const { t } = useTranslation()
	const data = useAppSelector((state) => state.wishList)
	const dispatch = useAppDispatch()

	const clearWishList = () => {
		dispatch(resetWishList())
	}

	return (
		<Container styles={styles.container}>
			{data.length ? (
				<>
					<SmallModalInner data={data} type={'Favorites'} />
					<div className={styles.btns}>
						<Button
							text={t('reset_fav')}
							onClick={() => clearWishList()}
							style={styles.btn}
						/>
					</div>
				</>
			) : (
				<SmallModalEmpty message={t('fav_empty')} desc={t('add_fav_items')} />
			)}
		</Container>
	)
}
