import { motion } from 'framer-motion'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hook'
import { Link, Navigate } from 'react-router-dom'
import { logout, selectIsAuth } from '../../../../../../redux/slices/auth'
import styles from './ProfileList.module.css'

import { Button } from '../../../../../../ui/Button'
import { List } from '../../../../../../ui/List'
import { ListItem } from '../../../../../../ui/ListItem'

export const ProfileList: FC = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)

	const onClickLogout = () => {
		if (window.confirm('You really want to log out?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	}

	if (!isAuth) {
		return <Navigate to='/' />
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={styles.list}>
			<List>
				<ListItem m={'0 0 5px 0'}>
					<Link to={'/profile'} className={styles.link}>
						{t('personal_area')}
					</Link>
				</ListItem>
				<ListItem m={'0 0 5px 0'} style={styles.link}>
					{t('support')}
				</ListItem>
				<ListItem>
					<Button
						onClick={onClickLogout}
						style={styles.btn}
						text={t('log_out')}></Button>
				</ListItem>
			</List>
		</motion.div>
	)
}
