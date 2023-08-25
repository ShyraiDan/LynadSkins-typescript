import { useEffect, FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { fetchAllSkins } from '../../redux/slices/skins'
import { decode } from '../../helpers/helpers'
import { setSkins } from '../../redux/slices/skins'
import { request } from '../../helpers/helpers'
import { TSkin } from '../../redux/types'
import styles from './MarketPageItems.module.css'

import { Item } from '../../components/Item'
import { SkeletonItem } from '../../components/SkeletonItem'

export const MarketPageItems: FC = () => {
	const dispatch = useAppDispatch()
	const filters = useAppSelector(({ filters }) => filters)

	useEffect(() => {
		const token = localStorage.getItem('token')
		let userId = null

		if (token) {
			userId = decode(token).payload._id
		}
		const st = request(filters.filters)
		dispatch(fetchAllSkins([userId, st])).then((res) =>
			dispatch(setSkins(res.payload))
		)
	}, [filters])

	const skins = useAppSelector((state) => state.skins.items)
	return (
		<div className={styles['main-container']}>
			<div className={styles.conitaner}>
				{(skins ? skins : [...Array(50)]).map((item: TSkin, i: number) => {
					return skins ? <Item key={i} data={item} /> : <SkeletonItem key={i} />
				})}
			</div>
		</div>
	)
}
