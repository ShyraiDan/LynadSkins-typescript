import { useEffect, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../redux/hook'
import axios from '../../axios'
import { selectIsAuth } from '../../redux/slices/auth'
import { Navigate } from 'react-router-dom'
import styles from './ProfilePage.module.css'

import { UserSkins } from '../../modules/UserSkins'
import { Container } from '../../ui/Container'
import { Typeography } from '../../ui/Typeography'
import { AddSkin } from './components/AddSkin'
import { Background } from './components/Background'
import { ContactInfo } from './components/ContactInfo'
import { GeneralInfo } from './components/GeneralInfo'
import { ProfileInfo } from './components/ProfileInfo'
import { Subscribe } from './components/Subscribe'

export const ProfilePage: FC = () => {
	const isAuth = useAppSelector(selectIsAuth)
	const { t } = useTranslation()
	const [data, setData] = useState(null)
	useEffect(() => {
		const token = window.localStorage.getItem('token')
		axios
			.get('/auth/me', {
				data: {
					token,
				},
			})
			.then((res) => {
				setData(res.data)
			})
	}, [])

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Container styles={styles.container}>
			<Typeography
				variant={'h1'}
				fontSize={'32px'}
				color={'white'}
				m={'0 0 20px 10px'}>
				{t('personalPage.personal_info')}
			</Typeography>
			<div className={styles.top}>
				<Background>
					<ProfileInfo data={data}></ProfileInfo>
				</Background>
				<Background>
					<Subscribe></Subscribe>
				</Background>
			</div>
			<div className={styles.top}>
				<Background>
					<GeneralInfo></GeneralInfo>
				</Background>

				<Background>
					<ContactInfo></ContactInfo>
				</Background>
			</div>
			<div className={styles.skins}>
				<Typeography
					variant={'h2'}
					fontSize={'32px'}
					color={'white'}
					m={'0 0 20px 10px'}>
					{t('personalPage.your_inventory')}
				</Typeography>
				<AddSkin />
			</div>

			<UserSkins />
		</Container>
	)
}
