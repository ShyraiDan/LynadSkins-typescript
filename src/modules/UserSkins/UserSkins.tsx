import { useEffect, FC } from 'react'
import { fetchUserSkins } from '../../redux/slices/skins'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setMySkins } from '../../redux/slices/skins'
import type { TSkin } from '../../redux/types'

import styles from './UserSkins.module.css'
import { SkeletonItem } from '../../components/SkeletonItem'
import { Item } from '../../components/Item/Item'

export const UserSkins: FC = () => {
	const dispatch = useAppDispatch()
	const mySkins = useAppSelector((store) => store.skins.myItems)

	useEffect(() => {
		dispatch(fetchUserSkins()).then((res) => {
			setMySkins(res.payload)
		})
	}, [])

	const page = window.location.href.match('/trade')

	return (
		<div
			className={`${styles['main-container']} ${
				page && styles['main-container_profile']
			}`}>
			<div className={styles.conitaner}>
				{(mySkins ? mySkins : [...Array(20)]).map((item: TSkin, i) => {
					return mySkins ? (
						<Item key={i} data={item} />
					) : (
						<SkeletonItem key={i} />
					)
				})}
			</div>
		</div>
	)
}
